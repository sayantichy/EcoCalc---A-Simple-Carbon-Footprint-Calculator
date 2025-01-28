document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculate-btn');
    const resetButton = document.getElementById('reset-btn');
    const shareButton = document.getElementById('share-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const totalEmissionEl = document.getElementById('total-emission');
    const breakdownEl = document.getElementById('breakdown');
    const suggestionsEl = document.getElementById('suggestions');
    const costSavingsEl = document.getElementById('cost-savings');
  
    let chartInstance = null;
  
    function calculateFootprint() {
      const carKm = parseFloat(document.getElementById('car-km').value) || 0;
      const busKm = parseFloat(document.getElementById('bus-km').value) || 0;
      const electricityKwh = parseFloat(document.getElementById('electricity-kwh').value) || 0;
      const renewableEnergy = parseFloat(document.getElementById('renewable-energy').value) || 0;
      const diet = document.getElementById('diet').value;
      const waste = parseFloat(document.getElementById('waste').value) || 0;
  
      const carEmission = carKm * 0.12;
      const busEmission = busKm * 0.04;
      const electricityEmission = electricityKwh * (0.43 * (1 - renewableEnergy / 100));
      const dietEmission = diet === 'vegan' ? 2 : diet === 'vegetarian' ? 4 : 6;
      const wasteEmission = waste * 0.5;
  
      const totalEmission = carEmission + busEmission + electricityEmission + dietEmission + wasteEmission;
  
      totalEmissionEl.textContent = totalEmission.toFixed(2);
      breakdownEl.innerHTML = `
        <li>Car Travel: ${carEmission.toFixed(2)} kg CO₂</li>
        <li>Public Transport: ${busEmission.toFixed(2)} kg CO₂</li>
        <li>Electricity: ${electricityEmission.toFixed(2)} kg CO₂</li>
        <li>Diet: ${dietEmission.toFixed(2)} kg CO₂</li>
        <li>Waste: ${wasteEmission.toFixed(2)} kg CO₂</li>
      `;
      
      costSavingsEl.textContent = `By reducing your emissions, you can save up to $${(totalEmission * 0.5).toFixed(2)} per year!`;
  
      provideSuggestions(totalEmission);
      drawChart(carEmission, busEmission, electricityEmission, dietEmission, wasteEmission);
      generateAISuggestions(totalEmission);
    }
  
    function drawChart(...emissions) {
      const ctx = document.getElementById('chart').getContext('2d');
  
      if (chartInstance) {
        chartInstance.destroy();
      }
  
      chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Car', 'Bus', 'Electricity', 'Diet', 'Waste'],
          datasets: [
            {
              data: emissions,
              backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#9c27b0', '#f44336'],
            },
          ],
        },
      });
    }
  
    function provideSuggestions(totalEmission) {
      const suggestions = [];
      if (totalEmission > 50) suggestions.push("Reduce car travel or use public transport.");
      if (totalEmission > 30) suggestions.push("Switch to renewable energy.");
      if (totalEmission > 20) suggestions.push("Adopt a plant-based diet.");
      suggestionsEl.innerHTML = suggestions.map(s => `<li>${s}</li>`).join('');
    }
  
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    calculateButton.addEventListener('click', calculateFootprint);
    resetButton.addEventListener('click', () => {
      document.getElementById('eco-form').reset();
      totalEmissionEl.textContent = '0';
      breakdownEl.innerHTML = '';
      suggestionsEl.innerHTML = '';
    });
  });
  function generateAISuggestions(totalEmission) {
    const suggestions = [];
  
    if (totalEmission > 50) {
      suggestions.push("⚡ Consider switching to renewable energy sources to reduce your carbon footprint.");
      suggestions.push("🚗 Try carpooling or using public transportation more often.");
    }
    if (totalEmission > 30) {
      suggestions.push("🍽️ Reducing meat consumption can lower emissions by 50%.");
      suggestions.push("💡 Upgrade to energy-efficient appliances to save power.");
    }
    if (totalEmission > 20) {
      suggestions.push("🌳 Planting trees can offset a portion of your emissions.");
      suggestions.push("🛒 Buy locally sourced and seasonal foods to reduce food transport emissions.");
    }
    if (totalEmission < 15) {
      suggestions.push("✅ Great job! Keep optimizing your lifestyle for a greener future.");
    }
  
    document.getElementById('ai-suggestions').innerHTML = suggestions
      .map((s) => `<li>${s}</li>`)
      .join('');
  }
  function shareResults() {
    const totalEmission = document.getElementById('total-emission').textContent;
  
    // Generate a sharable message
    const message = `🌱 I just calculated my carbon footprint using EcoCalc! My total footprint is ${totalEmission} kg CO₂/day. Calculate yours at https://ecocalc.example.com!`;
  
    // Twitter share link
    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
  
    // Open the share URL in a new tab
    window.open(twitterShareUrl, '_blank');
  }
  
  // Add event listener to the Share button
  document.getElementById('share-btn').addEventListener('click', shareResults);
 
