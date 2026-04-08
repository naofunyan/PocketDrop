// PocketDrop
// Copyright (C) 2026 Naofunyan
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Windows;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PocketDrop
{
    public static class AppHelpers
    {
        // ================================================ //
        // File size calculation
        // ================================================ //
        public static string FormatBytes(long bytes)
        {
            if (bytes == 0) return "0 B";
            string[] suffixes = { "B", "KB", "MB", "GB", "TB" };
            int place = Convert.ToInt32(Math.Floor(Math.Log(bytes, 1024)));
            double num = Math.Round(bytes / Math.Pow(1024, place), 1);
            return $"{num.ToString("0.0", CultureInfo.InvariantCulture)} {suffixes[place]}";
        }

        // ================================================ //
        // Duplicate detection
        // ================================================ //
        public static bool IsDuplicate(IEnumerable<PocketItem> currentItems, string newFilePath)
        {
            if (string.IsNullOrEmpty(newFilePath)) return false;
            return currentItems.Any(item =>
                item.FilePath.Equals(newFilePath, StringComparison.OrdinalIgnoreCase));
        }

        // ================================================ //
        // Remove dead files
        // ================================================ //
        public static bool RemoveDeadFiles(IList<PocketItem> currentItems)
        {
            bool removedAny = false;

            // Iterate backward to safely delete items during loop
            for (int i = currentItems.Count - 1; i >= 0; i--)
            {
                string path = currentItems[i].FilePath;

                // Remove entry if file and directory no longer exist on disk
                if (!File.Exists(path) && !Directory.Exists(path))
                {
                    currentItems.RemoveAt(i);
                    removedAny = true;
                }
            }
            return removedAny;
        }

        // ================================================ //
        // Shake detection
        // ================================================ //
        public class ShakeDetector
        {
            private Queue<long> _swingTimestamps = new Queue<long>();
            private int _lastX = 0;
            private int _swingOriginX = 0;
            private int _currentDir = 0; // 1 for right, -1 for left
            private bool _isFirstMove = true;

            public bool CheckForShake(int currentMouseX, long currentTimestampMs, int minDistancePx, int maxTimeMs, int requiredSwings = 3)
            {
                if (_isFirstMove)
                {
                    _lastX = currentMouseX;
                    _swingOriginX = currentMouseX;
                    _isFirstMove = false;
                    return false;
                }

                int deltaX = currentMouseX - _lastX;
                if (deltaX == 0) return false;

                int newDir = deltaX > 0 ? 1 : -1;

                // Detect direction change swing in shake algorithm
                if (_currentDir != 0 && newDir != _currentDir)
                {
                    // Calculate travel distance before each direction change
                    int swingDistance = Math.Abs(_lastX - _swingOriginX);

                    if (swingDistance >= minDistancePx)
                    {
                        _swingTimestamps.Enqueue(currentTimestampMs); // Record timestamp on valid swing detection
                    }

                    _swingOriginX = _lastX; // Reset origin for the new swing direction
                }

                _currentDir = newDir;
                _lastX = currentMouseX;

                // Prune swings outside the time window
                while (_swingTimestamps.Count > 0 && (currentTimestampMs - _swingTimestamps.Peek()) > maxTimeMs)
                {
                    _swingTimestamps.Dequeue();
                }

                // Check if swing count meets shake threshold
                if (_swingTimestamps.Count >= requiredSwings)
                {
                    _swingTimestamps.Clear(); // Reset state to prevent immediate re-trigger
                    _isFirstMove = true;
                    return true;
                }

                return false;
            }
        }

        // ================================================ //
        // Collision renamer 
        // ================================================ //
        public static string GetSafeDisplayName(IEnumerable<PocketItem> currentItems, string originalPath)
        {
            string originalName = Path.GetFileName(originalPath);
            string nameWithoutExt = Path.GetFileNameWithoutExtension(originalPath);
            string extension = Path.GetExtension(originalPath);

            string finalDisplayName = originalName;
            int counter = 1;

            // Increment suffix until unique filename is found
            while (currentItems.Any(item => item.FileName.Equals(finalDisplayName, StringComparison.OrdinalIgnoreCase)))
            {
                finalDisplayName = $"{nameWithoutExt} ({counter}){extension}";
                counter++;
            }

            return finalDisplayName;
        }

        // ================================================ //
        // Pocket placement
        // ================================================ //
        public static Point CalculateWindowPosition(int placementMode, double cursorX, double cursorY, double w, double h, double workAreaLeft, double workAreaTop, double workAreaRight, double workAreaBottom)
        {
            // Default position (Near Mouse)
            double targetLeft = cursorX - (w / 2) + 40;
            double targetTop = cursorY - h - 80;

            // Keep "Near Mouse" safely on screen
            targetLeft = Math.Max(workAreaLeft + 8, Math.Min(targetLeft, workAreaRight - w - 8));
            targetTop = Math.Max(workAreaTop + 8, Math.Min(targetTop, workAreaBottom - h - 8));

            switch (placementMode)
            {
                case 1: // Top edge
                    targetLeft = workAreaLeft + ((workAreaRight - workAreaLeft) / 2) - (w / 2);
                    targetTop = workAreaTop + 8;
                    break;
                case 2: // Bottom edge
                    targetLeft = workAreaLeft + ((workAreaRight - workAreaLeft) / 2) - (w / 2);
                    targetTop = workAreaBottom - h - 8;
                    break;
                case 3: // Left edge
                    targetLeft = workAreaLeft + 8;
                    targetTop = workAreaTop + ((workAreaBottom - workAreaTop) / 2) - (h / 2);
                    break;
                case 4: // Right edge
                    targetLeft = workAreaRight - w - 8;
                    targetTop = workAreaTop + ((workAreaBottom - workAreaTop) / 2) - (h / 2);
                    break;
                case 5: // Top left corner
                    targetLeft = workAreaLeft + 8;
                    targetTop = workAreaTop + 8;
                    break;
                case 6: // Top right corner
                    targetLeft = workAreaRight - w - 8;
                    targetTop = workAreaTop + 8;
                    break;
                case 7: // Bottom left corner
                    targetLeft = workAreaLeft + 8;
                    targetTop = workAreaBottom - h - 8;
                    break;
                case 8: // Bottom right corner
                    targetLeft = workAreaRight - w - 8;
                    targetTop = workAreaBottom - h - 8;
                    break;
            }

            return new Point(targetLeft, targetTop);
        }

        // ================================================ //
        // Calculate My Pocket position
        // ================================================ //
        public static Point CalculateTaskbarSnapPosition(double windowWidth, double windowHeight, double workAreaWidth, double workAreaHeight, double shadowMargin)
        {
            // Align window to edge accounting for shadow margin bleed
            double targetLeft = workAreaWidth - windowWidth + shadowMargin;
            double targetTop = workAreaHeight - windowHeight + shadowMargin;

            return new Point(targetLeft, targetTop);
        }

        // ================================================ //
        // Detect Windows dark mode
        // ================================================ //
        public static bool IsWindowsInDarkMode()
        {
            try
            {
                using (RegistryKey key = Registry.CurrentUser.OpenSubKey(@"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize"))
                {
                    if (key?.GetValue("AppsUseLightTheme") != null)
                    {
                        return (int)key.GetValue("AppsUseLightTheme") == 0;
                    }
                }
            }
            catch { }

            return false;
        }

        // ================================================ //
        // Run at startup
        // ================================================ //
        public static bool IsRunAtStartupEnabled()
        {
            try
            {
                using (RegistryKey key = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", false))
                {
                    return key?.GetValue("PocketDrop") != null;
                }
            }
            catch { }
            return false;
        }

        public static bool SetRunAtStartup(bool enable, string exePath)
        {
            try
            {
                using (RegistryKey key = Registry.CurrentUser.OpenSubKey(@"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", true))
                {
                    if (key != null)
                    {
                        if (enable)
                        {
                            key.SetValue("PocketDrop", $"\"{exePath}\"");
                        }
                        else
                        {
                            key.DeleteValue("PocketDrop", false);
                        }
                        return true; // Success
                    }
                }
            }
            catch { }
            return false; // Failed
        }

        // ================================================ //
        // Version check
        // ================================================ //
        // URL Launcher
        public static void OpenUrl(string url)
        {
            try
            {
                System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
                {
                    FileName = url,
                    UseShellExecute = true
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"URL Error: {ex.Message}"); // Log the error
            }
        }

        public static bool IsUpdateAvailable(string currentVersionText, string onlineVersionText)
        {
            // Trim version string to strip whitespace and newlines
            string currentClean = currentVersionText?.Trim() ?? "";
            string onlineClean = onlineVersionText?.Trim() ?? "";

            if (Version.TryParse(currentClean, out Version current) &&
                Version.TryParse(onlineClean, out Version latest))
            {
                return latest > current;
            }

            // Return false on malformed or error version string
            return false;
        }

        // ================================================ //
        // Game mode detection
        // ================================================ //
        [System.Runtime.InteropServices.DllImport("shell32.dll")]
        private static extern int SHQueryUserNotificationState(out int pquns);

        public static bool IsGameModeActive()
        {
            try
            {
                SHQueryUserNotificationState(out int state);
                // 3 = QUNS_RUNNING_D3D_FULL_SCREEN (DirectX Fullscreen Games)
                // 4 = QUNS_PRESENTATION_MODE (Fullscreen Video / PowerPoint)
                return state == 3 || state == 4;
            }
            catch { return false; }
        }

        // ================================================ //
        // Foreground window detection
        // ================================================ //
        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern IntPtr GetForegroundWindow();

        [System.Runtime.InteropServices.DllImport("user32.dll")]
        private static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

        public static bool IsForegroundAppExcluded()
        {
            if (string.IsNullOrWhiteSpace(App.ExcludedApps)) return false;

            try
            {
                IntPtr hWnd = GetForegroundWindow();
                if (hWnd == IntPtr.Zero) return false;

                GetWindowThreadProcessId(hWnd, out uint pid);
                if (pid == 0) return false;

                using (var process = System.Diagnostics.Process.GetProcessById((int)pid))
                {
                    string pName = process.ProcessName.ToLower();

                    var rules = App.ExcludedApps.Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries);

                    foreach (var ruleText in rules)
                    {
                        string rule = System.IO.Path.GetFileNameWithoutExtension(ruleText.Trim()).ToLower();

                        if (string.IsNullOrEmpty(rule)) continue;

                        if (pName.Contains(rule))
                        {
                            return true;
                        }
                    }
                }
            }
            catch { }
            return false;
        }
    }
}