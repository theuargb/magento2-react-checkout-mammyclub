import React, { useEffect, useState } from 'react';

import Login from '../login';
import Totals from '../totals';
import CartItemsForm from '../items';
import PlaceOrder from '../placeOrder';
import PageLoader from '../common/Loader';
import { AddressWrapper } from '../address';
import PaymentMethod from '../paymentMethod';
// import BillingAddress from '../billingAddress';
import ShippingAddress from '../shippingAddress';
import ShippingMethodsForm from '../shippingMethod';
import StickyRightSidebar from '../StickyRightSidebar';
import CheckoutAgreements from '../checkoutAgreements';
import CheckoutFormWrapper from './CheckoutFormWrapper';
import OrderAdditionals from '../additionals/OrderAdditionals';
import { aggregatedQueryRequest } from '../../api';
import useCheckoutFormAppContext from './hooks/useCheckoutFormAppContext';
import useCheckoutFormCartContext from './hooks/useCheckoutFormCartContext';
import { __ } from '../../i18n';
import LiqPayWidget from '../LiqPayWidget/LiqPayWidget';

import CheckoutRightSidebar from '../magentoBlocks/CheckoutRightSidebar';

function CheckoutForm() {
  const [initialData, setInitialData] = useState(false);
  const { pageLoader, appDispatch, setPageLoader, storeAggregatedAppStates } =
    useCheckoutFormAppContext();

  const { orderId, storeAggregatedCartStates } = useCheckoutFormCartContext();

  /**
   * Collect App, Cart data when the page loads.
   */
  useEffect(() => {
    (async () => {
      try {
        setPageLoader(true);
        const data = await aggregatedQueryRequest(appDispatch);

        await storeAggregatedCartStates(data);
        await storeAggregatedAppStates(data);
        setInitialData(data);
        setPageLoader(false);
      } catch (error) {
        setPageLoader(false);
      }
    })();
  }, [
    appDispatch,
    setPageLoader,
    storeAggregatedAppStates,
    storeAggregatedCartStates,
  ]);

  return (
    <CheckoutFormWrapper initialData={initialData}>
      <div className="flex justify-center">
        <div className="container w-full mx-auto py-2 md:py-5 px-0">
          <div className="hidden md:grid grid-cols-2 gap-x-6 checkout-wrapper">
            <p className="text-xxlg ">
              {__('Оформление заказа')}
              <p className="text-xxs text-red-500 mt-0.5">
                {__('Обязательные поля отмечены звездочкой *')}
              </p>
            </p>
            <p className="text-xxlg ">{__('Ваш заказ')}</p>
          </div>

          <div className="flex flex-col my-3 space-y-2 md:flex-row md:space-y-0 px-0 sm:px-4 md:px-0 ">
            <div className="checkout-wrapper order-1 md:hidden ">
              <p className="text-xxlg ">{__('Ваш заказ')}</p>
            </div>

            <div className="checkout-wrapper mt-8 md:mt-0 w-full md:order-1 order-4 md:w-1/2 grow-0 md:mr-8">
              <div className="w-full xl:max-w-full border border-container py-3.5">
                <AddressWrapper>
                  <ShippingAddress>
                    <Login />
                    <ShippingMethodsForm />
                  </ShippingAddress>

                  {/* <BillingAddress /> */}
                  <PaymentMethod />
                  {/* <CouponCode /> */}
                  <OrderAdditionals />
                  <PlaceOrder />
                </AddressWrapper>
              </div>
            </div>

            <div className="checkout-wrapper order-3">
              <p className="text-xxlg  md:hidden mt-5">
                {__('Оформление заказа')}
                <p className="text-xxs text-red-500 mt-0.5">
                  {__('Обязательные поля отмечены звездочкой *')}
                </p>
              </p>
            </div>

            <StickyRightSidebar>
              <div className="border border-container checkout-wrapper">
                <CartItemsForm />
                <Totals />
                <CheckoutAgreements />
              </div>
              <CheckoutRightSidebar />
            </StickyRightSidebar>
          </div>
          {pageLoader && <PageLoader />}
        </div>
      </div>
      <LiqPayWidget orderId={orderId} />
    </CheckoutFormWrapper>
  );
}

export default CheckoutForm;
