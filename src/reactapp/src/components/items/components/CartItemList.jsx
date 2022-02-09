import React from 'react';

import CartItem from './CartItem';
import { __ } from '../../../i18n';
import { _abs } from '../../../utils';
import useItemsFormContext from '../hooks/useItemsFormContext';

function CartItemList() {
  const { cartItems, setFieldValue, setFieldTouched } = useItemsFormContext();
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
    // setFieldTouched(fieldName, 0);
    setFieldValue(fieldName, undefined);
  };

  return (
    <div className="">
      <div className="">
        <table className="table w-full text-left">
          <thead className="bg-container-lighter text-left table-header-group text-center text-primary-darker text-md ">
            <tr>
              <th className="p-2 font-normal">{__('Товар')}</th>
              <th className="p-2 hidden md:table-cell font-normal">
                {__('Цена')} <br />{' '}
                <span className="text-base">{__('(грн. с НДС)')}</span>
              </th>
              <th className="p-2 font-normal">
                {__('Кол-во')} <br /> {__('(шт.)')}
              </th>

              <th className="p-2 font-normal">{__('Сумма')}</th>
              {/* <th>
                <span className="sr-only">{__('Actions')}</span>
                &nbsp;
              </th> */}
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
        </table>
      </div>
    </div>
  );
}

export default CartItemList;
