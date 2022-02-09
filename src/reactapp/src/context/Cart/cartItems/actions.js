import { SET_CART_INFO } from '../cart/types';
import {
  removeItemFromCartRequest,
  updateCartItemsRequest,
} from '../../../api';

export async function updateCartItemAction(dispatch, appDispatch, cartItems) {
  const cartData = await updateCartItemsRequest(appDispatch, cartItems);

  dispatch({
    type: SET_CART_INFO,
    payload: cartData,
  });
}

export async function removeCartItemAction(dispatch, appDispatch, cartItem) {
  const cartData = await removeItemFromCartRequest(appDispatch, cartItem);
  dispatch({
    type: SET_CART_INFO,
    payload: cartData,
  });
}
