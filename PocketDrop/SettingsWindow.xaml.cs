// PocketDrop
// Copyright (C) 2026 Naofunyan
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Shapes;
using System.Text.Json;

namespace PocketDrop
{
    public partial class SettingsWindow : Window
    {
        // ================================================ //
        // 1. STATE & VARIABLES
        // ================================================ //

        // Prevents language change event during window initialization
        private bool _isLanguageLoaded = false;


        // ================================================ //
        // 2. WINDOW LIFECYCLE (STARTUP)
        // ================================================ //

        public SettingsWindow()
        {
            InitializeComponent();

            // 1. Load basic toggles and combo boxes
            CopyItemToDestinationCheckbox.IsChecked = AppGlobals.CopyItemToDestination;
            StartupToggle.IsChecked = AppHelpers.IsRunAtStartupEnabled();
            ShakeToggle.IsChecked = AppGlobals.EnableMouseShake;
            ShakeDistText.Text = AppGlobals.ShakeMinimumDistance.ToString();
            GameModeCheck.IsChecked = AppGlobals.DisableInGameMode;
            PlacementCombo.SelectedIndex = AppGlobals.PocketPlacement;
            LayoutCombo.SelectedIndex = AppGlobals.ItemsLayoutMode;
            AutoCompressShareToggle.IsChecked = AppGlobals.AutoCompressFoldersShare;
            CloseEmptiedToggle.IsChecked = AppGlobals.CloseWhenEmptied;
            CloseOpenWithToggle.IsChecked = AppGlobals.CloseWhenOpenWith;
            CloseShareToggle.IsChecked = AppGlobals.CloseWhenShare;
            CloseCompressToggle.IsChecked = AppGlobals.CloseWhenCompress;

            // 2. Dynamically draw the saved shortcut keys
            RenderKeycaps(PocketKeysContainer, AppGlobals.PocketModifiers, AppGlobals.PocketKeyChar);
            RenderKeycaps(ClipboardKeysContainer, AppGlobals.ClipboardModifiers, AppGlobals.ClipboardKeyChar);

            // 3. Load the exception apps UI
            RefreshExcludedAppsDisplay();

            // 4. Pull the clean version from our new central source
            AppVersionText.Text = $"Version {AppGlobals.GetAppVersion()}";

            // 5. Load and apply the Theme
            ThemeCombo.SelectedIndex = AppGlobals.AppTheme;
            ApplyTheme(AppGlobals.AppTheme);

            // 6. Load and apply the Language
            if (AppGlobals.AppLanguage == "Vietnamese")
            {
                LanguageCombo.SelectedIndex = 1;
            }
            else
            {
                LanguageCombo.SelectedIndex = 0;
            }
            // Mark as loaded so the event doesn't trigger during window creation
            _isLanguageLoaded = true;

            // 7. Check if background scanner already found an update
            if (AppGlobals.UpdateAvailable)
            {
                CheckUpdateBtn.Content = "Update Available!";
                CheckUpdateBtn.Style = (Style)FindResource("SuccessButtonStyle");
            }
        }


