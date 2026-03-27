using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Drawing; // Might require adding the System.Drawing.Common NuGet package
using System.IO;
using System.Linq;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Media;
using System.Windows.Media.Imaging;

namespace PocketDrop
{
    public static class AppScanner
    {
        public static List<AppItem> GetInstalledApps()
        {
            var appList = new List<AppItem>();
            var seenPaths = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            // The 3 standard Windows Registry locations where installed apps live
            string[] registryKeys = new string[]
            {
                @"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall",
                @"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall",
                @"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" // For CurrentUser
            };

            foreach (var keyPath in registryKeys)
            {
                // Check LocalMachine (All Users) and CurrentUser (Just this user)
                RegistryKey baseKey = keyPath == registryKeys[2] ? Registry.CurrentUser : Registry.LocalMachine;

                using (RegistryKey key = baseKey.OpenSubKey(keyPath))
                {
                    if (key == null) continue;

                    foreach (var subkeyName in key.GetSubKeyNames())
                    {
                        using (RegistryKey subkey = key.OpenSubKey(subkeyName))
                        {
                            if (subkey == null) continue;

                            string displayName = subkey.GetValue("DisplayName") as string;
                            string displayIcon = subkey.GetValue("DisplayIcon") as string;
                            string installLocation = subkey.GetValue("InstallLocation") as string;

                            // Clean up the icon path (sometimes Windows leaves quotes around it or adds an icon index like ",0")
                            string exePath = CleanExePath(displayIcon);

                            // If the DisplayIcon wasn't an exe, try to find one in the InstallLocation
                            if (string.IsNullOrEmpty(exePath) && !string.IsNullOrEmpty(installLocation) && Directory.Exists(installLocation))
                            {
                                exePath = Directory.GetFiles(installLocation, "*.exe").FirstOrDefault();
                            }

                            // If we found a valid, real .exe file that we haven't already added...
                            if (!string.IsNullOrEmpty(exePath) && File.Exists(exePath) && !seenPaths.Contains(exePath))
                            {
                                if (string.IsNullOrEmpty(displayName))
                                    displayName = Path.GetFileNameWithoutExtension(exePath);

                                seenPaths.Add(exePath);

                                appList.Add(new AppItem
                                {
                                    AppName = displayName,
                                    ExePath = exePath,
                                    AppIcon = GetIconFromExe(exePath),
                                    IsSelected = false
                                });
                            }
                        }
                    }
                }
            }

            // Sort alphabetically before returning!
            return appList.OrderBy(a => a.AppName).ToList();
        }

        // Helper: Extracts the native Windows icon from an .exe and converts it to a WPF ImageSource
        public static ImageSource GetIconFromExe(string path)
        {
            try
            {
                using (Icon icon = Icon.ExtractAssociatedIcon(path))
                {
                    if (icon != null)
                    {
                        var bitmapSource = Imaging.CreateBitmapSourceFromHIcon(
                            icon.Handle,
                            Int32Rect.Empty,
                            BitmapSizeOptions.FromEmptyOptions());

                        // ✨ THE FIX: Freeze the image so the UI thread is allowed to touch it!
                        bitmapSource.Freeze();

                        return bitmapSource;
                    }
                }
            }
            catch { }
            return null; // Return null if it fails
        }

        // Helper: Windows registry paths are notoriously messy. This cleans them up.
        private static string CleanExePath(string path)
        {
            if (string.IsNullOrEmpty(path)) return null;

            path = path.Trim('"', ' ');

            // Remove icon indexes (e.g., "C:\app.exe,0")
            int commaIndex = path.LastIndexOf(',');
            if (commaIndex > 0)
            {
                path = path.Substring(0, commaIndex);
            }

            if (path.EndsWith(".exe", StringComparison.OrdinalIgnoreCase))
            {
                return path;
            }

            return null;
        }
    }
}