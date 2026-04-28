using System;
using System.Collections.Generic;
using System.Text;

namespace PocketDrop
{
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

            // Detect direction change for shake detection
            if (_currentDir != 0 && newDir != _currentDir)
            {
                // Calculate distance traveled between direction changes
                int swingDistance = Math.Abs(_lastX - _swingOriginX);

                if (swingDistance >= minDistancePx)
                {
                    _swingTimestamps.Enqueue(currentTimestampMs); // Record timestamp when a valid swing is detected
                }

                _swingOriginX = _lastX; // Reset origin for the next swing
            }

            _currentDir = newDir;
            _lastX = currentMouseX;

            // Dismiss swings outside the time window
            while (_swingTimestamps.Count > 0 && (currentTimestampMs - _swingTimestamps.Peek()) > maxTimeMs)
            {
                _swingTimestamps.Dequeue();
            }

            // Check if swing count meets shake threshold
            if (_swingTimestamps.Count >= requiredSwings)
            {
                _swingTimestamps.Clear(); // Reset state to prevent re-triggering
                _isFirstMove = true;
                return true;
            }

            return false;
        }
    }
}
