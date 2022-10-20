import React, { useState, useEffect } from 'react';
import { string, object } from 'prop-types';
import Select from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';
import { config } from '../../../../config';

const options = [{ value: 'void', label: __('Type street name...') }];

function NovaPoshtaStreetSelect({
  formikData,
  name,
  customStyles,
  cityId,
  streetRefField,
  ...rest
}) {
  const [selectList, setSelectList] = useState(options);
  const { setFieldValue, setFieldTouched } = formikData;
  const [streetValue, setStreetValue] = useState(null);
  const { onBlur, onFocus } = rest;

  const handleFormChange = (e) => {
    const newValue = e.label;
    const streetRef = e.ref;
    setFieldTouched(name, newValue);
    setFieldValue(name, newValue);
    setFieldValue(streetRefField, streetRef);
    setStreetValue(e);
  };
  const clearSelectedValue = () => {
    setStreetValue(null);
    setFieldTouched(name, '');
    setFieldValue(name, '');
    setFieldValue(streetRefField, '');
  };
  const changeStreetOptions = (inputValue) => {
    const streetsList = [];
    if (cityId) {
      fetch(
        `${config.baseUrl}/rest/V1/novaposhta/streets?cityRef=${cityId}&text=${inputValue}`
      )
        .then((response) => response.json())
        .then((data) =>
          Array.isArray(JSON.parse(data))
            ? JSON.parse(data).forEach((streetCode) => {
                const streetItem = {
                  value: streetCode.id,
                  label: streetCode.text,
                  ref: streetCode.ref,
                };
                if (streetItem) {
                  streetsList.push(streetItem);
                }
              })
            : console.log(JSON.parse(data))
        )
        .then(() => {
          if (streetsList.length > 0) {
            setSelectList(streetsList);
          } else {
            setSelectList(options);
          }
        });
    }
  };
  useEffect(() => {
    changeStreetOptions('');
    clearSelectedValue();
  }, [cityId]);

  return (
    <div className="react-select">
      <p className="text-base text-gray mb-0.5">{__('Street')}</p>
      <Select
        value={streetValue}
        options={selectList}
        onInputChange={(inputValue) => changeStreetOptions(inputValue)}
        onChange={(e) => handleFormChange(e)}
        inputId="city"
        placeholder={null}
        styles={customStyles}
        noOptionsMessage={() => __('No options')}
        onBlur={onBlur}
        onFocus={onFocus}
        onMenuOpen={clearSelectedValue}
      />
    </div>
  );
}

NovaPoshtaStreetSelect.propTypes = {
  formikData: formikDataShape.isRequired,
  name: string.isRequired,
  customStyles: object,
  cityId: string,
  streetRefField: string,
};

NovaPoshtaStreetSelect.defaultProps = {
  customStyles: {},
  cityId: '',
  streetRefField: 'shipping_address.street_ref',
};

export default NovaPoshtaStreetSelect;
