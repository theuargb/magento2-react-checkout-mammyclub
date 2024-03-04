import RootElement from './rootElement';

/* eslint-disable */
const gtmDataLayer = {
  pushDataLayerCartData(eventName, cartData, orderNumber = null, isLoggedIn) {
    window.dataLayer = window.dataLayer || [];
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ecommerce: this.getDataLayerContent(eventName, cartData, orderNumber),
      });
    }
  },

  getDataLayerContent(eventName, cartData, orderNumber, isLoggedIn) {
    switch (eventName) {
      case 'purchase':
        return this.getPurchaseGtmData(cartData, orderNumber, isLoggedIn);
    }
  },
  getPurchaseGtmData(cartData, orderNumber, isLoggedIn) {
    const { items, prices, appliedCoupon, selected_shipping_method, email } =
      cartData;
    const cartItemsArray = Object.values(items);
    const currency = RootElement.getCurrency();

    return {
      transaction_id: orderNumber,
      value: prices?.grandTotalAmount,
      currency: currency.code,
      coupon: appliedCoupon,
      shipping: selected_shipping_method.amount,
      tax: this.getTaxAmountFromAllTax(prices?.taxApplied),
      new_customer: !isLoggedIn,
      items:
        cartItemsArray.length &&
        cartItemsArray.map((item, index) => {
          return {
            item_name: item?.productName,
            item_id: item?.productId,
            price: parseFloat(item?.priceAmount),
            discount: item?.discount?.amount?.value || 0,
            currency: currency?.code,
            item_category: item?.lastProductCategory,
            quantity: item?.quantity,
            item_brand: item?.productBrand,
            item_variant: item?.productSku,
            index,
          };
        }),
    };
  },
  getTaxAmountFromAllTax(appliedTax) {
    let aggregatedTax = 0;

    appliedTax.map((tax) => {
      aggregatedTax += tax?.amount?.value;
    });

    return aggregatedTax;
  },
};
export default gtmDataLayer;
