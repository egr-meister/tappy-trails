# Tappy Trails - ProGuard / R8 rules
#
# Staged release optimization:
#   1. First ship a NON-minified release build (minifyEnabled false) and
#      verify it launches on a real device.
#   2. Only then enable minify + resource shrinking using these rules.
#
# Copy this file to android/app/proguard-rules.pro after `expo prebuild`
# (the React Native template already creates that file; replace or append).
#
# These rules use the default optimized config plus the keep rules the
# React Native + Hermes + Expo runtime needs. No risky third-party
# obfuscation libraries are used.

# --- React Native core ---
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keepclassmembers class * {
    @com.facebook.proguard.annotations.DoNotStrip *;
    @com.facebook.proguard.annotations.KeepGettersAndSetters *;
}
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
-keep class com.facebook.jni.** { *; }

# --- Hermes ---
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }

# --- Expo modules ---
-keep class expo.modules.** { *; }
-keep class versioned.host.exp.exponent.** { *; }

# --- AsyncStorage ---
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# --- Keep native method names ---
-keepclasseswithmembernames class * {
    native <methods>;
}

# --- Annotations / generics for reflection-based libs ---
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# Reduce log noise from missing optional classes.
-dontwarn com.facebook.react.**
-dontwarn expo.modules.**
-dontwarn okio.**
-dontwarn okhttp3.**
