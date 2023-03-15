const PLACE_ORDER_MUTATION = `
mutation placeOrderMutation(
  $cartId: String!
  $code: String!
  ) {
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

export const PLACE_ORDER_MUTATION_PRZELEWY24 = `
mutation placeOrderMutation(
  $cartId: String!
  $code: String!
  $method: Int!
  $regulationAccept: Boolean!
  ) {
  setPaymentMethodOnCart(input: {
    cart_id: $cartId,
    payment_method: {
      code: $code
      przelewy24: {
          method: $method
          regulationAccept: $regulationAccept
      }
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
