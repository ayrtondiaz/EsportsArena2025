// This is a utility file to detect mobile devices
// You can include this in your project for more advanced device detection

function isMobileDevice() {
  // Check if the user agent string contains mobile keywords
  const userAgent = navigator.userAgent.toLowerCase()
  const mobileKeywords = [
    "android",
    "iphone",
    "ipod",
    "ipad",
    "windows phone",
    "blackberry",
    "nokia",
    "opera mini",
    "mobile",
  ]

  // Check if any mobile keyword is in the user agent
  const isMobile = mobileKeywords.some((keyword) => userAgent.includes(keyword))

  // Also check screen width as a fallback
  const isMobileWidth = window.matchMedia("(max-width: 768px)").matches

  return isMobile || isMobileWidth
}

// You can use this function in your plexus-background.js file
// by including this script before it in your HTML
