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

  const { hasSubTotal } = useTotalsCartContext();

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

  const handleInputOnKeyDown = (e) => {
    handleKeyDown(e);
    setQtyChange(false);
  };

  return (
    <div
      className={`relative grid grid-cols-4 lg:grid-cols-5 items-center  ${
        isLastItem ? '' : 'border-b-2 border-container-lightner'
      }`}
    >
      <div className="bg-white col-span-2 relative z-10">
        <div className="py-2 pl-2 flex">
          <div
            className="flex-none w-1/2 sm:w-auto md:w-1/2 h-20 mr-1 shrink-0"
            style={{ maxWidth: '50%' }}
          >
            <a href={item.canonicalUrl} rel="noreferrer" target="_blank">
              <picture className="object-contain object-top w-full h-full">
                <source
                  className="object-contain object-top w-full h-full"
                  srcSet={item.productSmallWebpImgUrl}
                  type="image/webp"
                />
                <img
                  className="object-contain object-top w-full h-full"
                  src={item.productSmallImgUrl}
                  alt={item.productSku}
                  title={item.productName}
                />
              </picture>
            </a>
          </div>

          <div className="text-xs text-left w-1/2 sm:w-auto md:w-1/2 text-link flex flex-col	justify-between">
            <a
              className="break-words"
              href={item.canonicalUrl}
              rel="noreferrer"
              target="_blank"
            >
              {item.productName}
            </a>
            <div className="mt-2 text-old_gray-main whitespace-nowrap">
              {item?.productConfigurableOptions
                ? item.productConfigurableOptions.map((option) => (
                    <div key={option.value_label}>
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
          onKeyDown={handleInputOnKeyDown}
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
                {/* eslint-disable */}
                <button
                  onClick={handleRemoveProductClick}
                  name={qtyField}
                  type="button"
                  className="rounded-full text-xxs leading-0 text-white "
                  formikData={formikData}
                  style={{
                    background: 'red',
                    width: '12px',
                    height: '12px',
                    padding: '3px',
                    backgroundSize: '6px 6px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg version='1.1' id='Capa_1' stroke='white' fill='white' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 460.775 460.775' %3E%3Cpath d='M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55 c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55 c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505 c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55 l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719 c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z' /%3E%3C/svg%3E")`,
                  }}
                />
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
