import useGetRealmData from "../../../../hooks/customHooks/useGetRealmData";
import { addStockHistory } from '../../../database/services/stock_history_service';
import {
    createSaleDraft,
    deleteSaleDraft,
  } from '../../../database/services/SaleDraft';
import { addToSoldItems } from '../../../database/services/soldItemService';

const realmItemList = useGetRealmData('Items').data;
export const handleTransaction = async (passedData ) => {
    const newOrderNumber = "ORDER_" +  orderNumIncrement((extractNumberFromOrderNo(lastOrderno)))+"-" + new Date().getFullYear() 
     handleMultipleItemsSale(passedData) 


    passedData.map(async realm => {
     
      const passedSale = realmItemList.find(sale => sale._id.toString() == realm._id);
      
      if (passedSale) {
        const quantityResult = passedSale.quantity - realm.quantity;
        const deductFromRealm = {
          quantity:
            quantityResult == 1 ? 1 : quantityResult > 1 ? quantityResult : 0,
        };
        updateItem(realm._id, deductFromRealm); // Updating the sold item quantity from the database
        if (passedSale.item_variant.length > 2) {
          const newpassed = []
          replacer(passedSale).map((sale, index) => {
            sale.varientcoll[0].optionValue = sale.varientcoll[0].optionValue - realm.item_variant[index].varientcoll[0].optionValue
            newpassed.push(sale)
          })
          updateItem(realm._id, { item_variant: convertToString(newpassed) });
        }
      }
    });

    const newArrayData = [];
    for (let i = 0; i < passedData.length; i++) {
      newArrayData.push(
        `${passedData[i]._id} # ${passedData[i].name} # ${passedData[i].price} # ${passedData[i].quantity} # ${passedData[i].tax} # ${JSON.stringify(passedData[i].item_variant)}`,
      );
    }
   

    //Sale History, tracks Item sale
    const newSaleHistory = {
      _sold_id: parseInt(generateUniqueID()),
      sub_total: Number(TOTAL_PRODUCT_PRICE),
      tax_rate: VATrate,
      total_price: Number(TOTAL_VAT_INCLUSIVE),
      sold_date: new Date(),
      buyer_id: customer?._id?.toString(),
      payment_method: null,
      payment_status: false,
      discount_amount: discount ? discount : 0,
      sold_items: newArrayData,
      order_no: newOrderNumber,
      buyer_name: customer?.fullname,
      buyer_tin: customer?.tin,
      // inV_no:newOrderNumber,
    };

    const soldItemID = newSaleHistory?._sold_id;
  const updatedOrders = [...orders, newSaleHistory];
    // addToSoldItems(newSaleHistory);
    const isConnected = await NetInfo.fetch().then((state) => state.isConnected);

      if (isConnected) {
        // If connected to the internet, sync with the server
       await saveOrdersToStorage(updatedOrders);
       addToSoldItems(newSaleHistory);
      } else {
        addToSoldItems(newSaleHistory);
      setOrders(updatedOrders);
      await saveOrdersToStorage(  updatedOrders);
      }

    //Stock History tracks In/Out of an Item
    const Stock_History = {
      _stock_history_id: parseInt(generateUniqueID()),
      customer_id: customer?._id,
      status: 'out',
      time: new Date(),
      stock_items: newArrayData,
    };

    addStockHistory(Stock_History);
    draftID && deleteSaleDraft(draftID);

    // navigation.navigate('invoice-screen', {
    navigation.navigate('payment-invoice', {
      passedData,
      discount,
      VATrate,
      soldItemID,
      customer,
      newOrderNO: newOrderNumber,
    });
    setPassedData([]);
    setCustomer({
      fullname: 'Guest',
      _id: null,
      tin: null,
    });
    setDiscount(0);
  };
