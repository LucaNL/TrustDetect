let mouseMovements = 0;
let clicks = 0;
let scrollEvents = 0;
let keyboardEvents = 0;
let sessionStart = new Date();

let typingStartTime = null;
let lastKeystroke = null;
let keystrokeTimes = [];
let wordCount = 0;
let copyPasteDetected = false;

document.addEventListener("DOMContentLoaded", function () {
  initializeDataCollection();
  setupEventListeners();
  setupReviewAnalysis();
});

function initializeDataCollection() {
  collectBasicInfo();
  getLocationData();
  generateFingerprints();
  document.getElementById("session-start").textContent =
    sessionStart.toLocaleString();

  window.addEventListener("load", function () {
    const loadTime = performance.now();
    document.getElementById("page-load-time").textContent =
      Math.round(loadTime) + "ms";
  });
}

function collectBasicInfo() {
  document.getElementById("user-agent").textContent =
    navigator.userAgent.substring(0, 50) + "...";
  document.getElementById("browser-language").textContent = navigator.language;
  document.getElementById("screen-resolution").textContent =
    screen.width + "x" + screen.height + " (" + screen.colorDepth + "-bit)";
  document.getElementById("timezone").textContent =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById("platform").textContent = navigator.platform;

  if (navigator.connection) {
    let connectionType = "Unknown";
    let connectionDetails = [];

    if (navigator.connection.effectiveType) {
      connectionDetails.push(`Speed: ${navigator.connection.effectiveType}`);
    }

    if (navigator.connection.type) {
      connectionType = navigator.connection.type;
    } else {
      const userAgent = navigator.userAgent.toLowerCase();
      if (
        userAgent.includes("mobile") ||
        userAgent.includes("android") ||
        userAgent.includes("iphone")
      ) {
        connectionType = "Mobile (estimated)";
      } else {
        connectionType = "Wired/WiFi (estimated)";
      }
    }

    if (navigator.connection.downlink) {
      connectionDetails.push(`${navigator.connection.downlink} Mbps`);
    }

    if (navigator.connection.rtt) {
      connectionDetails.push(`${navigator.connection.rtt}ms RTT`);
    }

    const fullConnectionInfo =
      connectionDetails.length > 0
        ? `${connectionType} (${connectionDetails.join(", ")})`
        : connectionType;
    document.getElementById("connection-type").textContent = fullConnectionInfo;
  } else {
    document.getElementById("connection-type").textContent = "Not available";
  }

  document.getElementById("do-not-track").textContent =
    navigator.doNotTrack === "1" ? "Enabled" : "Disabled";
  document.getElementById("cookies-enabled").textContent =
    navigator.cookieEnabled ? "Yes" : "No";

  try {
    localStorage.setItem("test", "test");
    localStorage.removeItem("test");
    document.getElementById("local-storage").textContent = "Available";
  } catch (e) {
    document.getElementById("local-storage").textContent = "Blocked";
  }

  document.getElementById("webrtc-support").textContent = !!(
    window.RTCPeerConnection ||
    window.webkitRTCPeerConnection ||
    window.mozRTCPeerConnection
  )
    ? "Yes"
    : "No";
}

async function getLocationData() {
  try {
    const ipv4Response = await fetch("https://api.ipify.org?format=json");
    const ipv4Data = await ipv4Response.json();
    document.getElementById("ipv4-address").textContent =
      ipv4Data.ip || "Not available";

    try {
      const ipv6Response = await fetch("https://api64.ipify.org?format=json");
      const ipv6Data = await ipv6Response.json();

      if (ipv6Data.ip && ipv6Data.ip.includes(":")) {
        document.getElementById("ipv6-address").textContent = ipv6Data.ip;
      } else {
        document.getElementById("ipv6-address").textContent = "Not available";
      }
    } catch (ipv6Error) {
      console.log("IPv6 fetch error:", ipv6Error.message);
      document.getElementById("ipv6-address").textContent = "Not available";
    }

    const apiUrl = `https://free.freeipapi.com/api/json/`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.ipAddress || data.countryName) {
      document.getElementById("country").textContent =
        data.countryName || "Not available";
      document.getElementById("region").textContent =
        data.regionName || "Not available";
      document.getElementById("city").textContent =
        data.cityName || "Not available";
      document.getElementById("isp").textContent =
        data.internetServiceProvider || "Not available";

      let vpnStatus = "Direct Connection";
      let vpnStatusClass = "status-active";

      if (data.isProxy === true) {
        vpnStatus = "Proxy Detected";
        vpnStatusClass = "status-danger";
      } else {
        const vpnIndicators = [
          "VPN",
          "PROXY",
          "TOR",
          "TUNNEL",
          "HOSTING",
          "DATACENTER",
          "CLOUD",
        ];
        const orgText = (data.internetServiceProvider || "").toUpperCase();
        const isVpnByName = vpnIndicators.some((indicator) =>
          orgText.includes(indicator)
        );

        if (isVpnByName) {
          vpnStatus = "Possible VPN/Proxy (ISP)";
          vpnStatusClass = "status-warning";
        }
      }

      document.getElementById(
        "vpn-detection"
      ).innerHTML = `${vpnStatus} <span class="status-indicator ${vpnStatusClass}"></span>`;
    } else {
      throw new Error("API request failed");
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    document.getElementById("ipv4-address").textContent = "Error loading";
    document.getElementById("ipv6-address").textContent = "Error loading";
    document.getElementById("country").textContent = "Error loading";
    document.getElementById("region").textContent = "Error loading";
    document.getElementById("city").textContent = "Error loading";
    document.getElementById("isp").textContent = "Error loading";
    document.getElementById("vpn-detection").innerHTML =
      'Cannot determine <span class="status-indicator status-warning"></span>';
  }

  document.getElementById("coordinates").addEventListener("click", function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude.toFixed(6);
          const lon = position.coords.longitude.toFixed(6);
          document.getElementById("coordinates").textContent = `${lat}, ${lon}`;
        },
        function (error) {
          document.getElementById("coordinates").textContent =
            "Permission denied";
        }
      );
    } else {
      document.getElementById("coordinates").textContent = "Not supported";
    }
  });
}

