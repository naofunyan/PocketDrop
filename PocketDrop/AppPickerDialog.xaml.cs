using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;

namespace PocketDrop
{
    public partial class AppPickerDialog : Window
    {
        // This is where we store the final string of exe paths to give back to Settings
        public string FinalExcludedAppsString { get; private set; } = "";

        private string _existingApps;
        private List<AppItem> _allApps;

        public AppPickerDialog(string existingApps)
        {
            InitializeComponent();
            _existingApps = existingApps ?? "";

            // Start scanning immediately when the window opens!
            LoadAppsAsync();
        }

        private async void LoadAppsAsync()
        {
            // Run the heavy registry scanning on a background thread so the UI doesn't freeze
            _allApps = await Task.Run(() => AppScanner.GetInstalledApps());

            // Check if any of the scanned apps match what the user previously saved
            var savedList = _existingApps.Split(new[] { '\r', '\n', ',' }, StringSplitOptions.RemoveEmptyEntries)
                                         .Select(a => a.Trim().ToLower())
                                         .ToList();

            foreach (var app in _allApps)
            {
                if (savedList.Contains(app.ExePath.ToLower()) ||
                    savedList.Contains(System.IO.Path.GetFileName(app.ExePath).ToLower()))
                {
                    app.IsSelected = true;
                }
            }

            // Hide the loading text and show the grid
            LoadingPanel.Visibility = Visibility.Collapsed;
            AppListControl.ItemsSource = _allApps;
            AppListControl.Visibility = Visibility.Visible;
        }

        private void ManualBrowse_Click(object sender, MouseButtonEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Filter = "Executables (*.exe)|*.exe|All files (*.*)|*.*",
                Title = "Select an Application"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                string path = openFileDialog.FileName;

                // Manually create a new AppItem for the custom file
                var customApp = new AppItem
                {
                    AppName = System.IO.Path.GetFileNameWithoutExtension(path),
                    ExePath = path,
                    AppIcon = AppScanner.GetIconFromExe(path),
                    IsSelected = true // Auto-check it since they just picked it!
                };

                _allApps.Insert(0, customApp); // Put it at the very top of the list

                // Refresh the UI
                AppListControl.ItemsSource = null;
                AppListControl.ItemsSource = _allApps;
            }
        }

        private void Save_Click(object sender, RoutedEventArgs e)
        {
            // Gather all the currently checked apps
            var checkedApps = _allApps.Where(a => a.IsSelected).Select(a => a.ExePath).ToList();

            // Join them together with line breaks so it perfectly matches your existing App.ExcludedApps format
            FinalExcludedAppsString = string.Join(Environment.NewLine, checkedApps);

            DialogResult = true;
            Close();
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            Close();
        }
    }
}