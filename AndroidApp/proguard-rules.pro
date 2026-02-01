# Add project specific ProGuard rules here.
-keep class com.uposkunion.app.** { *; }
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keepattributes JavascriptInterface
-keepattributes *Annotation*
-dontwarn com.uposkunion.app.**
