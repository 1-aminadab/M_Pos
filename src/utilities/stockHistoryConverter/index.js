function stockHistoryConverter(data) {
  let newData = data.map(stock => {
    const newArr = [];
    for (let i = 0; i < stock.stock_items?.length; i++) {
      const splitted = stock.stock_items[i].split(' # ');
      newArr.push({
        id: splitted[0],
        name: splitted[1],
        price: splitted[2],
        quantity: splitted[3],
        item_variant:splitted[4],
      });
    }
    return {
      _stock_history_id: stock._stock_history_id,
      customer_id: stock.customer_id,
      status: stock.status,
      time: stock.time,
      stock_items: newArr,
      stock_in_qty: stock.stock_in_qty,
    };
  });
  return newData;
}

export default stockHistoryConverter;
