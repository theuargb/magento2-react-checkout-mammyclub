import sendRequest from '../../sendRequest';
import { GET_AVAILABLE_PAYMENT_METHODS } from './query';

export default async function fetchPaymentMethodsPrzelewy24(dispatch, amount) {
  const variables = { amount };

  const result = await sendRequest(dispatch, {
    query: GET_AVAILABLE_PAYMENT_METHODS,
    variables,
  });
  return result;
}
