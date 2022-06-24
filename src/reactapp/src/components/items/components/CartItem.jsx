import React, { useState } from 'react';
import { bool, func, shape, string } from 'prop-types';
import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import { _emptyFunc } from '../../../utils';
import { CART_ITEMS_FORM } from '../../../config';
import useItemsFormContext from '../hooks/useItemsFormContext';
import useTotalsCartContext from '../../totals/hooks/useTotalsCartContext';

function CartItem({ item, isLastItem, actions }) {
  const { formikData, handleKeyDown, itemUpdateHandler } =
    useItemsFormContext();

  const qtyField = `${item.id}_qty`;
  const itemQtyField = `${CART_ITEMS_FORM}.${qtyField}`;

  /* eslint-disable */
  const { subTotal, hasSubTotal } = useTotalsCartContext();

  const [isQtyChange, setQtyChange] = useState(false);

  const handleQtyUpdate = (e) => {
    actions.handleQtyUpdate(e);
    setQtyChange(true);
  };
  const updateQty = () => {
    itemUpdateHandler();
    setQtyChange(false);
  };

  const handleRemoveProductClick = (e) => {
    formikData.cartItemsValue[e.target.name] = 0;
    actions.handleQtyUpdate(e);
    updateQty();
  };

  return (
    <div
      className={`relative grid grid-cols-4 lg:grid-cols-5 items-center  ${
        isLastItem ? '' : 'border-b-2 border-container-lightner'
      }`}
    >
      <div className="bg-white col-span-2 relative z-10">
        <div className="py-2 pl-2 flex">
          <div className="flex-none w-1/2 sm:w-auto md:w-1/2 h-20 mr-1 shrink-0">
            <a href={item.canonicalUrl} rel="noreferrer" target="_blank">
              <img
                className="object-contain object-top w-full h-full"
                alt={item.productSku}
                src={item.productSmallImgUrl}
              />
            </a>
          </div>

          <div className="text-xs text-left w-1/2 sm:w-auto md:w-1/2 text-link flex flex-col	justify-between">
            <a href={item.canonicalUrl} rel="noreferrer" target="_blank">
              {item.productName}
            </a>
            <div className="mt-2 text-old_gray-main whitespace-nowrap">
              {item?.productConfigurableOptions
                ? item.productConfigurableOptions.map((option) => (
                    <div>
                      {`${option.option_label} : ${option.value_label}`}
                    </div>
                  ))
                : ''}
            </div>
          </div>
        </div>
      </div>

      <div className=" text-sm text-green hidden lg:block align-middle bg-white">
        {item.isOnSale && (
          <div className="text-sm mb-0.5 line-through text-old_gray-main">
            {item.basePrice}
          </div>
        )}
        {item.price}
      </div>

      <div className="align-middle bg-white">
        <TextInput
          min="0"
          width="w-10"
          name={itemQtyField}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          id={`${itemQtyField}-desktop`}
          className="-mt-4 block mx-auto text-center form-select"
          onChange={handleQtyUpdate}
        />
        {isQtyChange && (
          <button
            className="text-xs text-link"
            onClick={updateQty}
            type="button"
          >
            {__('Update')}
          </button>
        )}
      </div>

      <div className="text-sm text-green align-middle bg-white h-full flex items-center justify-center sm:justify-end relative z-0">
        <div className="">
          {hasSubTotal && (
            <div className="flex justify-end items-center pr-0.5 sm:pr-1">
              <div className="mr-0.5">{item.rowTotal}</div>
              <div className="h-full mt-1 mr-1 sm:mr-0 sm:mt-0 sm:pb-1 sm:static absolute top-0 right-0">
                <button
                  onClick={handleRemoveProductClick}
                  name={qtyField}
                  type="submit"
                  className="rounded-full text-xxs leading-0 text-white "
                  formikData={formikData}
                  style={{ background: 'red', width: '12px', height: '12px' }}
                >
                  x
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
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
