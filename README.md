# TrustDetect - Your Data Profile Viewer

A comprehensive web application that demonstrates the types of data collected by fraud detection systems like Trustpilot. This tool shows you exactly what information about your device, behavior, and network connection is being gathered when you visit websites that use automated fraud detection.

**🌐 Live Website**: [https://lucanl.github.io/TrustDetect/](https://lucanl.github.io/TrustDetect/)  

## Features

### ✍️ Review Analysis (NEW!)

- Real-time typing pattern analysis
- Words per minute (WPM) tracking
- Copy/paste detection
- Typing pause pattern analysis
- Review authenticity scoring
- Fraud detection based on writing behavior

### 🖥️ Device & Browser Data

- IP Address detection
- User Agent string analysis
- Browser language and settings
- Screen resolution and color depth
- Timezone information
- Platform detection

### 📍 Location Data

- Country, region, and city identification
- ISP information
- GPS coordinates (with permission)
- VPN/Proxy detection

### 📊 Session & Behavior Tracking

- Real-time mouse movement tracking
- Click pattern analysis
- Scroll event monitoring
- Keyboard interaction tracking
- Session duration analysis
- Page load performance metrics

### 🔒 Network & Security Analysis

- Connection type detection
- Do Not Track header status
- Cookie and local storage availability
- WebRTC support detection

### 🔍 Device Fingerprinting

- Canvas fingerprinting
- WebGL fingerprinting
- Audio context fingerprinting
- Font enumeration
- Plugin detection

### ⚠️ Risk Assessment

- Suspicious behavior pattern detection
- Bot detection scoring
- Device trust level assessment
- Real-time fraud risk analysis

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

1. **Data Collection**: The application collects various types of data that fraud detection systems typically gather
2. **Real-time Analysis**: Behavioral patterns are analyzed as you interact with the page
3. **Risk Scoring**: A simple risk assessment algorithm evaluates potential fraud indicators
4. **Visual Feedback**: All collected data is displayed in an easy-to-understand format

## Technical Implementation

- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **APIs Used**: IPapi.co for IP geolocation (free tier)
- **Fingerprinting**: Canvas, WebGL, and Audio Context APIs
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

1. Open `index.html` in your web browser
2. Allow location access when prompted (optional)
3. Interact with the page to see behavioral tracking in action
4. Click "Refresh Data" to reset all counters and data

## Educational Value

This tool helps users understand:

- What data websites can collect about them
- How fraud detection systems work
- The importance of digital privacy
- Browser fingerprinting techniques
- Behavioral analysis methods

## Disclaimer

This application is for educational purposes only. It demonstrates publicly available web technologies and data collection methods. The risk assessment algorithms are simplified examples and should not be used for actual fraud detection in production systems.

## Browser Compatibility

- ✅ Chrome/Chromium (full features)
- ✅ Firefox (full features)
- ✅ Safari (most features)
- ✅ Edge (full features)
- ⚠️ Internet Explorer (limited features)

## License

This project is open source and available under the MIT License.
