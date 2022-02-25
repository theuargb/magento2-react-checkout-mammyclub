/* eslint-disable */
import React, { useState } from 'react';
import { useFormikContext } from 'formik';
import { node } from 'prop-types';
import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import useFormValidateThenSubmit from '../../../hook/useFormValidateThenSubmit';
import useShippingAddressFormikContext from '../hooks/useShippingAddressFormikContext';
import NovaPoshtaCitySelect from './novaPoshta/NovaPoshtaCitySelect';
import NovaPoshtaStreetSelect from './novaPoshta/NovaPoshtaStreetSelect';
import NovaPoshtaWarehouseSelect from './novaPoshta/NovaPoshtaWarehouseSelect';
import NovaPoshtaAddressFieldSet from './novaPoshta/NovaPoshtaAddressFieldSet';
import TextInputPhoneMask from '../../common/Form/TextnputPhoneMask';

function ShippingAddressForm({ children }) {
  const {
    fields,
    formId,
    formikData,
    handleKeyDown,
    submitHandler,
    setFieldValue,
  } = useShippingAddressFormikContext();
  // const { isLoggedIn } = useShippingAddressAppContext();
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
    option: (provided, { isDisabled }) => ({
      ...provided,
      fontSize: '13px',
      lineHeight: '13px',
      color: isDisabled ? '#000' : '',
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
      padding: '0 0px',
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
    if (!addressFormSubmited && values?.shipping_address) {
      (async () => {
        await submitHandler();
      })();
      setAddressFormSubmited(true);
    }
  }, [values]);

  if (values?.shipping_address && addressFormSubmited) {
    const { firstname, lastname, phone } = values?.shipping_address;
    if (firstname === '<null>') setFieldValue(fields.firstname, '');
    if (lastname === '<null>') setFieldValue(fields.lastname, '');
    if (phone === '<null>') setFieldValue(fields.phone, '');
  }

  /*  =======================================================================================  */
  const selectedShippingMethod = values?.shipping_method?.methodCode;
  const [selectedCityId, setSelectedCityId] = useState('');
  const handleChangeCityId = (id) => {
    setSelectedCityId(id);
  };
  return (
    <>
      <div className="">
        <TextInput
          name={fields.firstname}
          formikData={formikData}
          label={__('Name')}
          onKeyDown={handleKeyDown}
        />
        <TextInput
          name={fields.lastname}
          label={__('Lastname')}
          formikData={formikData}
          onKeyDown={handleKeyDown}
        />
        <TextInputPhoneMask
          id="shipping_address.phone"
          required
          label={__('Phone (required)')}
          name={fields.phone}
          formikData={formikData}
          onKeyDown={handleKeyDown}
          type="tel"
        />
        <p className="text-gray-extralighter text-base mt-1">
          {__('Our managers will call you back to clarify the details of the order')}
        </p>
        {children}
        <NovaPoshtaCitySelect
          formikData={formikData}
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
                customStyles={customSelectStyles}
                cityId={selectedCityId}
              />
            </NovaPoshtaAddressFieldSet>
          </div>
        )}
      </div>
    </>
  );
}
ShippingAddressForm.propTypes = {
  children: node.isRequired,
};

export default ShippingAddressForm;
