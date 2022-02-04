import React, { useState } from 'react';
// import _get from 'lodash.get';
import { bool, func, shape, string } from 'prop-types';
// import { RefreshIcon } from '@heroicons/react/solid';

// import Button from '../../common/Button';
import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import { _emptyFunc } from '../../../utils';
import { CART_ITEMS_FORM } from '../../../config';
import useItemsFormContext from '../hooks/useItemsFormContext';
import useTotalsCartContext from '../../totals/hooks/useTotalsCartContext';
import RemoveProductButton from './RemoveProductButton';

function CartItem({ item, isLastItem, actions }) {
  // const { formikData, handleKeyDown, cartItemsTouched, itemUpdateHandler } =
  //   useItemsFormContext();
  const { formikData, handleKeyDown, itemUpdateHandler } =
    useItemsFormContext();
  const qtyField = `${item.id}_qty`;
  const itemQtyField = `${CART_ITEMS_FORM}.${qtyField}`;
  // const isQtyFieldTouched = _get(cartItemsTouched, qtyField);
  /* eslint-disable */
  const { subTotal, hasSubTotal } = useTotalsCartContext();

  const [isQtyChange, setQtyChange] = useState(false);

  const handleQtyUpdate = (e) => {
    actions.handleQtyUpdate(e);
    console.log(e);
    setQtyChange(true);
  };
  const updateQty = () => {
    itemUpdateHandler();
    setQtyChange(false);
  };
  const handleRemoveProductClick = (e) => {
    handleQtyUpdate(e);
    updateQty();
  };

  return (
    <tr
      className={`border-2 relative ${
        isLastItem ? '' : 'md:border-b-2 md:border-container-lightner'
      }`}
    >
      {/** DESKTOP TD ELEMENTS */}
      <td className="w-2/5 table-cell bg-white">
        <div className="py-2 pl-2 flex">
          <div className="flex-none h-20 mr-1 shrink-0">
            <img
              className="object-contain w-20 h-full"
              alt={item.productSku}
              src={item.productSmallImgUrl}
            />
          </div>

          <div className="text-xs text-left text-link">
            <div>{item.productName}</div>
            {/* <div>{item.productSku}</div> */}
          </div>
        </div>
      </td>
      <td className="table-cell text-md text-green w-1/5 align-middle hidden md:table-cell bg-white">
        {item.price}
      </td>

      <td className="w-1/6 table-cell align-middle bg-white">
        <TextInput
          min="0"
          width="w-10"
          name={itemQtyField}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          id={`${itemQtyField}-desktop`}
          // onChange={actions.handleQtyUpdate}
          className="-mt-4 block mx-auto text-center form-select"
          onChange={handleQtyUpdate}
        />
        {isQtyChange && (
          <button
            className="text-xs text-link"
            onClick={updateQty}
            type="button"
          >
            {__('Обновить')}
          </button>
        )}
      </td>
      {/* <td className="hidden w-1/5 xl:table-cell text-md text-green">
        {item.rowTotal} {subTotal}
      </td> */}
      <td className="w-1/6 table-cell text-md text-green align-middle bg-white">
        <div className="">
          {hasSubTotal && (
            <div className="flex justify-between items-center">
              <div className="mx-auto">{item.rowTotal}</div>
            </div>
          )}
        </div>
        <RemoveProductButton
          className=" absolute mr-1 rounded-full text-xxs leading-0 text-white top-0 right-0 mt-2"
          formikData={formikData}
          value=""
          handleRemoveProductClick={handleRemoveProductClick}
          name={itemQtyField}
        />
      </td>
    </tr>
  );
}

CartItem.propTypes = {
  item: shape({
    id: string,
  }).isRequired,
  isLastItem: bool,
  actions: shape({ handleQtyUpdate: func }),
};

CartItem.defaultProps = {
  isLastItem: false,
  actions: { handleQtyUpdate: _emptyFunc() },
};

export default CartItem;
