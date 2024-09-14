import {filteredSoldItems} from '../../database/services/soldItemService';

function lastSoldItemsPrice(last) {
  if (filteredSoldItems(last).length > 0) {
    const sum_result = filteredSoldItems(last)
      .map(soldGroup => soldGroup.total_price)
      .reduce((acc, cur) => acc + cur)
      .toFixed(2);

    return sum_result;
  }

  return 0;
}

export default lastSoldItemsPrice;
