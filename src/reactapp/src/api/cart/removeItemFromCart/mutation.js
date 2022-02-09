import { CART_DATA_FRAGMENT } from '../utility/query/cartQueryInfo';

export const REMOVE_CART_ITEM_MUTATION = `
  mutation removeItemFromCartMutation (
    $cartId: String!,
    $cartItem: Int!
  ) {
    removeItemFromCart(
      input: {
        cart_id: $cartId,
        cart_item_id: $cartItem
      }
    ) {
      cart {
        ${CART_DATA_FRAGMENT}
      }
    }
  }
`;
