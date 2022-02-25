import React, { useMemo } from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';
import { node } from 'prop-types';

import ShippingAddressMemorized from './ShippingAddressMemorized';
import { SHIPPING_ADDR_FORM } from '../../config';
import { shippingAddrOtherOptionField } from './utility';
import useFormikMemorizer from '../../hook/useFormikMemorizer';
import { billingSameAsShippingField } from '../../utils/address';
/**
 * Entry point of shipping address Form Section
 *
 * We are preparing any data related to formik state here and memorizing it.
 * After that, these info will be fed to all other child components.
 *
 * So child components DO NOT access formik states using `useFormikContext` hook
 * inside them unless it is totally unavoidable.
 *
 * Using useFormikContext hook render the component almost always. So use the
 * memorized data here inside the child components.
 */
function ShippingAddress({ children }) {
  const { values } = useFormikContext();
  const sectionFormikData = useFormikMemorizer(SHIPPING_ADDR_FORM);
  const isBillingSame = !!_get(values, billingSameAsShippingField);
  const shippingOtherOptionSelected = _get(
    values,
    shippingAddrOtherOptionField
  );
  const { formSectionValues, formSectionErrors, isFormSectionTouched } =
    sectionFormikData;

  const shippingFormikData = useMemo(
    () => ({
      ...sectionFormikData,
      isBillingSame,
      formSectionErrors,
      shippingOtherOptionSelected,
      shippingValues: formSectionValues,
      isBillingFormTouched: isFormSectionTouched,
      selectedRegion: sectionFormikData.formSectionValues?.region,
      selectedCountry: sectionFormikData.formSectionValues?.country,
    }),
    [
      isBillingSame,
      sectionFormikData,
      formSectionValues,
      formSectionErrors,
      isFormSectionTouched,
      shippingOtherOptionSelected,
    ]
  );

  return (
    <ShippingAddressMemorized formikData={shippingFormikData}>
      {children}
    </ShippingAddressMemorized>
  );
}

ShippingAddress.propTypes = {
  children: node.isRequired,
};

export default ShippingAddress;
