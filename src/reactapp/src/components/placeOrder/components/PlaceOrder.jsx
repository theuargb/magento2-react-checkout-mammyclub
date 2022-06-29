import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import useLoginAppContext from '../../login/hooks/useLoginAppContext';
import {
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  CHECKOUT_AGREEMENTS_FORM,
} from '../../../config';
import {
  hasBillingAddressErrors,
  hasShippingAddressErrors,
  hasTermsAndConditionsAgreed,
} from '../utility';
import { __ } from '../../../i18n';
import useEmailInfoSave from '../hooks/useEmailInfoSave';
import usePlaceOrderAppContext from '../hooks/usePlaceOrderAppContext';
import usePlaceOrder from '../hooks/usePlaceOrder';
import usePlaceOrderCartContext from '../hooks/usePlaceOrderCartContext';
import useShippingAddressCartContext from '../../shippingAddress/hooks/useShippingAddressCartContext';
import {
  focusOnFormErrorElement,
  scrollToElement,
  focusOnPhoneErrorElement,
} from '../../../utils/form';
import TermsInfo from './TermsInfo';

function PlaceOrder() {
  const validateThenPlaceOrder = usePlaceOrder();
  const { values, errors } = useFormikContext();
  const saveEmailAddressInfo = useEmailInfoSave();
  const { isVirtualCart } = usePlaceOrderCartContext();
  const { setMessage, setErrorMessage, setPageLoader } =
    usePlaceOrderAppContext();

  const [isOrderReadyToPlace, setOrderReadyToPlace] = useState(false);

  const { isAddressNeedToUpdate } = useShippingAddressCartContext();

  const { isLoggedIn } = useLoginAppContext();

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
      /* 
        saveEmailAddressInfo предназначен для гостевой корзины, для зарегистрированных пользователей
        мыло пишется в атрибут new_customer_email как дополнительная информация в ордере
      */
      if (!isLoggedIn) {
        await saveEmailAddressInfo(values);
      }
      await validateThenPlaceOrder(values);

      setPageLoader(false);
      setOrderReadyToPlace(false);
    } catch (error) {
      console.error(error);
      setPageLoader(false);
      setOrderReadyToPlace(false);
    }
  };

  useEffect(() => {
    if (isOrderReadyToPlace) {
      setPageLoader(true);
    }
    if (isOrderReadyToPlace && !isAddressNeedToUpdate) {
      handlePerformPlaceOrder();
    }
  }, [isAddressNeedToUpdate, isOrderReadyToPlace]);

  return (
    <div className="flex items-center justify-between pt-4 px-4">
      <TermsInfo />
      <button
        onClick={() => setOrderReadyToPlace(true)}
        className="orange-but"
        type="submit"
      >
        {__('Place order')}
      </button>
    </div>
  );
}

export default PlaceOrder;
