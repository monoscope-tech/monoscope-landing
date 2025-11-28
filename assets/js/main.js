const price_indicator = document.querySelector("#price_range");
const priceContainer = document.querySelector("#price");
const reqsContainer = document.querySelector("#num_requests");
const saveContainer = document.querySelector("#save_container");
const startsAtContainer = document.querySelector("#starts_at");
function priceChange() {
  const value = price_indicator.value;
  // For Cloud + S3 plan: $199 for up to 100M events, then $2 per 1M events after that
  const eventsInMillions = value / 1_000_000;
  let totalPrice = 199;
  if (eventsInMillions > 100) {
    totalPrice = 199 + ((eventsInMillions - 100) * 2);
  }
  
  priceContainer.innerText = "$" + totalPrice.toFixed(0);
  reqsContainer.innerText = "/month for " + eventsInMillions + "M events";
  
  // Show savings compared to just events cost
  if (saveContainer) {
    if (eventsInMillions > 100) {
      const savingsPercent = Math.round((199 / totalPrice) * 100);
      saveContainer.innerText = "(Base cost is only " + savingsPercent + "% of total)";
    } else {
      saveContainer.innerText = "";
    }
  }
}
if (price_indicator) {
  price_indicator.addEventListener("input", priceChange);
  priceChange(); // Initialize on page load
}

function handlePlanToggle() {
  const radios = document.getElementsByName("plans");
  for (let radio of radios) {
    if (radio.checked) {
      plan = radio.value;
      break;
    }
  }
  priceChange();
}

// Cloud pricing slider functionality
const cloudPriceRange = document.querySelector("#cloud_price_range");
const cloudPriceEl = document.querySelector("#cloud_price");
const cloudPriceDescEl = document.querySelector("#cloud_price_desc");

function updateCloudPricing() {
  if (!cloudPriceRange) return;
  
  const value = parseInt(cloudPriceRange.value);
  const eventsInMillions = value / 1_000_000;
  
  // Free tier: 10k events/day = ~300k/month
  if (value <= 300000) {
    cloudPriceEl.innerText = "Free";
    cloudPriceDescEl.innerText = "up to 10k events/day";
  } else {
    // $29 minimum for up to 20M events, then $2 per 1M events after that
    let totalPrice = 29;
    if (eventsInMillions > 20) {
      totalPrice = 29 + ((eventsInMillions - 20) * 2);
    }
    cloudPriceEl.innerText = "$" + totalPrice.toFixed(0);
    cloudPriceDescEl.innerText = "/month for " + eventsInMillions.toFixed(0) + "M events";
  }
}

if (cloudPriceRange) {
  cloudPriceRange.addEventListener("input", updateCloudPricing);
  updateCloudPricing(); // Initialize on page load
}

// New cost calculator functionality
const costCalculatorRange = document.querySelector("#cost_calculator_range");
const cloudCostEl = document.querySelector("#cloud_cost");
const s3CostEl = document.querySelector("#s3_cost");

function updateCostCalculator() {
  if (!costCalculatorRange) return;
  
  const value = parseInt(costCalculatorRange.value);
  const eventsInMillions = value / 1_000_000;
  
  // Update range slider visual
  const percentage = ((value - 20000000) / (500000000 - 20000000)) * 100;
  costCalculatorRange.style.setProperty('--value', percentage + '%');
  
  // Cloud cost: Free up to 300k (10k/day), then $29 for up to 20M, then $2 per 1M after that
  let cloudCost = 0;
  if (value > 300000) {
    cloudCost = 29;
    if (eventsInMillions > 20) {
      cloudCost = 29 + ((eventsInMillions - 20) * 2);
    }
  }
  
  // S3 cost: $199 for up to 100M events, then $2 per 1M after that
  let s3Cost = 199;
  if (eventsInMillions > 100) {
    s3Cost = 199 + ((eventsInMillions - 100) * 2);
  }
  
  if (cloudCostEl) cloudCostEl.innerText = "$" + Math.round(cloudCost);
  if (s3CostEl) s3CostEl.innerText = "$" + Math.round(s3Cost);
}

if (costCalculatorRange) {
  costCalculatorRange.addEventListener("input", updateCostCalculator);
  updateCostCalculator(); // Initialize on page load
}
