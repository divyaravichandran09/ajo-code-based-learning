const log = document.getElementById("log");

// Generate or reuse anonymous ID (like ECID concept)
function getAnonId() {
  let id = localStorage.getItem("anonId");
  if (!id) {
    id = "anon-" + Math.random().toString(16).slice(2);
    localStorage.setItem("anonId", id);
  }
  return id;
}

// Identify user (simulate login)
function identifyUser() {
  localStorage.setItem("email", "divya.test@learning.com");
  writeLog({
    type: "identity",
    message: "User identified with email",
    email: "divya.test@learning.com"
  });
}

// Core event tracker (AJO-style)
function trackEvent(eventType) {
  const event = {
    eventType: eventType,
    timestamp: new Date().toISOString(),
    identity: {
      anonymousId: getAnonId(),
      email: localStorage.getItem("email") || null
    },
    web: {
      pageURL: window.location.href
    },
    commerce: {
      product: "Credit Card Platinum"
    }
  };

  writeLog(event);

  // Later → send this payload to Adobe ingest endpoint
  // fetch("https://edge.adobedc.net/....", { ... })
}

function writeLog(data) {
  log.textContent =
    JSON.stringify(data, null, 2) +
    "\n\n" +
    log.textContent;
}
