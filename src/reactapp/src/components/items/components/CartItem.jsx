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
    setQtyChange(true);
  };
  const updateQty = () => {
    itemUpdateHandler();
    setQtyChange(false);
  };

  return (
    <tr className={`border-2 md:border-0 ${isLastItem ? '' : 'md:border-b-2'}`}>
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
        {/* <Button
          size="sm"
          variant="secondary"
          click={itemUpdateHandler}
          disable={!isQtyFieldTouched}
        >
          <span>{__('Обновить')}</span>
        </Button> */}
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
      </td>

      {/** MOBILE TD ELEMENTS */}
      {/* <td className="px-2 py-2 md:hidden">
        <table className="w-full">
          <tbody>
            <tr className="">
              <td>
                <table className="text-xs">
                  <tbody>
                    <tr className="border-b">
                      <th className="px-2 py-2">{__('Name')}</th>
                      <td className="pl-1 text-sm">
                        <div className="flex items-center py-1">
                          <img
                            className="w-8 h-8"
                            alt={item.productSku}
                            src={item.productSmallImgUrl}
                          />
                          <div className="pl-2">{item.productName}</div>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="px-2 py-2">{__('SKU')}</th>
                      <td className="pl-2 text-sm">{item.productSku}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="px-2 py-2">{__('Price')}</th>
                      <td className="pl-2 text-sm">{item.price}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="px-2 py-2">{__('Qty')}</th>
                      <td className="px-1 pb-2">
                        <div className="flex items-center justify-between">
                          <TextInput
                            min="0"
                            type="number"
                            className="w-20"
                            name={itemQtyField}
                            formikData={formikData}
                            onKeyDown={handleKeyDown}
                            id={`${itemQtyField}-mobile`}
                            onChange={actions.handleQtyUpdate}
                          />
                          <div className="mt-2 ml-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              click={itemUpdateHandler}
                              disable={!isQtyFieldTouched}
                            >
                              <RefreshIcon className="w-5 h-5 text-black" />
                              <span className="sr-only">{__('Update')}</span>
                            </Button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="px-2 py-2 text-base">{__('Subtotal')}</th>
                      <td className="pl-2 text-base text-right">
                        {item.rowTotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td> */}
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
