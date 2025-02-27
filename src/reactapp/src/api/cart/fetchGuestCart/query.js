import cartItemsInfo from '../utility/query/cartItemsInfo';
import cartPriceInfo from '../utility/query/cartPriceInfo';
import cartShippingAddrInfo from '../utility/query/cartShippingAddrInfo';
import cartPaymentMethodsInfo from '../utility/query/cartPaymentMethodsInfo';

export const CART_QUERY_PART = `
  cart(cart_id: $cartId) {
    id
    email
    pml_otp_phone
    is_virtual
    applied_coupons {
      code
    }
    ${cartItemsInfo}
    ${cartPriceInfo}
    ${cartShippingAddrInfo}
    ${cartPaymentMethodsInfo}
  }
`;

export const GET_GUEST_CART_QUERY = `
  query getGuestCartQuery($cartId: String!) {
    ${CART_QUERY_PART}
  }
`;
