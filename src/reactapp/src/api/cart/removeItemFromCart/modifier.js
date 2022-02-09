import _get from 'lodash.get';

import fetchGuestCartModifier from '../fetchGuestCart/modifier';

export default function removeItemFromCartModifier(result) {
  const errorMessage = _get(result, 'errors.0.message', false);

  if (errorMessage) {
    throw new Error(errorMessage);
  }

  return fetchGuestCartModifier(result, 'removeItemFromCart.cart');
}
