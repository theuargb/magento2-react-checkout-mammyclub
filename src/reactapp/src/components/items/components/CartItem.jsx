import React from 'react';
import _get from 'lodash.get';
import { bool, func, shape, string } from 'prop-types';
import { RefreshIcon } from '@heroicons/react/solid';

import Button from '../../common/Button';
import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import { _emptyFunc } from '../../../utils';
import { CART_ITEMS_FORM } from '../../../config';
import useItemsFormContext from '../hooks/useItemsFormContext';
import useTotalsCartContext from '../../totals/hooks/useTotalsCartContext';

function CartItem({ item, isLastItem, actions }) {
  const { formikData, handleKeyDown, cartItemsTouched, itemUpdateHandler } =
    useItemsFormContext();
  const qtyField = `${item.id}_qty`;
  const itemQtyField = `${CART_ITEMS_FORM}.${qtyField}`;
  const isQtyFieldTouched = _get(cartItemsTouched, qtyField);

  const { subTotal, hasSubTotal } = useTotalsCartContext();

  return (
    <tr className={`border-2 md:border-0 ${isLastItem ? '' : 'md:border-b-2'}`}>
      {/** DESKTOP TD ELEMENTS */}
      <td className="hidden w-2/5 md:table-cell">
        <div className="py-2 pl-2 flex">
          <div className="flex-none h-20 mr-1 shrink-0">
            <img
              className="object-contain w-20 h-full"
              alt={item.productSku}
              src={item.productSmallImgUrl}
            />
          </div>

          <div className="text-xs text-left">
            <div>{item.productName}</div>
            {/* <div>{item.productSku}</div> */}
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell text-md text-green w-1/5 align-middle">
        {item.price}
      </td>

      <td className="hidden w-1/6 md:table-cell align-middle">
        <TextInput
          min="0"
          width="w-10"
          name={itemQtyField}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          id={`${itemQtyField}-desktop`}
          // onChange={actions.handleQtyUpdate}
          className="-mt-4 block mx-auto text-center"
          onChange={actions.handleQtyUpdate}
        />
        <button
          className="text-xs text-link"
          onClick={itemUpdateHandler}
          type="button"
        >
          Обновить
        </button>
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
        {item.rowTotal}
      </td> */}

      <td className="hidden w-1/6 md:table-cell text-md text-green align-middle">
        <div className="">
          {hasSubTotal && (
            <div className="flex justify-between ">
              <div>{subTotal}</div>
            </div>
          )}
        </div>
      </td>

      {/** MOBILE TD ELEMENTS */}
      <td className="px-2 py-2 md:hidden">
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