        // ================================================ //
        // 3. THEME & LANGUAGE ENGINE
        // ================================================ //
        private void ThemeCombo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ThemeCombo != null && this.IsLoaded)
            {
                AppGlobals.AppTheme = ThemeCombo.SelectedIndex;
                AppGlobals.SaveSettings();
                ApplyTheme(ThemeCombo.SelectedIndex);
            }
        }

        private void ApplyTheme(int themeIndex)
        {
            bool useDarkMode = themeIndex == 0 ? AppHelpers.IsWindowsInDarkMode() : themeIndex == 2;
            string themeFileName = useDarkMode ? "DarkTheme.xaml" : "LightTheme.xaml";
            Uri themeUri = new Uri($"pack://application:,,,/PocketDrop;component/Themes/{themeFileName}");

            var dictionaries = System.Windows.Application.Current.Resources.MergedDictionaries;

            var newThemeDict = new ResourceDictionary { Source = themeUri };
            dictionaries.Add(newThemeDict);

            // Remove old theme files to prevent conflicts and memory leaks
            var oldThemes = new List<ResourceDictionary>();
            foreach (var dict in dictionaries)
            {
                if (dict != newThemeDict && dict.Source != null && dict.Source.ToString().Contains("Theme.xaml"))
                {
                    oldThemes.Add(dict);
                }
            }

            foreach (var oldTheme in oldThemes)
            {
                dictionaries.Remove(oldTheme);
            }
        }

        private async void LanguageCombo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (!_isLanguageLoaded) return;

            var selectedBox = (ComboBoxItem)LanguageCombo.SelectedItem;
            string selectedLanguage = selectedBox.Content.ToString();

            string dictPath = selectedLanguage == "Vietnamese"
                ? "pack://application:,,,/PocketDrop;component/Languages/Strings.vi.xaml"
                : "pack://application:,,,/PocketDrop;component/Languages/Strings.en.xaml";

            // Save choice
            AppGlobals.AppLanguage = selectedLanguage == "Vietnamese" ? "Vietnamese" : "English";
            AppGlobals.SaveSettings();

            var dictionaries = System.Windows.Application.Current.Resources.MergedDictionaries;

            var newLangDict = new ResourceDictionary { Source = new Uri(dictPath) };
            dictionaries.Add(newLangDict);

            // Clean up any old language files sitting in memory
            var oldLangs = new List<ResourceDictionary>();
            foreach (var dict in dictionaries)
            {
                if (dict != newLangDict && dict.Source != null && dict.Source.ToString().Contains("Strings."))
                {
                    oldLangs.Add(dict);
                }
            }

            foreach (var oldLang in oldLangs)
            {
                dictionaries.Remove(oldLang);
            }

            // Wait 50ms for WPF to finish loading resource dictionary
            await System.Threading.Tasks.Task.Delay(50);

            // Trigger tray menu to fetch updated translations
            App.UpdateTrayMenuLanguage();
        }


        // ================================================ //
        // 4. PREFERENCES & TOGGLES (THE CHECKBOXES)
        // ================================================ //
        private void StartupToggle_Click(object sender, RoutedEventArgs e)
        {
            bool enable = StartupToggle.IsChecked ?? false;

            bool success = AppHelpers.SetRunAtStartup(enable, Environment.ProcessPath);

            if (!success)
            {
                string errorTitle = (string)Application.Current.Resources["Text_StartupErrorTitle"] ?? "Permission Error";
                string errorMsg = (string)Application.Current.Resources["Text_StartupErrorMsg"] ?? "Could not update startup settings.";

                MessageBox.Show(errorMsg, errorTitle, MessageBoxButton.OK, MessageBoxImage.Error);
                StartupToggle.IsChecked = !enable; // Revert UI
            }
        }

        // Update global setting on toggle switch change
        private void Copy_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.CopyItemToDestination = CopyItemToDestinationCheckbox.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void ShakeToggle_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.EnableMouseShake = ShakeToggle.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void GameModeCheck_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.DisableInGameMode = GameModeCheck.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void AutoCompressShareToggle_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.AutoCompressFoldersShare = AutoCompressShareToggle.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void CloseEmptiedToggle_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.CloseWhenEmptied = CloseEmptiedToggle.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void CloseOpenWithToggle_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.CloseWhenOpenWith = CloseOpenWithToggle.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void CloseShareToggle_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.CloseWhenShare = CloseShareToggle.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void CloseCompressToggle_Click(object sender, RoutedEventArgs e)
        {
            AppGlobals.CloseWhenCompress = CloseCompressToggle.IsChecked ?? true;
            AppGlobals.SaveSettings();
        }

        private void PlacementCombo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (PlacementCombo != null && this.IsLoaded)
            {
                AppGlobals.PocketPlacement = PlacementCombo.SelectedIndex;
                AppGlobals.SaveSettings();
            }
        }

        private void LayoutCombo_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (LayoutCombo != null && this.IsLoaded)
            {
                AppGlobals.ItemsLayoutMode = LayoutCombo.SelectedIndex;
                AppGlobals.SaveSettings();
            }
        }

        // Drop focus on Enter key press
        private void ShakeDistText_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter)
            {
                Keyboard.ClearFocus();
            }
        }

        private void ShakeDistText_TextChanged(object sender, TextChangedEventArgs e)
        {
            // Only save input if value is a valid number
            if (int.TryParse(ShakeDistText.Text, out int dist))
            {
                AppGlobals.ShakeMinimumDistance = dist;
                AppGlobals.SaveSettings();
            }
        }


        // ================================================ //
        // 5. SHORTCUTS & APP EXCLUSIONS
        // ================================================ //

        private void RenderKeycaps(StackPanel container, uint mods, string letter)
        {
            container.Children.Clear();

            if ((mods & AppGlobals.MOD_WIN) != 0) AddKeycap(container, "Win");
            if ((mods & AppGlobals.MOD_CTRL) != 0) AddKeycap(container, "Ctrl");
            if ((mods & AppGlobals.MOD_ALT) != 0) AddKeycap(container, "Alt");
            if ((mods & AppGlobals.MOD_SHIFT) != 0) AddKeycap(container, "Shift");

            AddKeycap(container, letter);
        }

        private void AddKeycap(StackPanel container, string text)
        {
            var border = new Border
            {
                Background = (Brush)new BrushConverter().ConvertFrom("#dd2c2f"),
                CornerRadius = new CornerRadius(4),

                Padding = new Thickness(10, 4, 10, 4),
                Margin = new Thickness(0, 0, 4, 0),
                MinWidth = 32
            };

            if (text == "Win")
            {
                border.Child = new Path
                {
                    Data = Geometry.Parse("M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM13 13H21V21H13V13Z"),
                    Fill = Brushes.White,
                    Width = 12,
                    Height = 12,
                    Stretch = Stretch.Uniform,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    VerticalAlignment = VerticalAlignment.Center
                };
            }
            else
            {
                border.Child = new TextBlock
                {
                    Text = text,
                    Foreground = Brushes.White,
                    FontWeight = FontWeights.SemiBold,
                    FontSize = 12,
                    HorizontalAlignment = HorizontalAlignment.Center,
                    VerticalAlignment = VerticalAlignment.Center
                };
            }
            container.Children.Add(border);
        }

        private void EditPocketKey_Click(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            string dialogTitle = (string)this.FindResource("Text_NewPocketShortcut");

            // Pass current and factory-reset keys to shortcut handler
            var dialog = new ShortcutDialog(dialogTitle, AppGlobals.PocketKeyChar, AppGlobals.PocketModifiers, "Z", AppGlobals.MOD_WIN | AppGlobals.MOD_SHIFT) { Owner = this };
            if (dialog.ShowDialog() == true)
            {
                AppGlobals.PocketKeyChar = dialog.SelectedLetter;
                AppGlobals.PocketKeyVK = dialog.SelectedVK;
                AppGlobals.PocketModifiers = dialog.SelectedModifiers; // Save the new modifiers
                RenderKeycaps(PocketKeysContainer, AppGlobals.PocketModifiers, AppGlobals.PocketKeyChar);
                App.ReloadHotkeys();
            }
        }

        private void EditClipboardKey_Click(object sender, System.Windows.Input.MouseButtonEventArgs e)
        {
            string dialogTitle = (string)this.FindResource("Text_ClipboardShortcut");

            var dialog = new ShortcutDialog(dialogTitle, AppGlobals.ClipboardKeyChar, AppGlobals.ClipboardModifiers, "X", AppGlobals.MOD_WIN | AppGlobals.MOD_SHIFT) { Owner = this };
            if (dialog.ShowDialog() == true)
            {
                AppGlobals.ClipboardKeyChar = dialog.SelectedLetter;
                AppGlobals.ClipboardKeyVK = dialog.SelectedVK;
                AppGlobals.ClipboardModifiers = dialog.SelectedModifiers; // Save the new modifiers
                RenderKeycaps(ClipboardKeysContainer, AppGlobals.ClipboardModifiers, AppGlobals.ClipboardKeyChar);
                App.ReloadHotkeys();
            }
        }

        private void OpenAppPicker_Click(object sender, RoutedEventArgs e)
        {
            // Open exceptions dialog with currently saved apps
            var dialog = new AppPickerDialog(AppGlobals.ExcludedApps) { Owner = this };

            // If the user clicked "Save"
            if (dialog.ShowDialog() == true)
            {
                // Save the new string to global settings
                AppGlobals.ExcludedApps = dialog.FinalExcludedAppsString;
                AppGlobals.SaveSettings();

                RefreshExcludedAppsDisplay(); // Refresh UI only when changes are confirmed saved
            }
        }

        private async void RefreshExcludedAppsDisplay()
        {
            if (string.IsNullOrWhiteSpace(AppGlobals.ExcludedApps))
            {
                ExcludedAppsEmptyText.Visibility = Visibility.Visible;
                ExcludedAppsIconDisplay.ItemsSource = null;
                return;
            }

            ExcludedAppsEmptyText.Visibility = Visibility.Collapsed;

            // Grab the raw paths from settings
            var paths = AppGlobals.ExcludedApps
                .Split(new[] { '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(p => p.Trim())
                .ToList();

            // Run the icon extraction on a background thread
            var displayItems = await System.Threading.Tasks.Task.Run(() =>
            {
                var list = new List<AppItem>();
                foreach (var path in paths)
                {
                    list.Add(new AppItem
                    {
                        AppName = System.IO.Path.GetFileNameWithoutExtension(path),
                        AppIcon = AppScanner.GetIconFromExe(path)
                    });
                }
                return list;
            });

            // Bind AppItem list to XAML grid
            ExcludedAppsIconDisplay.ItemsSource = displayItems;
        }


        // ================================================ //
        // 6. ABOUT, LINKS, & OVERLAYS
        // ================================================ //
        
        // Open temp folder
        private void OpenTempFolder_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                System.Diagnostics.Process.Start("explorer.exe", System.IO.Path.GetTempPath());
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Could not open folder: {ex.Message}");
            }
        }

        private void PrivacyPolicy_Click(object sender, MouseButtonEventArgs e) => PrivacyOverlay.Visibility = Visibility.Visible;
        private void ClosePrivacy_Click(object sender, RoutedEventArgs e) => PrivacyOverlay.Visibility = Visibility.Collapsed;

        private void ThirdParty_Click(object sender, MouseButtonEventArgs e) => LicenseOverlay.Visibility = Visibility.Visible;
        private void CloseLicense_Click(object sender, RoutedEventArgs e) => LicenseOverlay.Visibility = Visibility.Collapsed;

        //private void Rate_Click(object sender, MouseButtonEventArgs e)
        //{
        //    AppHelpers.OpenUrl("ms-windows-store://review/?ProductId=YOUR_APP_ID");
        //}

        private void GetHelp_Click(object sender, MouseButtonEventArgs e)
        {
            AppHelpers.OpenUrl("https://github.com/naofunyan/PocketDrop/issues");
        }


        // ================================================ //
        // 7. UPDATE CHECKER ENGINE
        // ================================================ //

        private void ShowUpdateAvailableButton()
        {
            // 1. Change the text to alert the user
            CheckUpdateBtn.Content = "Update Available!";

            // 2. Safely swap the style from Blue to the Green one we created
            CheckUpdateBtn.Style = (Style)FindResource("SuccessButtonStyle");
        }

        // Update checker
        private async void CheckUpdateBtn_Click(object sender, RoutedEventArgs e)
        {
            // 1. Open download page if background scanner found update
            if (AppGlobals.UpdateAvailable)
            {
                AppHelpers.OpenUrl(AppGlobals.UpdateUrl);
                return;
            }

            // 2. Run manual version check if no cached result
            CheckUpdateBtn.IsEnabled = false;
            CheckUpdateBtn.Content = (string)Application.Current.Resources["Text_CheckingUpdate"] ?? "Checking...";
            // Reset the style back to default before the network check starts
            CheckUpdateBtn.Style = (Style)FindResource("PrimaryButtonStyle");

            try
            {
                // Query the Releases API (This grabs a list of all your releases, newest first)
                string url = "https://api.github.com/repos/naofunyan/PocketDrop/releases";

                // ✨ FIX: Use the shared global client!
                string jsonResponse = await AppHelpers.GlobalClient.GetStringAsync(url);

                using (JsonDocument doc = JsonDocument.Parse(jsonResponse))
                {
                    JsonElement root = doc.RootElement;

                    if (root.GetArrayLength() > 0)
                    {
                        // Grab the "tag_name" from the absolute newest release (e.g., "v1.0.1")
                        string latestTag = root[0].GetProperty("tag_name").GetString();
                        // Strip the "v" from the front so it cleanly matches your internal version logic
                        string latestVersionString = latestTag.TrimStart('v', 'V');
                        string currentVersionString = AppGlobals.GetAppVersion().Replace(" Beta ", "-beta");
                        bool hasUpdate = AppHelpers.IsUpdateAvailable(currentVersionString, latestVersionString);

                        if (hasUpdate)
                        {
                            AppGlobals.UpdateAvailable = true;

                            string updateTitle = (string)Application.Current.Resources["Text_UpdateAvailableTitle"] ?? "Update Available";
                            string updateMsgTemplate = (string)Application.Current.Resources["Text_UpdateAvailableMsg"] ?? "A new version of PocketDrop ({0}) is available!\n\nWould you like to install it now? The app will restart automatically.";
                            string updateMsg = string.Format(updateMsgTemplate, latestVersionString.Trim());

                            MessageBoxResult result = MessageBox.Show(updateMsg, updateTitle, MessageBoxButton.YesNo, MessageBoxImage.Information);

                            if (result == MessageBoxResult.Yes)
                            {
                                try
                                {
                                    // 1. Change UI to show it is working
                                    CheckUpdateBtn.Content = "Downloading Update...";
                                    CheckUpdateBtn.IsEnabled = false;

                                    // 2. Smart Architecture Asset Selection
                                    string currentArch = System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture.ToString().ToLower();
                                    string downloadUrl = null;
                                    string hashUrl = null;
                                    string exeName = null;

                                    foreach (System.Text.Json.JsonElement asset in root[0].GetProperty("assets").EnumerateArray())
                                    {
                                        string name = asset.GetProperty("name").GetString().ToLower();
                                        string assetUrl = asset.GetProperty("browser_download_url").GetString();

                                        if (name.EndsWith(".exe"))
                                        {
                                            // Prefer an exact architecture match, otherwise fallback to the first .exe found
                                            if (name.Contains(currentArch) || downloadUrl == null)
                                            {
                                                downloadUrl = assetUrl;
                                                exeName = name;
                                            }
                                        }
                                        else if (name.EndsWith(".sha256") || name.Contains("checksum"))
                                        {
                                            hashUrl = assetUrl; // Found a security signature file!
                                        }
                                    }

                                    // 2. Dig into the GitHub JSON to find the actual .exe download link
                                    if (downloadUrl == null) throw new Exception("No valid installer found for this architecture.");

                                    // 3. Use LocalAppData folder
                                    string localAppData = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
                                    string updateFolder = System.IO.Path.Combine(localAppData, "PocketDrop", "Updates");
                                    System.IO.Directory.CreateDirectory(updateFolder);

                                    string tempInstallerPath = System.IO.Path.Combine(updateFolder, "PocketDrop_Update.exe");

                                    // ✨ FIX: Use the shared global client to download the payload!
                                    // 4. Download the .exe to the custom updates folder
                                    byte[] fileBytes = await AppHelpers.GlobalClient.GetByteArrayAsync(downloadUrl);
                                    await System.IO.File.WriteAllBytesAsync(tempInstallerPath, fileBytes);

                                    // 5. Optional Hash Verification (If you uploaded a checksum file)
                                    if (hashUrl != null)
                                    {
                                        string hashFileContent = await AppHelpers.GlobalClient.GetStringAsync(hashUrl);
                                        string expectedHash = "";

                                        // Parse standard linux 'sha256sum' format (hash  filename.exe) or a raw hash string
                                        foreach (var line in hashFileContent.Split('\n'))
                                        {
                                            if (line.ToLower().Contains(exeName) || !line.Contains(" "))
                                            {
                                                expectedHash = line.Split(' ')[0]; // Grab just the hash string
                                                break;
                                            }
                                        }

                                        if (!AppHelpers.VerifyFileHash(tempInstallerPath, expectedHash))
                                        {
                                            System.IO.File.Delete(tempInstallerPath);
                                            throw new Exception("Security Alert: The downloaded update failed integrity verification and was deleted to protect your system.");
                                        }
                                    }

                                    // 6. Fire the installer in standard Silent mode (Shows progress, but auto-clicks Next)
                                    System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
                                    {
                                        FileName = tempInstallerPath,
                                        Arguments = "/SILENT /SUPPRESSMSGBOXES /NORESTART",
                                        UseShellExecute = true
                                    });

                                    // 7. Instantly commit suicide so the installer can overwrite our files!
                                    System.Windows.Application.Current.Shutdown();
                                }
                                catch (Exception ex)
                                {
                                    MessageBox.Show("Failed to download the update: " + ex.Message, "Update Error", MessageBoxButton.OK, MessageBoxImage.Error);
                                    CheckUpdateBtn.Content = "Update Failed";
                                }
                            }
                            else
                            {
                                // If they click No, just show the green button so they can do it later
                                CheckUpdateBtn.Content = (string)Application.Current.Resources["Text_UpdateAvailableBtn"] ?? "Update Available!";
                                CheckUpdateBtn.Style = (Style)FindResource("SuccessButtonStyle");
                            }
                        }
                        else
                        {
                            // 1. Grab the translation strings
                            string upToDateTitle = (string)Application.Current.Resources["Text_UpdateUpToDateTitle"] ?? "Up to date";
                            string upToDateMsg = (string)Application.Current.Resources["Text_UpdateUpToDateMsg"] ?? "You are already using the latest version of PocketDrop.";

                            // 2. Show the confirmation popup
                            MessageBox.Show(upToDateMsg, upToDateTitle, MessageBoxButton.OK, MessageBoxImage.Information);

                            // 3. Update the button to show success visually
                            CheckUpdateBtn.Content = upToDateTitle;
                            CheckUpdateBtn.Style = (Style)FindResource("SuccessButtonStyle");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                string failTitle = (string)Application.Current.Resources["Text_UpdateCheckFailedTitle"] ?? "Update Check Failed";
                string failMsg = $"Could not connect to GitHub. Reason:\n\n{ex.Message}";

                MessageBox.Show(failMsg, failTitle, MessageBoxButton.OK, MessageBoxImage.Warning);

                // Reset the button back to normal ONLY if it failed
                CheckUpdateBtn.Content = (string)Application.Current.Resources["Text_CheckUpdatesBtn"] ?? "Check for updates";
                CheckUpdateBtn.Style = (Style)FindResource("PrimaryButtonStyle");
            }
            finally
            {
                CheckUpdateBtn.IsEnabled = true;
            }
        }
    }
}