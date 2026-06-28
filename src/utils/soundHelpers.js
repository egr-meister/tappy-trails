/**
 * Sound helpers.
 *
 * Tappy Trails intentionally avoids heavy audio libraries and never
 * requests microphone or any media permissions. These helpers are safe,
 * lightweight hooks that respect the user's sound setting. If audio is not
 * available, they simply return without throwing, so visual feedback
 * always continues to work.
 */

function isSoundEnabled(settings) {
  return settings?.soundEnabled ?? true;
}

/**
 * Called after a valid move. No-op placeholder that is safe to call in any
 * build. Returns true when sound is enabled, false otherwise.
 */
export function playMoveSoundIfEnabled(settings) {
  try {
    if (!isSoundEnabled(settings)) return false;
    // Intentionally no audio playback to keep the app tiny, fully offline,
    // and free of extra permissions. Visual feedback handles the rest.
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Called when a trail is completed. Safe no-op placeholder.
 */
export function playCompleteSoundIfEnabled(settings) {
  try {
    if (!isSoundEnabled(settings)) return false;
    return true;
  } catch (e) {
    return false;
  }
}
