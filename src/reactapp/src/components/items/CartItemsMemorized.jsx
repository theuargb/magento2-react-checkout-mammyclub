import React from 'react';

// import Card from '../common/Card';
import CartItemList from './components/CartItemList';
import NoItemsInfoBox from './components/NoItemsInfoBox';
import CartItemsFormManager from './components/CartItemsFormManager';
import { formikDataShape } from '../../utils/propTypes';
import useItemsCartContext from './hooks/useItemsCartContext';

const CartItemsMemorized = React.memo(({ formikData }) => {
  const { cartItemsAvailable } = useItemsCartContext();

  return (
    <CartItemsFormManager formikData={formikData}>
      {cartItemsAvailable ? <CartItemList /> : <NoItemsInfoBox />}
    </CartItemsFormManager>
  );
});

CartItemsMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default CartItemsMemorized;
