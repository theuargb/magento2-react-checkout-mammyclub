import React, { useMemo } from 'react';
import { object } from 'prop-types';
import ShippingMethodMemorized from './ShippingMethodMemorized';
import useFormikMemorizer from '../../hook/useFormikMemorizer';
import { SHIPPING_METHOD } from '../../config';

/**
 * Entry point shipping method Form Section
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
function ShippingMethodsForm({ cmsHtmlContent }) {
  const formikSectionData = useFormikMemorizer(SHIPPING_METHOD);
  const shippingFormikData = useMemo(
    () => ({
      ...formikSectionData,
      selectedMethod: formikSectionData.formSectionValues || {},
    }),
    [formikSectionData]
  );
  return (
    <ShippingMethodMemorized
      cmsHtmlContent={cmsHtmlContent}
      formikData={shippingFormikData}
    />
  );
}

ShippingMethodsForm.propTypes = {
  cmsHtmlContent: object,
};

ShippingMethodsForm.defaultProps = {
  cmsHtmlContent: {},
};

export default ShippingMethodsForm;
