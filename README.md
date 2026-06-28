# Tappy Trails 🐰🌿⭐

**Tap the path and guide your friend.**

Tappy Trails is a calm, offline, child-friendly trail and maze game built with
React Native and Expo. Children tap connected path cells to guide a cute
character (Bunny, Turtle, Puppy, or Robot) from the start of a trail to a
friendly goal (Carrot, Little House, or Star). The game is pressure-free: there
are no timers, no countdowns, no penalties, and no scary obstacles.

---

## Features

- Four friendly characters: Bunny, Turtle, Puppy, Robot.
- Three friendly goals: Carrot, Little House, Star.
- 12 hand-made trails across three difficulty levels (Easy 3×3, Medium 4×4,
  Hard 5×5).
- Simple tap-to-move gameplay that practices path planning, spatial thinking,
  and following a trail.
- Gentle path hints that softly reveal the next step(s).
- Local progress, statistics, and achievement badges.
- Bright but calm "Tappy Trail Garden" visual style drawn with pure React
  Native views and simple symbols — no heavy art packs.
- Works fully offline. No ads, purchases, accounts, analytics, or data
  collection.

---

## Child safety & privacy

Tappy Trails does not collect, store, or share personal information. The app
works offline without internet access. Maze progress, statistics, achievements,
and settings are stored only on the device.

Tappy Trails is a calm offline trail maze game for children. It does not use
ads, purchases, accounts, internet access, social sharing, leaderboards, or
personal data collection. There are **no coins, bonuses, jackpots, or real
money rewards** of any kind. Achievements are simple local progress markers and
have no monetary value.

The app does **not** request internet access or any runtime permissions
(no camera, microphone, location, contacts, notifications, storage, gallery,
or file access). It works in airplane mode.

---

## How the maze works (tap rules)

- The character starts on the **start** cell; the **goal** sits on the target
  cell.
- Tap a connected path cell that is directly **up, down, left, or right** of the
  character to move there. Diagonal moves are not allowed.
- A valid tap moves the character and increases the move count.
- An invalid tap shows a gentle hint ("Try a nearby path.") and never moves the
  character or resets the level.
- When the character reaches the goal, the trail is complete and progress is
  saved locally.

### Maze sizes & difficulty

| Difficulty | Grid | Path |
|------------|------|------|
| Easy       | 3×3  | One clear path, very few turns, strong hint |
| Medium     | 4×4  | More turns, optional branches, hint on request |
| Hard       | 5×5  | Longer path, a few harmless dead ends, still gentle |

No maze requires fast reaction or perfect timing, and no maze can permanently
trap the child.

### Path hints

A gentle hint softly glows the next cells of the correct path:

- **Easy** can reveal up to 3 upcoming cells.
- **Medium** reveals up to 2.
- **Hard** reveals only 1.

Hints never auto-complete the level. Hint usage is counted locally and is
**never** treated as a penalty.

### Achievements & progress

Local achievement badges:

1. **First Trail Badge** — complete 1 level.
2. **Bunny Trail Badge** — complete 2 levels with Bunny.
3. **Turtle Path Badge** — complete 2 levels with Turtle.
4. **Puppy Home Badge** — complete 2 levels with Puppy.
5. **Robot Route Badge** — complete 2 levels with Robot.
6. **Little Maze Star** — complete 10 levels.
7. **Trail Helper Badge** — use 5 hints.

No rankings, no leaderboards, no social sharing. Badges are progress markers
only and have no money value.

---

## Screen, orientation & Android behavior

- Orientation is locked to **portrait**.
- Fullscreen **sticky immersive** behavior hides the status and navigation bars
  (they reappear briefly after an edge swipe), implemented declaratively with
  `SystemBars` from `react-native-edge-to-edge`.
- **Safe area** handling keeps content clear of notches, cutouts, and rounded
  corners via `react-native-safe-area-context`.
- Large, child-friendly tap targets throughout.
- **Keep awake** (`expo-keep-awake`) is active **only on the active maze
  screen** and is always released when leaving it.

---

## Visual style — "Tappy Trail Garden"

A soft outdoor trail world: grass tiles, yellow stepping-stone path cells,
friendly character tokens, a softly glowing goal, and gentle hint glows. Bright
but calm, never dark or scary, and never casino-like. The custom app icon shows
a bunny on a 3×3 trail grid with a star goal on a warm green/yellow background.
The splash screen shows the four friends, a glowing path leading to a star, and
the title "Tappy Trails" with the subtitle "Tap the path and find the goal."

---

## Project structure

```
App.js
app.json
package.json
package-lock.json
.github/workflows/android-build.yml
ci/signing.gradle
ci/proguard-rules.pro
assets/
  icon.png
  adaptive-icon.png
  splash.png
src/
  navigation/AppNavigator.js
  screens/        (8 screens)
  components/     (13 components)
  data/           (characterItems, goalItems, mazeLevels, achievementItems)
  utils/          (maze, path, movement, stats, progress, sound, animation,
                   immersive, date helpers)
  storage/appStorage.js
  theme/colors.js
```

