// PocketDrop
// Copyright (C) 2026 Naofunyan
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// any later version.

using System.Windows.Media;

namespace PocketDrop
{
    public class AppItem
    {
        public string AppName { get; set; }
        public string ExePath { get; set; }
        public ImageSource AppIcon { get; set; }
        public bool IsSelected { get; set; } // Tracks if the user checked the box
    }
}