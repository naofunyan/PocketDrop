// PocketDrop
// Copyright (C) 2026 Naofunyan
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

using System.ComponentModel;
using System.Windows.Media;

namespace PocketDrop
{
    // 1. We add INotifyPropertyChanged so it can talk to the UI
    public class AppItem : INotifyPropertyChanged
    {
        public string AppName { get; set; }
        public string ExePath { get; set; }
        public bool IsSelected { get; set; } // Tracks if the user checked the box

        private ImageSource _appIcon;
        private bool _isIconLoading = false;

        // 2. The "Lazy" Property replaces your old AppIcon property
        public ImageSource AppIcon
        {
            get
            {
                // If WPF asks for the icon, and we don't have it yet, go get it!
                if (_appIcon == null && !_isIconLoading && !string.IsNullOrEmpty(ExePath))
                {
                    _isIconLoading = true;
                    LoadIconAsync();
                }
                return _appIcon;
            }
            set
            {
                _appIcon = value;
                // Tap WPF on the shoulder to tell it the image arrived!
                OnPropertyChanged(nameof(AppIcon));
            }
        }

        // 3. Extracts the icon on a background thread so the UI never freezes
        private async void LoadIconAsync()
        {
            var icon = await Task.Run(() => AppScanner.GetIconFromExe(ExePath));
            AppIcon = icon;
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged(string name) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}