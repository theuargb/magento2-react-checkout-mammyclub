import React from 'react';

import { __ } from '../../i18n';
import useTotalsCartContext from './hooks/useTotalsCartContext';

function Totals() {
  const {
    // subTotal,
    discounts,
    grandTotal,
    // hasSubTotal,
    hasDiscounts,
    hasShippingRate,
    shippingMethodRate,
  } = useTotalsCartContext();

  return (
    <div className="p-0 mt-0">
      <div>
        <div className="space-y-3">
          {/* {hasSubTotal && (
              <div className="flex justify-between">
                <div>{__('Cart Subtotal')}</div>
                <div>{subTotal}</div>
              </div>
            )} */}

          {hasShippingRate && (
            <div className="flex justify-between">
              <div>{__('Shipping')}</div>
              <div>{shippingMethodRate}</div>
            </div>
          )}
          {hasDiscounts &&
            discounts.map((discount) => (
              <div key={discount.label} className="flex justify-between">
                <div>{__(discount.label)}</div>
                <div>{discount.price}</div>
              </div>
            ))}
        </div>

        <div className="">
          <div className="px-4 py-3 flex justify-end text-xl font-bold text-gray ">
            <div className="text-lg text-gray">
              {__('Доставка по Украине:')}
            </div>
            <div className="text-lg text-green">60.00</div>
          </div>
        </div>

        <div className="">
          <div className="px-4 py-3 flex justify-end text-xl font-bold border-t-2 text-gray ">
            <div className="text-lg text-gray">{__('Итого:')}</div>
            <div className="text-lg text-green">{grandTotal || '0'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Totals;
