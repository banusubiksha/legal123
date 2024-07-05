# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Ensure that JavascriptInterface annotations are kept
-keepclassmembers class * {
   @android.webkit.JavascriptInterface <methods>;
}

# Keep attributes used by JavascriptInterface
-keepattributes JavascriptInterface

# Keep all members of classes related to React Native
-keepclassmembers class * { *; }

# Don't warn about missing classes in React Native
-dontwarn com.facebook.react.**
-keep class com.facebook.react.** { *; }

# Don't warn about missing javax.annotation classes
-dontwarn javax.annotation.**
-keep class javax.annotation.** { *; }

# Don't warn about missing okio classes
-dontwarn okio.**
-keep class okio.** { *; }

# Don't warn about missing Kotlin classes
-dontwarn kotlin.**
-keep class kotlin.** { *; }

# Don't warn about missing kotlinx classes
-dontwarn kotlinx.**
-keep class kotlinx.** { *; }
