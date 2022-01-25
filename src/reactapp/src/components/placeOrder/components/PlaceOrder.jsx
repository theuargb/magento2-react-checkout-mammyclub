import React from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';

// import Button from '../../common/Button';
import {
  LOGIN_FORM,
  SHIPPING_METHOD,
  BILLING_ADDR_FORM,
  SHIPPING_ADDR_FORM,
  PAYMENT_METHOD_FORM,
  CHECKOUT_AGREEMENTS_FORM,
} from '../../../config';
import {
  hasLoginErrors,
  hasPaymentMethodErrors,
  hasBillingAddressErrors,
  hasShippingMethodErrors,
  hasShippingAddressErrors,
  hasTermsAndConditionsAgreed,
} from '../utility';
import { __ } from '../../../i18n';
import useAddressSave from '../hooks/useAddressSave';
import useEmailInfoSave from '../hooks/useEmailInfoSave';
import usePlaceOrderAppContext from '../hooks/usePlaceOrderAppContext';
import usePlaceOrder from '../hooks/usePlaceOrder';
import usePlaceOrderCartContext from '../hooks/usePlaceOrderCartContext';
import { focusOnFormErrorElement, scrollToElement } from '../../../utils/form';
import { _makePromise, _emptyFunc } from '../../../utils';
import TermsInfo from './TermsInfo';

const customerWantsToSignInField = `${LOGIN_FORM}.customerWantsToSignIn`;

function PlaceOrder() {
  const validateThenPlaceOrder = usePlaceOrder();
  const { values, errors } = useFormikContext();
  const saveEmailAddressInfo = useEmailInfoSave();
  const saveBillingShippingAddress = useAddressSave();
  const { isVirtualCart } = usePlaceOrderCartContext();
  const { setMessage, setErrorMessage, setPageLoader } =
    usePlaceOrderAppContext();

  const { addCartShippingAddress, setCartBillingAddress } =
    usePlaceOrderCartContext();

  let addressToSave = values?.shipping_address;
  const additionalFields = values?.additionals?.customer_notes;
  /* Дополнительная информация в виде комментария добавляется в переменную addressToSave для того, чтобы 
  в последующем не отправлять её отдельным запросом */
  addressToSave = { ...addressToSave, customer_notes: additionalFields };
  /* ======================================== */
  // const isBillingSame = values?.billing_address?.isSameAsShipping;

  /* ОБРАБОТЧИК ПОЛЕЙ ShippingAddress */
  const handleSubmitAddressForm = async () => {
    let updateBillingAddress = _emptyFunc();
    const updateShippingAddress = _makePromise(
      addCartShippingAddress,
      addressToSave
    );
    // if (isBillingSame) {
    updateBillingAddress = _makePromise(setCartBillingAddress, {
      ...addressToSave,
    });
    // }

    await updateShippingAddress();
    await updateBillingAddress();
  };
  /*  ========================================================  */

  const handlePerformPlaceOrder = async () => {
    setMessage(false);
    if (hasLoginErrors(errors)) {
      const customerWantsToSignIn = _get(values, customerWantsToSignInField);
      setErrorMessage(
        __(
          customerWantsToSignIn
            ? 'Please provide your login details.'
            : 'Please provide your email address.'
        )
      );
      focusOnFormErrorElement(LOGIN_FORM, errors);
      return;
    }

    if (hasShippingAddressErrors(errors)) {
      setErrorMessage(__('Please provide your shipping address information.'));
      focusOnFormErrorElement(SHIPPING_ADDR_FORM, errors);
      return;
    }

    if (hasBillingAddressErrors(errors, values, isVirtualCart)) {
      setErrorMessage(__('Please provide your billing address information.'));
      focusOnFormErrorElement(BILLING_ADDR_FORM, errors);
      return;
    }

    if (hasShippingMethodErrors(errors)) {
      setErrorMessage(__('Please select your shipping method.'));
      //  УДАЛИТЬ ПОТОМ
      await handleSubmitAddressForm();
      /*  ======================= */
      scrollToElement(SHIPPING_METHOD);
      return;
    }

    if (hasPaymentMethodErrors(errors)) {
      setErrorMessage(__('Please select your payment method.'));
      scrollToElement(PAYMENT_METHOD_FORM);
      return;
    }

    if (hasTermsAndConditionsAgreed(errors)) {
      setErrorMessage(__('Please agree with the terms & conditions'));
      scrollToElement(CHECKOUT_AGREEMENTS_FORM);
      return;
    }

    try {
      setPageLoader(true);

      await handleSubmitAddressForm();

      await saveEmailAddressInfo(values);

      await saveBillingShippingAddress(values);

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
        {__('Заказать')}
      </button>
    </div>
  );
}

export default PlaceOrder;
