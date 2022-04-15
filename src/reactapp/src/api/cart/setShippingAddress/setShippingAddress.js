import sendRequest from '../../sendRequest';
import modifier from '../fetchGuestCart/modifier';
import LocalStorage from '../../../utils/localStorage';
import { SET_SHIPPING_ADDR_MUTATION } from './mutation';
// import { last } from 'lodash';

export default async function setShippingAddress(dispatch, shippingAddress) {
  const variables = { ...shippingAddress, cartId: LocalStorage.getCartId() };

  return modifier(
    await sendRequest(dispatch, {
      query: SET_SHIPPING_ADDR_MUTATION,
      variables,
    }),
    'setShippingAddressesOnCart.cart'
  );
}
