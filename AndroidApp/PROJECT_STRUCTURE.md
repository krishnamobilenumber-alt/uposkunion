# Android App Project Structure

यह document बताता है कि Android app project कैसे organize है।

## 📁 Folder Structure

```
AndroidApp/
│
├── MainActivity.java              # Main activity (WebView logic)
├── SplashActivity.java           # Splash screen activity
├── AndroidManifest.xml           # App configuration & permissions
│
├── Layouts/
│   ├── activity_main.xml         # Main screen layout
│   └── activity_splash.xml       # Splash screen layout
│
├── Resources/
│   ├── strings.xml               # Text strings
│   ├── colors.xml                # Color definitions
│   ├── styles.xml                # App themes
│   └── file_paths.xml            # File provider config
│
├── Build Files/
│   ├── build.gradle              # App build config
│   ├── build_project.gradle      # Project build config
│   ├── gradle.properties         # Gradle settings
│   └── proguard-rules.pro        # Code obfuscation rules
│
└── Documentation/
    ├── README.md                 # Complete guide (Hindi)
    ├── QUICKSTART.md             # Quick start guide
    └── PROJECT_STRUCTURE.md      # This file
```

## 🔧 Important Files

### Java Files
- **MainActivity.java**: Main app logic, WebView setup, file uploads
- **SplashActivity.java**: Splash screen with 2-second delay

### XML Files
- **AndroidManifest.xml**: App permissions, activities, file provider
- **activity_main.xml**: WebView + SwipeRefreshLayout
- **activity_splash.xml**: Splash screen with logo

### Resource Files
- **strings.xml**: App name and text
- **colors.xml**: Theme colors (matching website)
- **styles.xml**: App and splash themes

### Build Files
- **build.gradle**: Dependencies and SDK versions
- **gradle.properties**: Build settings
- **proguard-rules.pro**: Code protection rules

## 📦 Assets Folder

**बहुत जरूरी:** `app/src/main/assets/` folder में सभी website files होनी चाहिए:

```
assets/
├── index.html
├── style.css
├── script.js
├── login.html
├── registration.html
├── admin_dashboard.html
├── officer_dashboard.html
├── member_dashboard.html
├── complaint.html
├── advise.html
├── donation.html
├── members_public.html
├── presidents_public.html
├── issues.html
├── logo.jpg
├── deepak_bajpai.jpg
├── santosh_gupta.jpg
├── sanjay_verma.jpg
├── krishna_kumar.jpg
├── bharti_narvariya.jpg
├── ashok_kumar.jpg
├── rohit_gautam.jpg
├── hero_bg.jpg
├── donation_qr.jpg
└── (all other images and files)
```

## 🎯 Key Features Implementation

### WebView Setup
- JavaScript enabled
- Local storage enabled
- File access enabled
- Zoom controls enabled

### File Upload
- Camera permission
- Storage permission
- File chooser dialog
- WebChromeClient implementation

### Navigation
- Back button support
- Pull-to-refresh
- External link handling

### Offline Support
- Assets caching
- Local storage
- App cache enabled

## 🔐 Permissions

App requires these permissions (defined in AndroidManifest.xml):
- INTERNET - Load website
- CAMERA - Photo upload
- READ_EXTERNAL_STORAGE - File access
- WRITE_EXTERNAL_STORAGE - File save

## 🚀 Build Process

1. Gradle sync
2. Asset files check
3. Compile Java code
4. Package resources
5. Generate APK
6. Sign APK (for release)

## 📱 Installation

### Development:
- USB debugging
- Run from Android Studio

### Production:
- Build signed APK
- Distribute via WhatsApp/Email
- Or publish to Play Store

## 🎨 Customization

### Change App Name:
Edit `strings.xml` → `app_name`

### Change Colors:
Edit `colors.xml` → color values

### Change Icon:
Replace files in `res/mipmap-*/` folders

### Change Splash Duration:
Edit `SplashActivity.java` → `SPLASH_DURATION`

## 📞 Support

Questions? Contact:
- Email: uposkunion@gmail.com
- Phone: +91 7355303056, 6389664078
