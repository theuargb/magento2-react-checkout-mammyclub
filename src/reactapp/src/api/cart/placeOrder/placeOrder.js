import _get from 'lodash.get';
import modifier from './modifier';
import sendRequest from '../../sendRequest';
import PLACE_ORDER_MUTATION from './mutation';
import LocalStorage from '../../../utils/localStorage';

export default async function placeOrder(dispatch, values) {
  const { carrierCode, methodCode } = _get(values, 'shipping_method');
  const { code } = _get(values, 'payment_method');
  const variables = {
    cartId: LocalStorage.getCartId(),
    carrierCode,
    methodCode,
    code,
  };

  return modifier(
    await sendRequest(dispatch, { query: PLACE_ORDER_MUTATION, variables })
  );
}
