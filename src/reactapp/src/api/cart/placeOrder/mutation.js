const PLACE_ORDER_MUTATION = `
mutation placeOrderMutation(
  $cartId: String!
  $carrierCode: String!
  $methodCode: String!
  $code: String!

  ) {
  setShippingMethodsOnCart(input: {
    cart_id: $cartId,
    shipping_methods: [
      {
        carrier_code: $carrierCode,
        method_code: $methodCode
      }
    ]
  }) {
    cart { 
      id 
    }
  }
  
  setPaymentMethodOnCart(input: {
    cart_id: $cartId,
    payment_method: {
      code: $code
    }
  }) {
    cart { 
      id 
    }
  }
  
  
  placeOrder(input: { 
    cart_id: $cartId 
  }) {
    order {
      order_number
    }
  }
}
`;

export default PLACE_ORDER_MUTATION;
