const emissionFactors = {
    transportation: 0.12, // kg CO2 per km
    electricity: {
      global: 0.43,
      europe: 0.3,
      usa: 0.5,
      asia: 0.6,
    },
    diet: {
      vegan: 2,
      vegetarian: 4,
      omnivore: 6,
    },
    airTravel: 0.2, // kg CO2 per flight hour
  };
  
  const globalAverages = {
    daily: 10, // kg CO2/day
    yearly: 3650, // kg CO2/year
  };
  

