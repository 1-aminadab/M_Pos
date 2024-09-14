function soldItemsDataConvertor(data) {
// 


  let newData = data.map(item => {

    const newArr = [];
    for (let i = 0; i < item.sold_items.length; i++) {
      const splitted = item.sold_items[i].split(' # ');
      const replaceFunction = (value) => {
        if (value === 'null') {
          return null;
        } else if (value === 'undefined') {
          return undefined;
        } else {
          return value;
        }
      };
      const newSplitted = splitted.map((value)=>replaceFunction(value))
      // console.log('splitted:', splitted);
      newArr.push({
        _id:newSplitted[0] ,
        category_id:parseInt(newSplitted[1]) ,
        image:  newSplitted[2],
        item_variant: newSplitted[3] ,
        name: newSplitted[4],
        oddo_template_id:parseInt( newSplitted[5]),
        price: parseInt(newSplitted[6]) ,
        quantity: parseInt(newSplitted[7]),
        tax:parseInt(newSplitted[8]) ,
        totalqty:parseInt(newSplitted[9]) 
        ,

      });
    }
    return {
      _sold_id: item._sold_id,
      inv_no: item.order_no,
      sub_total: item.sub_total,
      tax_rate: item.tax_rate,
      total_price: item.total_price,
      sold_date: item.sold_date,
      buyer_id: item.buyer_id,
      buyer_name: item.buyer_name,
      buyer_tin: item.buyer_tin,
      payment_method: item.payment_method,
      payment_status: item.payment_status,
      acknowledged:item.acknowledged,
      payment_date: item.payment_date,
      sold_items: newArr,
      status: item.status,
    };
  });
  return newData;
}

export default soldItemsDataConvertor;
