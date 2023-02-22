import _get from 'lodash.get';

import fetchGuestCartModifier from '../fetchGuestCart/modifier';

export default function updateCartItemsModifier(result) {
  const data = _get(result, 'data.updateCartItems.cart.items');
  const errorMessage = _get(result, 'errors.0.message', false);

  if (errorMessage && data.length < 1) {
    throw new Error(errorMessage);
  }

  return fetchGuestCartModifier(result, 'updateCartItems.cart');
}
