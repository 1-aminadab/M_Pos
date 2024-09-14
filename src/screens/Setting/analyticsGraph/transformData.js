export function transformData(originalData, interval) {
  // Extract dates and prices from the original data
  const dates = originalData.map(entry => new Date(entry.date));
  const prices = originalData.map(entry => entry.price);

  // Initialize empty arrays for transformed data and labels
  let transformedData = [];
  let transformedLabels = [];
  let totalSales = 0;

  // Define a function to get the month name from a date
  function getMonthName(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[date.getMonth()];
  }

  // Calculate aggregated values based on the selected interval
  if (interval === 'daily') {
    transformedData = prices;
    transformedLabels = dates.map(date => date.toLocaleTimeString('eth-ET', { hour: 'numeric', minute: 'numeric', hour12: false }));
    totalSales = prices.reduce((sum, price) => sum + price, 0);
  } else if (interval === 'weekly') {
    const weeklyData = [];
    const weeklyLabels = [];

    for (let i = 0; i < dates.length; i += 7) {
      const weekPrices = prices.slice(i, i + 7);
      const weekAverage = weekPrices.reduce((sum, price) => sum + price, 0) / weekPrices.length;

      weeklyData.push(weekAverage);
      weeklyLabels.push(`Week ${Math.ceil((i + 1) / 7)}`);
    }

    transformedData = weeklyData;
    transformedLabels = weeklyLabels;
    totalSales = prices.reduce((sum, price) => sum + price, 0);
  } else if (interval === 'monthly') {
    const monthlyData = [];
    const monthlyLabels = [];

    let currentMonth = -1;
    let monthPrices = [];

    for (let i = 0; i < dates.length; i++) {
      const month = dates[i].getMonth();

      if (month !== currentMonth) {
        if (monthPrices.length > 0) {
          const monthAverage = monthPrices.reduce((sum, price) => sum + price, 0) / monthPrices.length;
          monthlyData.push(monthAverage);
          monthlyLabels.push(getMonthName(dates[i - 1]));
        }

        currentMonth = month;
        monthPrices = [prices[i]];
      } else {
        monthPrices.push(prices[i]);
      }
    }

    if (monthPrices.length > 0) {
      const monthAverage = monthPrices.reduce((sum, price) => sum + price, 0) / monthPrices.length;
      monthlyData.push(monthAverage);
      monthlyLabels.push(getMonthName(dates[dates.length - 1]));
    }

    transformedData = monthlyData;
    transformedLabels = monthlyLabels;
    totalSales = prices.reduce((sum, price) => sum + price, 0);
  } else if (interval === 'yearly') {
    const yearlyData = [];
    const yearlyLabels = [];

    let currentYear = -1;
    let yearPrices = [];

    for (let i = 0; i < dates.length; i++) {
      const year = dates[i].getFullYear();

      if (year !== currentYear) {
        if (yearPrices.length > 0) {
          const yearAverage = yearPrices.reduce((sum, price) => sum + price, 0) / yearPrices.length;
          yearlyData.push(yearAverage);
          yearlyLabels.push(`${currentYear}`);
        }

        currentYear = year;
        yearPrices = [prices[i]];
      } else {
        yearPrices.push(prices[i]);
      }
    }

    if (yearPrices.length > 0) {
      const yearAverage = yearPrices.reduce((sum, price) => sum + price, 0) / yearPrices.length;
      yearlyData.push(yearAverage);
      yearlyLabels.push(`${currentYear}`);
    }

    transformedData = yearlyData;
    transformedLabels = yearlyLabels;
    totalSales = prices.reduce((sum, price) => sum + price, 0);
  }

  // Return the transformed data, labels, and total sales
  return { data: transformedData, labels: transformedLabels, totalSales };
}
