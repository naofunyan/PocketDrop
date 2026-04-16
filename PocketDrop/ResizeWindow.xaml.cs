using System.Text.RegularExpressions;
using System.Windows;
using System.Windows.Input;

namespace PocketDrop
{
    public enum ImageResizeMode { Fit, Fill, Stretch }
    public enum ImageResizeUnit { Pixels, Percentages, Centimeters }

    public partial class ResizeWindow : Window
    {
        public double TargetWidth { get; private set; }
        public double TargetHeight { get; private set; }
        public ImageResizeMode SelectedMode { get; private set; }
        public ImageResizeUnit SelectedUnit { get; private set; }

        public ResizeWindow()
        {
            InitializeComponent();
        }

        private void NumberValidation(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new Regex("[^0-9.]+");
            e.Handled = regex.IsMatch(e.Text);
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            this.DialogResult = false;
            this.Close();
        }

        private void Apply_Click(object sender, RoutedEventArgs e)
        {
            double.TryParse(WidthInput.Text, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out double w);
            double.TryParse(HeightInput.Text, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out double h);

            if (w > 0 || h > 0)
            {
                TargetWidth = w;
                TargetHeight = h;
                SelectedMode = (ImageResizeMode)ModeCombo.SelectedIndex;
                SelectedUnit = (ImageResizeUnit)UnitCombo.SelectedIndex;

                this.DialogResult = true;
                this.Close();
            }
            else
            {
                MessageBox.Show("Please enter at least one valid number.", "Invalid Input", MessageBoxButton.OK, MessageBoxImage.Warning);
            }
        }
    }
}