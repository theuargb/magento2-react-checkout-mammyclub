import React from 'react';

import CartItem from './CartItem';
import { __ } from '../../../i18n';
import { _abs } from '../../../utils';
import useItemsFormContext from '../hooks/useItemsFormContext';

function CartItemList() {
  const { cartItems, setFieldValue, setFieldTouched, hasError, setHasError } =
    useItemsFormContext();
  /**
   * Handler function deals with qty update.
   *
   * 🚫 We don't want the qty set to a negative value
   */
  const handleQtyUpdate = (event) => {
    const newValue = _abs(event.target.value);
    const fieldName = event.target.name;
    setFieldTouched(fieldName, newValue);
    setFieldValue(fieldName, newValue);
  };

  const handleQtyDelete = (event) => {
    const fieldName = `items.${event.target.name}`;
    setFieldValue(fieldName, undefined);
  };

  if (hasError) {
    setTimeout(() => {
      setHasError(false);
    }, 3000);
  }

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-4 lg:grid-cols-5 items-center bg-container-lighter text-left text-center text-primary-darker text-md relative">
          <div className="col-span-2 p-2 font-normal">{__('Product')}</div>
          <div className="p-2 hidden lg:block font-normal">
            {__('Price')} <br />{' '}
            <span className="text-base">{__('(UAH VAT included)')}</span>
          </div>
          <div className="p-2 font-normal">
            {__('qty')} <br /> {__('(items)')}
          </div>

          <div className="p-2 font-normal">{__('Total')}</div>
        </div>

        <div className="text-center border-b-2 border-container-lightner">
          {cartItems.map((cartItem, index) => (
            <CartItem
              item={cartItem}
              key={cartItem.id}
              actions={{ handleQtyUpdate, handleQtyDelete }}
              isLastItem={index === cartItems.length - 1}
            />
          ))}
        </div>

        {hasError && (
          <p className="text-red-500 text-xs absolute top-12 bg-white">
            {__('The requested qty is not available')}
          </p>
        )}
      </div>
    </div>
  );
}

export default CartItemList;
