import React, { useMemo } from 'react';
import TextInput from '../../../common/Form/TextInput';
import useShippingAddressCartContext from '../../hooks/useShippingAddressCartContext';
import { __ } from '../../../../i18n';
import { SHIPPING_ADDR_FORM } from '../../../../config';
import useFormikMemorizer from '../../../../hook/useFormikMemorizer';

function CustomerNotes() {
  const sectionFormikData = useFormikMemorizer(SHIPPING_ADDR_FORM);
  const { formSectionValues, formSectionErrors, isFormSectionTouched } =
    sectionFormikData;

  const { setAddressNeedToUpdate } = useShippingAddressCartContext();

  const handleAddressFieldOnBlur = () => {
    setAddressNeedToUpdate(true);
  };
  const handleAddressFieldOnFocus = () => {
    setAddressNeedToUpdate(false);
  };

  const formikData = useMemo(
    () => ({
      ...sectionFormikData,
      formSectionErrors,
      shippingValues: formSectionValues,
      isBillingFormTouched: isFormSectionTouched,
      selectedRegion: sectionFormikData.formSectionValues?.region,
      selectedCountry: sectionFormikData.formSectionValues?.country,
    }),
    [
      sectionFormikData,
      formSectionValues,
      formSectionErrors,
      isFormSectionTouched,
    ]
  );

  return (
    <div className="px-4">
      <TextInput
        name="shipping_address.customer_notes"
        formikData={formikData}
        label={__('Comment to the order')}
        placeholder=""
        as="textarea"
        className="h-28 py-2"
        style={{ resize: 'none' }}
        onBlur={handleAddressFieldOnBlur}
        onFocus={handleAddressFieldOnFocus}
      />
    </div>
  );
}

export default CustomerNotes;
