import React from 'react';

import { __ } from '../../i18n';
import useTotalsCartContext from './hooks/useTotalsCartContext';
import env from '../../utils/env';
import RootElement from '../../utils/rootElement';

function Totals() {
  const storeCode = env.storeCode || RootElement.getStoreCode();
  const altShippingCostTextStores = ['ua', 'ru'];
  const zeroShippingCostText = altShippingCostTextStores.includes(storeCode)
    ? __('at the carriers rates')
    : 0;

  const {
    discounts,
    grandTotal,
    hasDiscounts,
    hasShippingRate,
    shippingMethodRate,
  } = useTotalsCartContext();
  return (
    <div className="p-0 mt-0">
      <div>
        <div className="space-y-3">
          <div className="px-4 py-3 text-xl font-bold text-gray">
            <span className="text-lg text-gray">
              {__('Delivery cost:\u00A0')}
            </span>
            <span className="text-lg text-green">
              {(hasShippingRate && shippingMethodRate) || zeroShippingCostText}
            </span>
          </div>

          {hasDiscounts &&
            discounts.map((discount) => (
              <div key={discount.label} className="flex justify-between">
                <div>{__(discount.label)}</div>
                <div>{discount.price}</div>
              </div>
            ))}
        </div>

        <div className="">
          <div className="px-4 py-3 flex justify-end text-xl font-bold border-t-2 text-gray ">
            <div className="text-lg text-gray">{__('Total:\u00A0')}</div>
            <div className="text-lg text-green"> {grandTotal || '0'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Totals;
