import React, { useState } from 'react';
import { useFormikContext } from 'formik';

// import { SaveButton } from '../../address';
import TextInput from '../../common/Form/TextInput';
import SelectInput from '../../common/Form/SelectInput';
// import CancelButton from './shippingAddressForm/CancelButton';
// import {
//   isMostRecentAddress,
//   isValidCustomerAddressId,
// } from '../../../utils/address';
import { __ } from '../../../i18n';
// import { _keys } from '../../../utils';
// import LocalStorage from '../../../utils/localStorage';
import useCountryState from '../../address/hooks/useCountryState';
// import useAddressWrapper from '../../address/hooks/useAddressWrapper';
// import useFormValidateThenSubmit from '../../../hook/useFormValidateThenSubmit';
// import useShippingAddressAppContext from '../hooks/useShippingAddressAppContext';
import useShippingAddressFormikContext from '../hooks/useShippingAddressFormikContext';
import NovaPoshtaCitySelect from './novaPoshta/NovaPoshtaCitySelect';
import NovaPoshtaWarehouseSelect from './novaPoshta/NovaPoshtaWarehouseSelect';
import NovaPoshtaAddressFieldSet from './novaPoshta/NovaPoshtaAddressFieldSet';

function ShippingAddressForm() {
  const {
    fields,
    // formId,
    // viewMode,
    formikData,
    // isNewAddress,
    handleKeyDown,
    // submitHandler,
    // isBillingSame,
    setFieldValue,
    // shippingValues,
    // selectedCountry,
    // selectedAddress,
    // setIsNewAddress,
    setFieldTouched,
    // validationSchema,
    // setSelectedAddress,
    // isBillingFormTouched,
  } = useShippingAddressFormikContext();
  // const { isLoggedIn } = useShippingAddressAppContext();
  // const { reCalculateMostRecentAddressOptions } = useAddressWrapper();
  // const { countryOptions, stateOptions, hasStateOptions } = useCountryState({
  const { countryOptions } = useCountryState({
    fields,
    formikData,
  });
  // const formSubmitHandler = useFormValidateThenSubmit({
  //   formId,
  //   formikData,
  //   submitHandler,
  //   // validationSchema,
  // });

  // const saveAddressAction = async () => {
  //   await formSubmitHandler();

  //   if (!isLoggedIn || isValidCustomerAddressId(selectedAddress)) {
  //     return;
  //   }

  //   if (isNewAddress) {
  //     const recentAddressList = LocalStorage.getMostlyRecentlyUsedAddressList();
  //     const newAddressId = `new_address_${_keys(recentAddressList).length + 1}`;
  //     LocalStorage.addAddressToMostRecentlyUsedList(shippingValues);
  //     setIsNewAddress(false);
  //     setSelectedAddress(newAddressId);
  //     LocalStorage.saveCustomerAddressInfo(newAddressId, isBillingSame);
  //     reCalculateMostRecentAddressOptions();
  //   }

  //   if (isMostRecentAddress(selectedAddress)) {
  //     LocalStorage.updateMostRecentlyAddedAddress(
  //       selectedAddress,
  //       shippingValues
  //     );
  //     reCalculateMostRecentAddressOptions();
  //   }
  // };
  const { values } = useFormikContext();

  const selectedShippingMethod = values?.shipping_method?.methodCode;

  const handleCountryChange = (event) => {
    const newValue = event.target.value;
    setFieldTouched(fields.country, newValue);
    setFieldValue(fields.country, newValue);
    // when country is changed, then always reset region field.
    setFieldValue(fields.region, '');
  };

  ///
  const [selectedCityId, setSelectedCityId] = useState('');
  const handleChangeCityId = (id) => {
    setSelectedCityId(id);
  };

  return (
    <>
      <div className="py-2">
        {/* <TextInput
          required
          label={__('Населённый пункт')}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Street')}
          name={`${fields.street}[0]`}
        /> */}
        {selectedShippingMethod === 'novaposhta_to_warehouse' && (
          <div>
            <NovaPoshtaCitySelect
              formikData={formikData}
              // name={`${fields.street}[1]`}
              name={`${fields.street}[1]`}
              handleChangeCityId={handleChangeCityId}
            />
            <NovaPoshtaWarehouseSelect
              selectedCityId={selectedCityId}
              formikData={formikData}
              name={`${fields.street}[2]`}
            />
          </div>
        )}
        {selectedShippingMethod === 'novaposhta_to_door' && (
          <div>
            <NovaPoshtaCitySelect
              formikData={formikData}
              // name={`${fields.street}[0]`}
              name={`${fields.street}[1]`}
              handleChangeCityId={handleChangeCityId}
            />
            <NovaPoshtaAddressFieldSet />
          </div>
        )}
        <TextInput
          required
          name={fields.firstname}
          formikData={formikData}
          label={__('Имя')}
          onKeyDown={handleKeyDown}
          placeholder={__('First name')}
        />
        <TextInput
          required
          name={fields.lastname}
          label={__('Фамилия')}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Last name')}
        />
        <TextInput
          required
          label={__('Телефон (обязательно)')}
          name={fields.phone}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('+32 000 000 000')}
        />
        {/* <TextInput
          required
          name={`${fields.street}[0]`}
          formikData={formikData}
          label={__('Street')}
          onKeyDown={handleKeyDown}
          placeholder={__('Street')}
        />
        <TextInput
          required
          label={__('Company')}
          name={fields.company}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Company')}
        />
        <TextInput
          required
          placeholder="12345"
          name={fields.zipcode}
          formikData={formikData}
          label={__('Postal Code')}
          onKeyDown={handleKeyDown}
        />
        <TextInput
          required
          label={__('City')}
          name={fields.city}
          formikData={formikData}
          placeholder={__('City')}
          onKeyDown={handleKeyDown}
        /> */}

        <SelectInput
          required
          label={__('Country')}
          name={fields.country}
          formikData={formikData}
          options={countryOptions}
          onChange={handleCountryChange}
        />

        {/* <SelectInput
          required
          label={__('State')}
          name={fields.region}
          options={stateOptions}
          formikData={formikData}
          isHidden={!selectedCountry || !hasStateOptions}
        /> */}
      </div>

      <div className="flex items-center justify-around mt-2">
        {/* <CancelButton />
        <SaveButton
          isFormValid={isBillingFormTouched}
          actions={{ saveAddress: saveAddressAction }}
        />
        <button type="button" onClick={() => submitHandler()}>
          123123
        </button> */}
      </div>
    </>
  );
}

export default ShippingAddressForm;
