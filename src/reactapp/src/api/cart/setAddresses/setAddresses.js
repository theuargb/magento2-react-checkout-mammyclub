import sendRequest from '../../sendRequest';
import modifier from '../fetchGuestCart/modifier';
import LocalStorage from '../../../utils/localStorage';
import { SET_ADDRESSES_MUTATION } from './mutation';

export default async function setAddresses(dispatch, shippingAddress) {
  const variables = { ...shippingAddress, cartId: LocalStorage.getCartId() };

  return modifier(
    await sendRequest(dispatch, {
      query: SET_ADDRESSES_MUTATION,
      variables,
    }),
    'setShippingAddressesOnCart.cart'
  );
}
