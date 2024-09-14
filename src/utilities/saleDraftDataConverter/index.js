function saleDraftDataConverter(data) {
  let newData = data?.map(item => {
    const newArr = [];
    for (let i = 0; i < item.items?.length; i++) {
      const splitted = item.items[i].split(' # ');
      // console.log('splitted:', splitted);
      newArr.push({
        _id: parseInt(splitted[0]),
        name: splitted[1],
        price: parseFloat(splitted[2]),
        quantity: parseInt(splitted[3]),
        tax: parseInt(splitted[4]),
        // item_variant:splitted[5],
      });
    }
    return {
      draft_id: item.draft_id,
      items: newArr,
      customer_id: item.customer_id,
      discount: item.discount,
      sub_total: item.sub_total,
      tax_rate: item.tax_rate,
      total: item.total,
      date: item.date,
    };
  });
  return newData;
}

export default saleDraftDataConverter;
