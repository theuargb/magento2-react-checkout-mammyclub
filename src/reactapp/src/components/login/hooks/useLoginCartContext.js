import { useContext } from 'react';
import _get from 'lodash.get';

import CartContext from '../../../context/Cart/CartContext';

export default function useLoginCartContext() {
  const [cartData, cartActions] = useContext(CartContext);

  const {
    mergeCarts,
    createEmptyCart,
    setEmailOnGuestCart,
    getCartInfoAfterMerge,
    getCustomerCartInfo,
    getCustomerCartId,
  } = cartActions;
  const cart = _get(cartData, 'cart');
  const selectedPaymentMethod = _get(cart, 'selected_payment_method');
  const selectedPaymentMethodCode = _get(selectedPaymentMethod, 'code');
  const cartEmail = _get(cart, 'email', '');
  const cartId = _get(cart, 'id');

  return {
    cartId,
    cartEmail,
    selectedPaymentMethodCode,
    // actions
    mergeCarts,
    createEmptyCart,
    setEmailOnGuestCart,
    getCustomerCartId,
    getCartInfoAfterMerge,
    getCustomerCartInfo,
  };
}
