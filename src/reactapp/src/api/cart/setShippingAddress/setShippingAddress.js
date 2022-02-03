import sendRequest from '../../sendRequest';
import modifier from '../fetchGuestCart/modifier';
import LocalStorage from '../../../utils/localStorage';
import { SET_SHIPPING_ADDR_MUTATION } from './mutation';
// import { last } from 'lodash';

export default async function setShippingAddress(dispatch, shippingAddress) {
  let variables = { ...shippingAddress, cartId: LocalStorage.getCartId() };

  let { firstname, lastname, company, street, phone, city, region, zipcode } =
    variables;

  if (!firstname) firstname = '<null>';
  if (!lastname) lastname = '<null>';
  if (!company) company = '<null>';
  if (!street) street = ['<null>'];
  if (!phone) phone = '<null>';
  if (!city) city = '<null>';
  if (!region) region = '<null>';
  if (!zipcode) zipcode = '<null>';

  variables = { firstname, lastname, ...variables };

  return modifier(
    await sendRequest(dispatch, {
      query: SET_SHIPPING_ADDR_MUTATION,
      variables,
    }),
    'setShippingAddressesOnCart.cart'
  );
}
