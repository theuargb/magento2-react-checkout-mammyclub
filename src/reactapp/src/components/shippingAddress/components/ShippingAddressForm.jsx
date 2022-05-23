/* eslint-disable */
import React, { useState } from 'react';
import _get from 'lodash.get';
import { useFormikContext } from 'formik';
import { node } from 'prop-types';
import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import useShippingAddressFormikContext from '../hooks/useShippingAddressFormikContext';
import NovaPoshtaCitySelect from './novaPoshta/NovaPoshtaCitySelect';
import NovaPoshtaStreetSelect from './novaPoshta/NovaPoshtaStreetSelect';
import NovaPoshtaWarehouseSelect from './novaPoshta/NovaPoshtaWarehouseSelect';
import NovaPoshtaAddressFieldSet from './novaPoshta/NovaPoshtaAddressFieldSet';
import TextInputPhoneMask from '../../common/Form/TextnputPhoneMask';
import useShippingAddressAppContext from '../hooks/useShippingAddressAppContext';
import useCartContext from '../../../hook/useCartContext';

function ShippingAddressForm({ children }) {
  const { fields, formikData, handleKeyDown, submitHandler, setFieldValue } =
    useShippingAddressFormikContext();

  const { isLoggedIn } = useShippingAddressAppContext();
  const { cart } = useCartContext();
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
      gridTemplateColumns: '0 auto',
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
    MenuList: (provided) => {
      return {
        ...provided,
        overscrollBehavior: 'none',
      };
    },
  };

  const { values } = useFormikContext();
  const [addressFormSubmited, setAddressFormSubmited] = useState(false);


  /* Запрос на сохранение адреса ( вызывается один раз при загрузке корзины). 
     Вызывается для того, чтобы в корзине засейвился адрес и на фронт пришли доступные методы доставки.
     Если кастомер авторизирован - идёт подмена номера телефона для запроса сохранения адреса, чтобы телефон кастомера
     не перетёрся на undefined
  */
  React.useEffect(() => {
    if (
      isLoggedIn &&
      !addressFormSubmited &&
      values?.shipping_address &&
      cart.phone
    ) {
      formikData.shippingValues.phone = cart.phone;
      (async () => {
        await submitHandler();
      })();
      setAddressFormSubmited(true);
    } else if (
      !addressFormSubmited &&
      values?.shipping_address &&
      !isLoggedIn
    ) {
      (async () => {
        await submitHandler();
      })();
      setAddressFormSubmited(true);
    }
  }, [values]);

  if (values?.shipping_address && addressFormSubmited && !isLoggedIn) {
    const { phone } = values?.shipping_address;
    if (phone === 'undefined') {
      setFieldValue(fields.phone, null);
    }
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
          {__(
            'Our managers will call you back to clarify the details of the order'
          )}
        </p>

        <TextInput
          type="email"
          label={__('Email')}
          name={fields.new_customer_email}
          formikData={formikData}
          onKeyDown={handleKeyDown}
        />
        <p className="text-gray-extralighter text-base mt-1">
          {__('Here we will send all documents confirming the purchase')}
        </p>
        {children}
        <NovaPoshtaCitySelect
          formikData={formikData}
          name={fields.city}
          cityRefField={fields.city_ref}
          handleChangeCityId={handleChangeCityId}
          customStyles={customSelectStyles}
        />
        {selectedShippingMethod === 'novaposhta_to_warehouse' && (
          <div>
            <NovaPoshtaWarehouseSelect
              selectedCityId={selectedCityId}
              formikData={formikData}
              name={`${fields.street}[0]`}
              postRefField={fields.warehouse_ref}
              customStyles={customSelectStyles}
              streetIdField={fields.street_ref}
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
                streetRefField={fields.street_ref}
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