function generateFingerprints() {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = "14px Arial";
    ctx.fillText("TrustDetect fingerprint test 🔍", 2, 2);
    const canvasFingerprint = canvas.toDataURL().slice(-20);
    document.getElementById("canvas-fingerprint").textContent =
      canvasFingerprint;
  } catch (e) {
    document.getElementById("canvas-fingerprint").textContent = "Blocked";
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gl) {
      const renderer = gl.getParameter(gl.RENDERER);
      const vendor = gl.getParameter(gl.VENDOR);
      const webglFingerprint = btoa(renderer + vendor).slice(-20);
      document.getElementById("webgl-fingerprint").textContent =
        webglFingerprint;
    } else {
      document.getElementById("webgl-fingerprint").textContent =
        "Not supported";
    }
  } catch (e) {
    document.getElementById("webgl-fingerprint").textContent = "Error";
  }

  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const analyser = audioContext.createAnalyser();
    oscillator.connect(analyser);
    oscillator.frequency.value = 1000;
    const audioFingerprint = btoa(analyser.frequencyBinCount.toString()).slice(
      -20
    );
    document.getElementById("audio-fingerprint").textContent = audioFingerprint;
  } catch (e) {
    document.getElementById("audio-fingerprint").textContent = "Not available";
  }

  const fonts = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Georgia",
    "Comic Sans MS",
  ];
  const fontHash = btoa(fonts.join(",")).slice(-20);
  document.getElementById("font-hash").textContent = fontHash;

  const plugins = Array.from(navigator.plugins)
    .map((p) => p.name)
    .join(",");
  const pluginHash = plugins ? btoa(plugins).slice(-20) : "No plugins";
  document.getElementById("plugin-hash").textContent = pluginHash;
}

function setupReviewAnalysis() {
  const reviewText = document.getElementById("review-text");

  reviewText.addEventListener("input", function (e) {
    const text = e.target.value;
    const currentTime = Date.now();

    if (typingStartTime === null) {
      typingStartTime = currentTime;
    }

    if (lastKeystroke !== null) {
      keystrokeTimes.push(currentTime - lastKeystroke);
    }
    lastKeystroke = currentTime;

    wordCount = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    document.getElementById("word-count").textContent = wordCount;

    if (typingStartTime && wordCount > 0) {
      const timeInMinutes = (currentTime - typingStartTime) / 60000;
      const wpm = Math.round(wordCount / timeInMinutes) || 0;
      document.getElementById("typing-speed").textContent = wpm;

      updateTypingAnalysis(wpm);
    }
  });

  reviewText.addEventListener("paste", function () {
    copyPasteDetected = true;
    document.getElementById("copy-paste-detected").textContent = "Yes";
    updateReviewAuthenticity();
  });

  reviewText.addEventListener("keydown", function () {
    if (copyPasteDetected === false) {
      document.getElementById("copy-paste-detected").textContent = "No";
    }
  });
}

