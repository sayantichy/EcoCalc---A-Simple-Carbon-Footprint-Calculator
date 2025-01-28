// Chart.js configuration for EcoCalc

// Global variable to store the chart instance
let ecoChart = null;

/**
 * Draw a pie chart to visualize the carbon footprint breakdown.
 * @param {number} carEmission - Emissions from transportation (kg CO₂).
 * @param {number} electricityEmission - Emissions from electricity usage (kg CO₂).
 * @param {number} dietEmission - Emissions from diet (kg CO₂).
 * @param {number} flightEmission - Emissions from air travel (kg CO₂).
 */
function drawChart(carEmission, electricityEmission, dietEmission, flightEmission) {
  // Get the canvas context
  const ctx = document.getElementById('chart').getContext('2d');

  // Destroy the previous chart instance to avoid overlapping issues
  if (ecoChart) {
    ecoChart.destroy();
  }

  // Create a new pie chart
  ecoChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Transportation', 'Electricity', 'Diet', 'Air Travel'],
      datasets: [
        {
          data: [carEmission, electricityEmission, dietEmission, flightEmission],
          backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#9c27b0'],
          hoverBackgroundColor: ['#66bb6a', '#ffa726', '#42a5f5', '#ab47bc'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              // Format tooltip labels with the category and its value
              return `${context.label}: ${context.raw.toFixed(2)} kg CO₂`;
            },
          },
        },
      },
    },
  });
}

/**
 * Test function to ensure the chart works in isolation.
 * Call this to test the chart with mock data.
 */
function testChart() {
  // Mock data
  const carEmission = 12;
  const electricityEmission = 15;
  const dietEmission = 8;
  const flightEmission = 20;

  // Call the drawChart function with mock data
  drawChart(carEmission, electricityEmission, dietEmission, flightEmission);
}

// Export the drawChart function
if (typeof module !== 'undefined') {
  module.exports = drawChart;
}
