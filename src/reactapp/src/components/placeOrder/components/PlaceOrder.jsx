import React from 'react';
import { useFormikContext } from 'formik';
import useLoginAppContext from '../../login/hooks/useLoginAppContext';
/* eslint-disable */
import {
  SHIPPING_METHOD,
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  PAYMENT_METHOD_FORM,
  CHECKOUT_AGREEMENTS_FORM,
} from '../../../config';
import {
  hasPaymentMethodErrors,
  hasBillingAddressErrors,
  hasShippingMethodErrors,
  hasShippingAddressErrors,
  hasTermsAndConditionsAgreed,
} from '../utility';
import { __ } from '../../../i18n';
import useEmailInfoSave from '../hooks/useEmailInfoSave';
import usePlaceOrderAppContext from '../hooks/usePlaceOrderAppContext';
import usePlaceOrder from '../hooks/usePlaceOrder';
import usePlaceOrderCartContext from '../hooks/usePlaceOrderCartContext';
import useAddressSave from '../hooks/useAddressSave';
import {
  focusOnFormErrorElement,
  scrollToElement,
  focusOnPhoneErrorElement,
} from '../../../utils/form';
import { _makePromise, _emptyFunc } from '../../../utils';
import TermsInfo from './TermsInfo';

function PlaceOrder() {
  const validateThenPlaceOrder = usePlaceOrder();
  const { values, errors } = useFormikContext();
  const saveEmailAddressInfo = useEmailInfoSave();
  const { isVirtualCart } = usePlaceOrderCartContext();
  const { setMessage, setErrorMessage, setPageLoader } =
    usePlaceOrderAppContext();

  const { isLoggedIn } = useLoginAppContext();
  let addressToSave = values?.shipping_address;
  const additionalFields = values?.additionals?.customer_notes;
  const emailForGuestCart = values?.login?.email;
  const setAddresses = useAddressSave();

  /* Дополнительная информация в виде комментария добавляется в переменную addressToSave для того, чтобы 
  в последующем не отправлять её отдельным запросом */
  addressToSave = { ...addressToSave, customer_notes: additionalFields };
  /* ======================================== */

  /* 
    На гостевой корзине, если пользователем был введён email, он так же продублируется
    в дополнительный атрибут new_customer_email ( добавлено из-за особенностей процесса обработки заказов
    на стороне клиента).
  */
  if (!isLoggedIn && emailForGuestCart) {
    addressToSave = { ...addressToSave, new_customer_email: emailForGuestCart };
  }
  /* ======================================== */

  const useSaveAddresses = async () => {
    setPageLoader(true);
    await setAddresses(addressToSave);
    setPageLoader(false);
  };
  const handlePerformPlaceOrder = async () => {
    setMessage(false);

    if (hasShippingAddressErrors(errors?.shipping_address?.phone)) {
      setErrorMessage(__('Please provide your shipping address information.'));
      focusOnPhoneErrorElement();
      scrollToElement(SHIPPING_ADDR_FORM);
      return;
    }

    if (hasBillingAddressErrors(errors, values, isVirtualCart)) {
      setErrorMessage(__('Please provide your billing address information.'));
      focusOnFormErrorElement(BILLING_ADDR_FORM, errors);
      return;
    }

    if (hasTermsAndConditionsAgreed(errors)) {
      setErrorMessage(__('Please agree with the terms & conditions'));
      scrollToElement(CHECKOUT_AGREEMENTS_FORM);
      return;
    }

    try {
      setPageLoader(true);

      await useSaveAddresses();

      /* 
        saveEmailAddressInfo предназначен для гостевой корзины, для зарегистрированных пользователей
        мыло пишется в атрибут new_customer_email как дополнительная информация в ордере
      */
      !isLoggedIn && (await saveEmailAddressInfo(values));

      await validateThenPlaceOrder(values);

      setPageLoader(false);
    } catch (error) {
      console.error(error);
      setPageLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-between pt-4 px-4">
      <TermsInfo />
      <button
        onClick={handlePerformPlaceOrder}
        className="orange-but"
        type="submit"
      >
        {__('Place order')}
      </button>
    </div>
  );
}

export default PlaceOrder;