function updateTypingAnalysis(wpm) {
  if (keystrokeTimes.length > 5) {
    const avgPause =
      keystrokeTimes.reduce((a, b) => a + b, 0) / keystrokeTimes.length;
    const pauseVariation =
      Math.max(...keystrokeTimes) - Math.min(...keystrokeTimes);

    if (pauseVariation < 50 && avgPause < 100) {
      document.getElementById("pause-patterns").textContent =
        "Consistent (suspicious)";
    } else if (pauseVariation > 500) {
      document.getElementById("pause-patterns").textContent =
        "Natural variation";
    } else {
      document.getElementById("pause-patterns").textContent =
        "Moderate variation";
    }
  }

  updateReviewAuthenticity();
}

function updateReviewAuthenticity() {
  let suspiciousScore = 0;
  let authenticity = "Authentic";

  const wpm =
    parseInt(document.getElementById("typing-speed").textContent) || 0;
  const pausePattern = document.getElementById("pause-patterns").textContent;

  if (copyPasteDetected) {
    suspiciousScore += 70;
  }

  if (wpm > 80) {
    suspiciousScore += 30;
  }

  if (pausePattern.includes("Consistent")) {
    suspiciousScore += 40;
  }

  if (wordCount < 5 && wpm > 50) {
    suspiciousScore += 20;
  }

  if (suspiciousScore > 50) {
    authenticity = "Suspicious";
  } else if (suspiciousScore > 25) {
    authenticity = "Questionable";
  }

  document.getElementById("review-authenticity").textContent = authenticity;
}

function setupEventListeners() {
  document.addEventListener("mousemove", function () {
    mouseMovements++;
    document.getElementById("mouse-movements").textContent = mouseMovements;
    updateSuspiciousPatterns();
  });

  document.addEventListener("click", function () {
    clicks++;
    document.getElementById("clicks").textContent = clicks;
  });

  document.addEventListener("scroll", function () {
    scrollEvents++;
    document.getElementById("scroll-events").textContent = scrollEvents;
  });

  document.addEventListener("keydown", function () {
    keyboardEvents++;
    document.getElementById("keyboard-events").textContent = keyboardEvents;
  });
}

function updateSuspiciousPatterns() {
  const sessionDuration = (new Date() - sessionStart) / 1000;

  let suspiciousScore = 0;
  let botScore = "Low Risk";
  let botStatus = "status-active";

  if (sessionDuration > 5 && mouseMovements / sessionDuration > 50) {
    suspiciousScore += 30;
  }

  if (sessionDuration > 10 && mouseMovements === 0) {
    suspiciousScore += 40;
  }

  if (sessionDuration > 2 && clicks / sessionDuration > 5) {
    suspiciousScore += 25;
  }

  if (suspiciousScore > 50) {
    botScore = "High Risk";
    botStatus = "status-danger";
  } else if (suspiciousScore > 25) {
    botScore = "Medium Risk";
    botStatus = "status-warning";
  }

  document.getElementById(
    "bot-score"
  ).innerHTML = `${botScore} <span class="status-indicator ${botStatus}"></span>`;

  const patterns = [];
  if (mouseMovements > 1000 && sessionDuration < 30)
    patterns.push("Rapid mouse movement");
  if (clicks > 20 && sessionDuration < 10) patterns.push("Rapid clicking");
  if (mouseMovements === 0 && sessionDuration > 15)
    patterns.push("No mouse interaction");

  const patternsText =
    patterns.length > 0 ? patterns.join(", ") : "None detected";
  const patternsStatus =
    patterns.length > 0 ? "status-warning" : "status-active";

  document.getElementById(
    "suspicious-patterns"
  ).innerHTML = `${patternsText} <span class="status-indicator ${patternsStatus}"></span>`;
}

function refreshData() {
  mouseMovements = 0;
  clicks = 0;
  scrollEvents = 0;
  keyboardEvents = 0;
  sessionStart = new Date();

  typingStartTime = null;
  lastKeystroke = null;
  keystrokeTimes = [];
  wordCount = 0;
  copyPasteDetected = false;

  initializeDataCollection();

  document.getElementById("mouse-movements").textContent = "0";
  document.getElementById("clicks").textContent = "0";
  document.getElementById("scroll-events").textContent = "0";
  document.getElementById("keyboard-events").textContent = "0";
  document.getElementById("review-text").value = "";
  document.getElementById("word-count").textContent = "0";
  document.getElementById("typing-speed").textContent = "0";
  document.getElementById("pause-patterns").textContent = "Natural";
  document.getElementById("copy-paste-detected").textContent = "No";
  document.getElementById("review-authenticity").textContent = "Analyzing...";

  document.getElementById("suspicious-patterns").innerHTML =
    'None detected <span class="status-indicator status-active"></span>';
  document.getElementById("bot-score").innerHTML =
    'Low Risk <span class="status-indicator status-active"></span>';
  document.getElementById("trust-level").innerHTML =
    'High <span class="status-indicator status-active"></span>';
}

setInterval(updateSuspiciousPatterns, 2000);
