/* eslint-disable */
import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { node } from 'prop-types';

// import { SaveButton } from '../../address';
import TextInput from '../../common/Form/TextInput';
// import SelectInput from '../../common/Form/SelectInput';
// import CancelButton from './shippingAddressForm/CancelButton';
// import {
//   isMostRecentAddress,
//   isValidCustomerAddressId,
// } from '../../../utils/address';
import { __ } from '../../../i18n';
// import { _keys } from '../../../utils';
// import LocalStorage from '../../../utils/localStorage';
// import useCountryState from '../../address/hooks/useCountryState';
// import useAddressWrapper from '../../address/hooks/useAddressWrapper';
import useFormValidateThenSubmit from '../../../hook/useFormValidateThenSubmit';
// import useShippingAddressAppContext from '../hooks/useShippingAddressAppContext';
import useShippingAddressFormikContext from '../hooks/useShippingAddressFormikContext';
import NovaPoshtaCitySelect from './novaPoshta/NovaPoshtaCitySelect';
import NovaPoshtaStreetSelect from './novaPoshta/NovaPoshtaStreetSelect';
import NovaPoshtaWarehouseSelect from './novaPoshta/NovaPoshtaWarehouseSelect';
import NovaPoshtaAddressFieldSet from './novaPoshta/NovaPoshtaAddressFieldSet';

function ShippingAddressForm({ children }) {
  const {
    fields,
    formId,
    // viewMode,
    formikData,
    // isNewAddress,
    handleKeyDown,
    submitHandler,
    // isBillingSame,
    setFieldValue,
    // shippingValues,
    // selectedCountry,
    // selectedAddress,
    // setIsNewAddress,
    // setFieldTouched,
    // validationSchema,
    // setSelectedAddress,
    // isBillingFormTouched,
  } = useShippingAddressFormikContext();
  // const { isLoggedIn } = useShippingAddressAppContext();
  // const { reCalculateMostRecentAddressOptions } = useAddressWrapper();
  // const { countryOptions, stateOptions, hasStateOptions } = useCountryState({
  // const { countryOptions } = useCountryState({
  //   fields,
  //   formikData,
  // });
  const formSubmitHandler = useFormValidateThenSubmit({
    formId,
    formikData,
    submitHandler,
    // validationSchema,
  });
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

  const customSelectStyles = {
    option: (provided) => ({
      ...provided,
      fontSize: '13px',
      lineHeight: '13px',
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: '5px',
      height: '22px',
      minHeight: 'none',
      boxShadow: '0px 0px 4px 0px #ccc inset',
    }),
    container: (provided) => ({
      ...provided,
      height: '22px',
      minHeight: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '24px',
      minHeight: 'none',
      borderLeft: 'none',
      marginTop: '-2px',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '20px',
      minHeight: 'none',
      padding: '0 4px',
      alignSelf: 'center',
      marginTop: '-4px',
    }),
    input: (provided) => ({
      ...provided,
      height: '20px',
      fontSize: '13px',
      lineHeight: '13px',
      outline: 'none',
      margin: '0',
      padding: '0',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return {
        ...provided,
        opacity,
        transition,
        height: '20px',
        fontSize: '13px',
        lineHeight: '20px',
        alighSelf: 'center',
        padding: '0',
      };
    },
  };

  const { values } = useFormikContext();
  const [addressFormSubmited, setAddressFormSubmited] = useState(false);

  React.useEffect(() => {
    if (values.shipping_address) {
      const { firstname, lastname, phone } = values.shipping_address;
      console.log(values);
      if ((firstname, lastname, phone && addressFormSubmited === false)) {
        setAddressFormSubmited(true);
      }
    }
  }, [values]);

  if (addressFormSubmited) {
    (async () => {
      await formSubmitHandler();
      setFieldValue(fields.firstname, '');
      setFieldValue(fields.lastname, '');
      setFieldValue(fields.phone, '');
    })();
    setAddressFormSubmited(null);
  }

  // formSubmitHandler();
  /*  =======================================================================================  */
  const selectedShippingMethod = values?.shipping_method?.methodCode;

  // const handleCountryChange = (event) => {
  //   const newValue = event.target.value;
  //   setFieldTouched(fields.country, newValue);
  //   setFieldValue(fields.country, newValue);
  //   // when country is changed, then always reset region field.
  //   setFieldValue(fields.region, '');
  // };

  ///
  const [selectedCityId, setSelectedCityId] = useState('');
  const handleChangeCityId = (id) => {
    setSelectedCityId(id);
  };
  return (
    <>
      <div className="">
        {/* <TextInput
          required
          label={__('Населённый пункт')}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          placeholder={__('Street')}
          name={`${fields.street}[0]`}
        /> */}

        <TextInput
          name={fields.firstname}
          formikData={formikData}
          label={__('Имя')}
          onKeyDown={handleKeyDown}
          placeholder={__('First name')}
        />
        <TextInput
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
          type="tel"
        />
        <p className="text-gray-extralighter text-base mt-1">
          {__('Наши менеджеры перезвонят для уточнения деталей заказа')}
        </p>
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
        {/* <SelectInput
          required
          label={__('Country')}
          name={fields.country}
          formikData={formikData}
          options={countryOptions}
          onChange={handleCountryChange}
        /> */}
        {/* <SelectInput
          required
          label={__('State')}
          name={fields.region}
          options={stateOptions}
          formikData={formikData}
          isHidden={!selectedCountry || !hasStateOptions}
        /> */}
        {children}
        <NovaPoshtaCitySelect
          formikData={formikData}
          // name={`${fields.street}[1]`}
          name={fields.city}
          handleChangeCityId={handleChangeCityId}
          customStyles={customSelectStyles}
        />
        {selectedShippingMethod === 'novaposhta_to_warehouse' && (
          <div>
            <NovaPoshtaWarehouseSelect
              selectedCityId={selectedCityId}
              formikData={formikData}
              name={`${fields.street}[0]`}
              customStyles={customSelectStyles}
            />
          </div>
        )}
        {selectedShippingMethod === 'novaposhta_to_door' && (
          <div>
            <NovaPoshtaAddressFieldSet
              formikData={formikData}
              selectedCityId={selectedCityId}
            >
              <NovaPoshtaStreetSelect
                formikData={formikData}
                name={`${fields.street}[0]`}
                // handleChangeStreetId={handleChangeCityId}
                customStyles={customSelectStyles}
                cityId={selectedCityId}
              />
            </NovaPoshtaAddressFieldSet>
          </div>
        )}
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
ShippingAddressForm.propTypes = {
  children: node.isRequired,
};

export default ShippingAddressForm;
