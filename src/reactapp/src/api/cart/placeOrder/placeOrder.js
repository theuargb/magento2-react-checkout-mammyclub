import _get from 'lodash.get';
import modifier from './modifier';
import sendRequest from '../../sendRequest';
import PLACE_ORDER_MUTATION, {
  PLACE_ORDER_MUTATION_PRZELEWY24,
} from './mutation';
import LocalStorage from '../../../utils/localStorage';

export default async function placeOrder(dispatch, values) {
  const { code, method, regulationAccept } = _get(values, 'payment_method');
  const variables = {
    cartId: LocalStorage.getCartId(),
    code,
  };
  if (code === 'przelewy24') {
    variables.regulationAccept = regulationAccept;
    variables.method = method;
    return modifier(
      await sendRequest(dispatch, {
        query: PLACE_ORDER_MUTATION_PRZELEWY24,
        variables,
      })
    );
  }
  return modifier(
    await sendRequest(dispatch, { query: PLACE_ORDER_MUTATION, variables })
  );
}
