
const timestamp = Math.floor(Date.now() / 1000).toString();

const method = pm.request.method.toUpperCase();

const path = "/" + pm.request.url.path.join("/");

const body = pm.variables.replaceIn(
    pm.request.body?.raw || ""
);


// SHA-256 hash of the request body
const bodyHash = CryptoJS.SHA256(body)
    .toString(CryptoJS.enc.Hex);

// Example canonical message format
const message = [
    timestamp,
    method,
    path,
    bodyHash
].join("\n");

// Generate HMAC-SHA256 signature
const apiSecret = pm.environment.get("api_secret");

const signature = CryptoJS.HmacSHA256(
    message,
    apiSecret
).toString(CryptoJS.enc.Hex);

// Save values for request headers
pm.variables.set("timestamp", timestamp);
pm.variables.set("signature", signature);

console.log("Timestamp:", timestamp);
console.log("Signature:", signature);
