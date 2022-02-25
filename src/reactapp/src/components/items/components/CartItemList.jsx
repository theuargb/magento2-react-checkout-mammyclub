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
        <table className="table w-full text-left relative">
          <thead className="bg-container-lighter text-left table-header-group text-center text-primary-darker text-md ">
            <tr>
              <th className="p-2 font-normal">{__('Product')}</th>
              <th className="p-2 hidden md:table-cell font-normal">
                {__('Price')} <br />{' '}
                <span className="text-base">{__('(UAH VAT included)')}</span>
              </th>
              <th className="p-2 font-normal">
                {__('qty')} <br /> {__('(items)')}
              </th>

              <th className="p-2 font-normal">{__('Total')}</th>
            </tr>
          </thead>
          <tbody className="text-center border-b-2 border-container-lightner">
            {cartItems.map((cartItem, index) => (
              <CartItem
                item={cartItem}
                key={cartItem.id}
                actions={{ handleQtyUpdate, handleQtyDelete }}
                isLastItem={index === cartItems.length - 1}
              />
            ))}
          </tbody>
          {hasError && (
            <p className="text-red-500 text-xs absolute top-12 bg-white">
              {__('The requested qty is not available')}
            </p>
          )}
        </table>
      </div>
    </div>
  );
}

export default CartItemList;
