// Pricing page Cloud estimate: $29 for 20M events, then $1 per 1M, plus $199/month if writing to your own bucket
const cloudPriceRange = document.querySelector("#cloud_price_range");
const cloudBucket = document.querySelector("#cloud_bucket");
const cloudPriceEl = document.querySelector("#cloud_price");
const cloudPriceDescEl = document.querySelector("#cloud_price_desc");

function updateCloudPricing() {
  const m = cloudPriceRange.value / 1_000_000, bucket = cloudBucket?.checked;
  cloudPriceEl.innerText = "$" + Math.round(29 + Math.max(0, m - 20) + (bucket ? 199 : 0));
  cloudPriceDescEl.innerText = "/month for " + m.toFixed(0) + "M events" + (bucket ? ", in your bucket" : "");
}

if (cloudPriceRange) {
  [cloudPriceRange, cloudBucket].forEach(el => el?.addEventListener("input", updateCloudPricing));
  updateCloudPricing();
}
