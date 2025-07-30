# TrustDetect - Your Data Profile Viewer

A comprehensive web application that demonstrates the types of data collected by fraud detection systems like Trustpilot. This tool shows you exactly what information about your device, behavior, and network connection is being gathered when you visit websites that use automated fraud detection.

**🌐 Live Website**: [https://trustdetect.lucanl.dev/](https://trustdetect.lucanl.dev/)

## Features

### ✍️ Review Analysis

- **Real-time typing pattern analysis** - Monitors keystroke timing and patterns
- **Words per minute (WPM) tracking** - Calculates typing speed to detect copy/paste behavior
- **Copy/paste detection** - Identifies when text is pasted vs manually typed
- **Typing pause pattern analysis** - Analyzes natural vs artificial typing rhythms
- **Review authenticity scoring** - Comprehensive fraud assessment based on writing behavior
- **Interactive text area** - Live analysis as you type reviews

### 🖥️ Device & Browser Data

- **IPv4 & IPv6 Address detection** - Both IP protocol versions for comprehensive tracking
- **User Agent string analysis** - Complete browser and OS information
- **Browser language and settings** - Language preferences and configurations
- **Screen resolution and color depth** - Display characteristics for device fingerprinting
- **Timezone information** - System timezone for location consistency verification
- **Platform detection** - Operating system identification

### 📍 Location Data

- **Country, region, and city identification** - Precise geographic location via IP
- **ISP information** - Internet service provider details
- **GPS coordinates** - Optional precise location (requires user permission)
- **VPN/Proxy detection** - Advanced detection of anonymization tools and hosting services

### 📊 Session & Behavior Tracking

- **Real-time mouse movement tracking** - Counts and analyzes mouse activity patterns
- **Click pattern analysis** - Monitors clicking frequency and patterns
- **Scroll event monitoring** - Tracks scrolling behavior for bot detection
- **Keyboard interaction tracking** - Counts keyboard events and typing patterns
- **Session duration analysis** - Tracks time spent on page
- **Page load performance metrics** - Measures loading times for automation detection

### 🔒 Network & Security Analysis

- **Connection type detection** - Network speed, type, and quality metrics
- **Do Not Track header status** - Privacy preference detection
- **Cookie and local storage availability** - Browser storage capabilities
- **WebRTC support detection** - Real-time communication features that can bypass VPNs

### 🔍 Device Fingerprinting

- **Canvas fingerprinting** - Unique graphics rendering signatures
- **WebGL fingerprinting** - GPU and graphics driver identification
- **Audio context fingerprinting** - Audio hardware and processing signatures
- **Font list hashing** - Installed fonts for device uniqueness
- **Plugin detection** - Browser extensions and plugin enumeration

### ⚠️ Risk Assessment

- **Suspicious behavior pattern detection** - Real-time analysis of unusual activity
- **Bot detection scoring** - Multi-factor automated behavior assessment
- **Device trust level assessment** - Overall device trustworthiness evaluation
- **VPN/Proxy risk analysis** - Anonymization tool detection and risk scoring

## Based on Trustpilot's Data Collection

This application is based on Trustpilot's official privacy policy and demonstrates the types of data they collect for fraud detection:

- **Device Information**: IP address, browser settings, location data
- **Usage Patterns**: How users interact with the platform
- **Verification Data**: Information used to verify user authenticity
- **Behavioral Analysis**: Patterns that may indicate fraudulent activity

## Privacy & Security

- **No Data Storage**: All data is processed locally in your browser
- **No Data Transmission**: Information is not sent to any external servers (except for IP/location lookup)
- **Real-time Processing**: All analysis happens in real-time on your device
- **Educational Purpose**: This tool is for demonstration and educational purposes only

## How It Works

1. **Data Collection**: The application automatically collects device, network, and behavioral data that fraud detection systems typically gather
2. **Real-time Analysis**: Behavioral patterns are analyzed as you interact with the page, including mouse movements, typing patterns, and click behaviors
3. **Risk Scoring**: Multiple algorithms evaluate potential fraud indicators including:
   - Typing speed and rhythm analysis for review authenticity
   - Mouse movement patterns for bot detection
   - Network analysis for VPN/proxy identification
   - Device fingerprinting for unique device identification
4. **Visual Feedback**: All collected data is displayed in real-time with detailed explanations of how each data point is used for fraud detection
5. **Interactive Demo**: Type in the review box to see live analysis of your writing patterns and behavior

## Technical Implementation

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript (no external frameworks)
- **APIs Used**:
  - IPify.org API for IPv4/IPv6 address detection
  - FreeIPAPI.com for comprehensive IP geolocation and VPN detection
- **Fingerprinting Technologies**:
  - Canvas API for graphics rendering fingerprints
  - WebGL API for GPU hardware identification
  - Web Audio API for audio context fingerprinting
  - Navigator API for browser and device information
- **Real-time Analysis**: Event-driven behavior tracking and pattern recognition
- **Responsive Design**: Fully responsive layout for desktop and mobile devices
- **No External Dependencies**: Self-contained with minimal external API calls

## How to Use

Visit the **[live website](https://trustdetect.lucanl.dev/)** and:

1. **Allow location access** when prompted (optional) to see GPS vs IP location comparison
2. **Type in the review text area** to see live typing pattern analysis and fraud detection
3. **Interact naturally** - move your mouse, click, and scroll to trigger behavioral tracking
4. **Hover over "?" icons** for detailed explanations of each data point
5. **Click "Refresh Data"** to reset all counters and restart the analysis

_For developers: Clone this repository and open `index.html` locally to explore the code._

## Educational Value

This tool helps users understand:

- **Data Collection Scope**: What extensive data websites can collect about users through standard web APIs
- **Fraud Detection Methods**: How platforms like Trustpilot analyze user behavior to detect fake reviews and fraudulent activity
- **Digital Privacy Implications**: The depth of tracking possible through browser fingerprinting and behavioral analysis
- **Browser Fingerprinting Techniques**: Canvas, WebGL, audio, and font-based device identification methods
- **Behavioral Analysis**: How typing patterns, mouse movements, and interaction timing reveal user authenticity
- **Network Security**: VPN/proxy detection methods and their effectiveness
- **Real-time Tracking**: How user actions are monitored and analyzed continuously during browsing sessions

## Disclaimer

This application is for educational purposes only. It demonstrates publicly available web technologies and data collection methods. The risk assessment algorithms are simplified examples and should not be used for actual fraud detection in production systems.

## Browser Compatibility

- ✅ **Chrome/Chromium** (Recommended - all features including WebRTC, advanced fingerprinting)
- ✅ **Firefox** (Full support - all features work correctly)
- ✅ **Safari** (Good support - most features, some fingerprinting limitations)
- ✅ **Edge** (Full support - all features including advanced detection)
- ⚠️ **Internet Explorer** (Limited support - basic features only, no modern APIs)

**Note**: Some advanced fingerprinting features may have varying accuracy across different browsers due to browser-specific implementations and privacy controls.

## License

This project is open source and available under the MIT License.
