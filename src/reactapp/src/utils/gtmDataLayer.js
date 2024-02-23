import RootElement from './rootElement';

/* eslint-disable */
const gtmDataLayer = {
  pushDataLayerCartData(eventName, cartData, orderNumber = null, isLoggedIn) {
    window.dataLayer = window.dataLayer || [];
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ecommerce: this.getDataLayerContent(
          eventName,
          cartData,
          (orderNumber = null)
        ),
      });
    }
  },

  getDataLayerContent(eventName, cartData, orderNumber = null, isLoggedIn) {
    switch (eventName) {
      case 'purchase':
        return this.getPurchaseGtmData(cartData, orderNumber, isLoggedIn);
    }
  },
  getPurchaseGtmData(cartData, orderNumber, isLoggedIn) {
    const { items, prices, appliedCoupon, selected_shipping_method, email } =
      cartData;
    const cartItemsArray = Object.values(items);
    const taxAmount = prices?.subTotalAmount - prices?.subTotalAmountWoTax;
    const currency = RootElement.getCurrency();

    return {
      transaction_id: orderNumber,
      value: prices?.subTotalAmount,
      currency: currency.code,
      coupon: appliedCoupon,
      shipping: selected_shipping_method.amount,
      tax: taxAmount,
      new_customer: !isLoggedIn,
      items:
        cartItemsArray.length &&
        cartItemsArray.map((item, index) => {
          return {
            item_name: item?.productName,
            item_id: item?.productId,
            price: item?.priceAmount,
            discount: item?.discount?.amount?.value || 0,
            currency,
            item_category: '???',
            quantity: item?.quantity,
            item_brand: item?.productSku,
            item_variant: item?.productConfigurableOptions,
            index,
          };
        }),
    };
  }
};
export default gtmDataLayer;
