# UP Outsourcing Sangh Android App

## 📱 Android App Installation Guide (हिंदी में)

यह **UP Outsourcing Sangh** की official Android app है जो website की सभी सुविधाओं को mobile app में provide करती है।

---

## ✨ App Features (विशेषताएं)

### मुख्य सुविधाएं:
- ✅ **पूरी Website** - सभी pages app में available
- ✅ **Offline Support** - बिना internet के भी कुछ content देख सकते हैं
- ✅ **Fast Loading** - तेज़ loading और smooth navigation
- ✅ **File Upload** - Registration और Complaint में photo upload
- ✅ **Pull to Refresh** - नीचे खींचकर page refresh करें
- ✅ **Native Experience** - Android के back button से navigation

### उपलब्ध Sections:
- 🏠 Home Page
- 📝 Registration (सदस्यता)
- 🔐 Login (Admin/Officer/Member)
- 📊 Dashboards (सभी dashboards)
- 📢 Complaint & Advise
- 💰 Donation
- 👥 Member & Officer Lists
- 📱 और बहुत कुछ...

---

## 🔧 App कैसे बनाएं और Install करें

### आवश्यकताएं (Requirements):
1. **Android Studio** (latest version)
2. **Java JDK 8 या higher**
3. **Android SDK** (API 21 या higher)

### Step 1: Android Studio में Project Import करें

1. **Android Studio** खोलें
2. **File → Open** पर click करें
3. `AndroidApp` folder select करें
4. **OK** click करें

### Step 2: Website Files को Assets में Copy करें

**बहुत जरूरी:** App को काम करने के लिए सभी website files की जरूरत है।

```
AndroidApp/app/src/main/assets/ में ये files copy करें:
- index.html
- style.css
- script.js
- login.html
- registration.html
- admin_dashboard.html
- officer_dashboard.html
- member_dashboard.html
- complaint.html
- advise.html
- donation.html
- members_public.html
- presidents_public.html
- issues.html
- logo.jpg
- deepak_bajpai.jpg
- santosh_gupta.jpg
- sanjay_verma.jpg
- krishna_kumar.jpg
- bharti_narvariya.jpg
- ashok_kumar.jpg
- rohit_gautam.jpg
- hero_bg.jpg
- donation_qr.jpg
(और सभी अन्य images और files)
```

### Step 3: APK Build करें

1. Android Studio में **Build → Build Bundle(s) / APK(s) → Build APK(s)** select करें
2. Build complete होने का wait करें
3. **locate** link पर click करें APK file खोजने के लिए

### Step 4: APK Install करें

**Mobile में Install करने के 2 तरीके:**

#### तरीका 1: Direct Install (USB से)
1. Mobile को computer से USB cable से connect करें
2. Mobile में **USB Debugging** enable करें:
   - Settings → About Phone → Build Number पर 7 बार tap करें
   - Settings → Developer Options → USB Debugging ON करें
3. Android Studio में **Run → Run 'app'** click करें
4. अपना mobile select करें और OK करें

#### तरीका 2: APK File Share करें
1. Build की हुई APK file को mobile में transfer करें
2. Mobile में **Settings → Security → Unknown Sources** enable करें
3. File Manager से APK file पर tap करें
4. **Install** button click करें

---

## 📂 Project Structure

```
AndroidApp/
├── MainActivity.java          # Main app code
├── SplashActivity.java        # Splash screen
├── AndroidManifest.xml        # App configuration
├── activity_main.xml          # Main layout
├── activity_splash.xml        # Splash layout
├── strings.xml                # Text resources
├── colors.xml                 # Color theme
├── styles.xml                 # App styles
├── build.gradle               # Build config
└── file_paths.xml             # File provider config
```

---

## 🎨 App Customization

### App Icon बदलने के लिए:
1. `res/mipmap-*/` folders में अपने icon images रखें
2. Different sizes के लिए:
   - `mipmap-mdpi`: 48x48 px
   - `mipmap-hdpi`: 72x72 px
   - `mipmap-xhdpi`: 96x96 px
   - `mipmap-xxhdpi`: 144x144 px
   - `mipmap-xxxhdpi`: 192x192 px

### App Name बदलने के लिए:
`strings.xml` में `app_name` edit करें

### Colors बदलने के लिए:
`colors.xml` में colors edit करें

---

## 🐛 Troubleshooting (समस्या समाधान)

### Problem: App crash हो रही है
**Solution:** 
- Check करें कि सभी website files `assets/` folder में हैं
- Logcat में error देखें

### Problem: File upload काम नहीं कर रहा
**Solution:**
- App को Camera और Storage permissions दें
- Settings → Apps → UP Outsourcing Sangh → Permissions

### Problem: Pages load नहीं हो रहे
**Solution:**
- Assets folder में सभी HTML files check करें
- `index.html` file जरूर होनी चाहिए

---

## 📱 App Distribution

### Option 1: Direct APK Share
- APK file को WhatsApp/Email से share करें
- Users को "Unknown Sources" enable करना होगा

### Option 2: Google Play Store
1. Google Play Console account बनाएं ($25 one-time fee)
2. APK upload करें
3. Store listing complete करें
4. Review के लिए submit करें

---

## 🔐 Permissions

App को ये permissions चाहिए:
- **INTERNET** - Website load करने के लिए
- **CAMERA** - Photo upload के लिए
- **STORAGE** - Files save/load करने के लिए

---

## 📞 Support

किसी भी समस्या के लिए संपर्क करें:
- **Email:** uposkunion@gmail.com
- **Phone:** +91 7355303056, 6389664078
- **Website:** www.uposkunion.in

---

## 📝 Version History

**Version 1.0** (Current)
- Initial release
- WebView-based app
- All website features included
- File upload support
- Pull-to-refresh
- Offline caching

---

## ⚖️ License

© 2025 उत्तर प्रदेश आउटसोर्सिंग एवं संविदा कर्मचारी संघ
सर्वाधिकार सुरक्षित।
