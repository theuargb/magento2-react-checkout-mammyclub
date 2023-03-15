export const GET_AVAILABLE_PAYMENT_METHODS = `
  query przelewy24PaymentMethodsQuery($amount: Float) {
    przelewy24PaymentMethods(amount: $amount) {
      id
      name
      active
      imgUrl
      mobileImgUrl
      standalone
    }
  }
`;
