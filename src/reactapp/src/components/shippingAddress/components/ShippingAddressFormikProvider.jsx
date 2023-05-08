import React, { useCallback, useEffect, useState } from 'react';
import {
  array as YupArray,
  string as YupString,
  boolean as YupBoolean,
} from 'yup';
import { Form } from 'formik';
import { node } from 'prop-types';

import {
  // initialCountry,
  isCartAddressValid,
  isValidCustomerAddressId,
  storeCode,
} from '../../../utils/address';
import { __ } from '../../../i18n';
import { _toString } from '../../../utils';
import { CART_SHIPPING_ADDRESS } from '../utility';
import { SHIPPING_ADDR_FORM } from '../../../config';
import LocalStorage from '../../../utils/localStorage';
import useFormSection from '../../../hook/useFormSection';
import { formikDataShape } from '../../../utils/propTypes';
import useFormEditMode from '../../../hook/useFormEditMode';
import { customerHasAddress } from '../../../utils/customer';
import useRegionData from '../../address/hooks/useRegionData';
import useSaveAddressAction from '../hooks/useSaveAddressAction';
import useEnterActionInForm from '../../../hook/useEnterActionInForm';
import useRegionValidation from '../../address/hooks/useRegionValidation';
import ShippingAddressFormContext from '../context/ShippingAddressFormikContext';
import useShippingAddressAppContext from '../hooks/useShippingAddressAppContext';
import useShippingAddressCartContext from '../hooks/useShippingAddressCartContext';
import useFillDefaultAddresses from '../hooks/useFillDefaultAddresses';

/* eslint-disable */
const phoneRegExp =
  storeCode === 'pl'
    ? /^((\+)?(4)?(8)?[\- ]?)?(\(?\d{2}\)?[\- ]?)?\d{3}[\- ]?\d{2}[\- ]?\d{2}$/
    : /^((\+)?(3)?(8)?(0)?[\- ]?)?(\(?\d{2}\)?[\- ]?)?\d{3}[\- ]?\d{2}[\- ]?\d{2}$/;
/* eslint-enable */

const initialValues = {
  company: '',
  firstname: '',
  lastname: '',
  street: [''],
  phone: '',
  zipcode: '',
  city: '',
  region: '',
  country: 'UA',
  street_ref: '',
  city_ref: '',
  warehouse_ref: '',
  new_customer_email: '',
  customer_notes: '',
};

const requiredMessage = __('%1 - required field');

const initValidationSchema = {
  warehouse_ref: YupString(),
  street_ref: YupString(),
  city_ref: YupString(),
  company: YupString().nullable(),
  firstname:
    storeCode === 'pl'
      ? YupString().required(requiredMessage)
      : YupString().nullable(),
  lastname:
    storeCode === 'pl'
      ? YupString().required(requiredMessage)
      : YupString().nullable(),
  street: YupArray(),
  phone: YupString()
    .matches(phoneRegExp, 'Require correct number entered')
    .required(requiredMessage),
  zipcode: YupString().nullable(),
  city: YupString().nullable(),
  region: YupString().nullable(),
  country: YupString().required(requiredMessage),
  isSameAsShipping: YupBoolean(),
  customer_notes: YupString().nullable(),
};

const addressIdInCache = _toString(LocalStorage.getCustomerShippingAddressId());
const initAddressId = addressIdInCache || CART_SHIPPING_ADDRESS;

function ShippingAddressFormikProvider({ children, formikData }) {
  const { setFieldValue, selectedRegion, selectedCountry, setFieldTouched } =
    formikData;
  const [isNewAddress, setIsNewAddress] = useState(true);
  const [backupAddress, setBackupAddress] = useState(null);
  const [forceFilledAddress, setForceFilledAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(initAddressId);
  const [customerAddressSelected, setCustomerAddressSelected] = useState(
    isValidCustomerAddressId(addressIdInCache)
  );
  const validationSchema = useRegionValidation(
    selectedCountry,
    initValidationSchema
  );
  // this will set default addresses on the address fields on login
  useFillDefaultAddresses({
    ...formikData,
    setSelectedAddress,
    setCustomerAddressSelected,
  });
  const editModeContext = useFormEditMode();
  const { customerAddressList } = useShippingAddressAppContext();
  const { cartShippingAddress } = useShippingAddressCartContext();
  const { setFormToViewMode } = editModeContext;
  const regionData = useRegionData(selectedCountry, selectedRegion);
  const cartHasShippingAddress = isCartAddressValid(cartShippingAddress);

  const resetShippingAddressFormFields = useCallback(() => {
    setFieldValue(SHIPPING_ADDR_FORM, { ...initialValues });
    setFieldTouched(SHIPPING_ADDR_FORM, {});
  }, [setFieldValue, setFieldTouched]);

  const setShippingAddressFormFields = useCallback(
    (addressToSet) =>
      setFieldValue(SHIPPING_ADDR_FORM, {
        ...initialValues,
        ...addressToSet,
      }),
    [setFieldValue]
  );

  // filling shipping address field when the cart possess a shipping address
  useEffect(() => {
    if (
      !cartHasShippingAddress &&
      forceFilledAddress === selectedAddress &&
      customerHasAddress(customerAddressList)
    ) {
      setFormToViewMode();
      return;
    }

    // Toggle to view mode if there are customer address or cart address
    // This action should happen only once when the page loads.
    if (
      !forceFilledAddress &&
      (cartHasShippingAddress || customerHasAddress(customerAddressList))
    ) {
      setFormToViewMode();
    }

    // This should be happened only once when page loads
    if (!forceFilledAddress && isValidCustomerAddressId(selectedAddress)) {
      setIsNewAddress(false);
    }

    if (cartHasShippingAddress) {
      setForceFilledAddress(selectedAddress);
    }
  }, [
    selectedAddress,
    setFormToViewMode,
    forceFilledAddress,
    customerAddressList,
    cartHasShippingAddress,
  ]);

  let context = {
    ...regionData,
    ...formikData,
    ...editModeContext,
    formikData,
    isNewAddress,
    backupAddress,
    setIsNewAddress,
    selectedAddress,
    setBackupAddress,
    setSelectedAddress,
    customerAddressSelected,
    setCustomerAddressSelected,
    setShippingAddressFormFields,
    resetShippingAddressFormFields,
  };

  const formSubmit = useSaveAddressAction(context);
  const handleKeyDown = useEnterActionInForm({
    formikData,
    validationSchema,
    submitHandler: formSubmit,
  });
  const formSectionContext = useFormSection({
    formikData,
    initialValues,
    validationSchema,
    id: SHIPPING_ADDR_FORM,
    submitHandler: formSubmit,
  });

  context = {
    ...context,
    ...formikData,
    ...formSectionContext,
    formikData,
    formSubmit,
    handleKeyDown,
  };

  return (
    <ShippingAddressFormContext.Provider value={context}>
      <Form id={SHIPPING_ADDR_FORM}>{children}</Form>
    </ShippingAddressFormContext.Provider>
  );
}

ShippingAddressFormikProvider.propTypes = {
  children: node.isRequired,
  formikData: formikDataShape.isRequired,
};

export default ShippingAddressFormikProvider;