---

## Getting started (local development)

This project was set up with the official Expo template:

```bash
# Scaffold (already done in this repo):
npx create-expo-app tappy-trails --template blank

# Install dependencies (uses the committed package-lock.json):
npm install

# Keep Expo-managed package versions aligned:
npx expo install --fix
npx expo-doctor
npx expo install --check

# Run in development:
npx expo start
```

Every package imported by the app is listed as a **direct** dependency in
`package.json`, including the Expo core modules `expo-asset`, `expo-constants`,
`expo-font`, `expo-modules-core`, and `expo-keep-awake`.

> When adding packages, always use `npx expo install <package>` so versions
> match the installed Expo SDK. Do not hand-edit dependency versions.

---

## Building for Android

```bash
# Generate the native Android project (regenerable any time):
npx expo prebuild --platform android

# Run on a connected device / emulator:
npx expo run:android
```

### Google Play compatibility

- Targets **Android API 35** (`compileSdkVersion 35`, `targetSdkVersion 35`),
  provided by the current Expo SDK 53 / React Native 0.79 toolchain.
- `minSdkVersion` is 24 (satisfies React Native 0.79).
- The release **AAB supports Android 15+ 16 KB memory page sizes** because it
  uses the current React Native 0.79 / Expo SDK 53 native libraries built with a
  modern Android Gradle Plugin and NDK. No old native libraries, Firebase, ads,
  analytics, or payment SDKs are included.
- This avoids the Play Console errors:
  - "Your app currently targets API level 34 and must target at least API
    level 35."
  - "Your app does not support 16 KB memory page sizes."

---

## Release signing (PKCS12)

Generate a release keystore. **Use the same password for the keystore and the
key** — different passwords can break PKCS12 signing.

```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore tappy-trails-release-key.p12 \
  -alias tappy_trails_key \
  -keyalg RSA -keysize 2048 -validity 10000
```

Convert the keystore to base64:

```bash
# macOS / Linux:
base64 -i tappy-trails-release-key.p12 -o keystore.base64.txt
# (Linux without -i/-o):  base64 tappy-trails-release-key.p12 > keystore.base64.txt
```

Add these **GitHub Secrets** (repo → Settings → Secrets and variables → Actions):

| Secret | Value |
|--------|-------|
| `ANDROID_KEYSTORE_BASE64`   | contents of `keystore.base64.txt` |
| `ANDROID_KEYSTORE_PASSWORD` | the keystore password |
| `ANDROID_KEY_ALIAS`         | `tappy_trails_key` |
| `ANDROID_KEY_PASSWORD`      | the key password (same as keystore password) |

**Never commit the keystore or passwords to the repository.**

---

## GitHub Actions build

The workflow `.github/workflows/android-build.yml` runs on push to `main`. It:

1. Installs Node.js and JDK 17.
2. Runs `npm install`.
3. Runs `npx expo install --fix`, `npx expo-doctor`, `npx expo install --check`.
4. Installs **Android SDK Platform 35** and **Build Tools 35.0.0**
   (`sdkmanager "platforms;android-35" "build-tools;35.0.0"`).
5. Runs `npx expo prebuild` to generate the native project.
6. Decodes the release keystore from secrets.
7. Builds a **signed release APK** and a **signed release AAB**, using
   `ci/signing.gradle` as a Gradle init script so the prebuilt `build.gradle`
   never has to be edited.
8. Uploads `tappy-trails-release.apk` and `tappy-trails-release.aab` as build
   artifacts.

The emulator launch smoke-test is intentionally **not** part of CI; launch
verification is a local pre-release step (below).

---

## Release optimization (staged)

Ship in two stages:

1. **First**, build and verify a **non-minified** release
   (`minifyEnabled false`, `shrinkResources false` — the default here). Confirm
   it launches on a real device.
2. **Then** enable standard R8/ProGuard minification and resource shrinking:

   ```gradle
   android {
       buildTypes {
           release {
               minifyEnabled true
               shrinkResources true
               proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'),
                   'proguard-rules.pro'
           }
       }
   }
   ```

   Use the rules in `ci/proguard-rules.pro` (copy them into
   `android/app/proguard-rules.pro` after prebuild). Re-test the app launch
   locally after enabling minify and resource shrinking. Minification is **not**
   a substitute for the app's real product uniqueness.

---

## Local launch verification checklist

A successful CI build does not prove the app launches. Before release:

1. Build the release APK (`npx expo run:android --variant release`, or install
   the artifact APK).
2. Install it on a physical Android device or local emulator.
3. Launch the app.
4. Capture `adb logcat`.
5. Confirm there are **no** errors such as:
   - "Cannot find native module"
   - "Module has not been registered"
   - "Invariant Violation"
   - "theme.fonts.regular is undefined"
6. Confirm the app opens in airplane mode and requests no permissions.

---

## Privacy note

Tappy Trails does not collect personal data. The app works offline and stores
maze progress, statistics, achievements, and settings only on this device.
