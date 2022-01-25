import React, { useState } from 'react';
import { string, object } from 'prop-types';
import Select from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';

const options = [{ value: 'void', label: 'Введите улицу....' }];

function NovaPoshtaStreetSelect({ formikData, name, customStyles, cityId }) {
  const [selectList, setSelectList] = useState(options);
  const { setFieldValue, setFieldTouched } = formikData;

  const handleFormChange = (e) => {
    const newValue = e.label;
    setFieldTouched(name, newValue);
    setFieldValue(name, newValue);
  };
  const changeStreetOptions = (inputValue) => {
    const streetsList = [];
    if (cityId) {
      fetch(
        `https://mammyclub.perspective.net.ua/rest/V1/novaposhta/streets?cityRef=${cityId}&text=${inputValue}`
      )
        .then((response) => response.json())
        .then((data) =>
          Array.isArray(JSON.parse(data))
            ? JSON.parse(data).forEach((streetCode) => {
                const streetItem = {
                  value: streetCode.id,
                  label: streetCode.text,
                };
                if (streetItem) {
                  streetsList.push(streetItem);
                }
              })
            : console.log(JSON.parse(data))
        )
        .then(() => setSelectList(streetsList));
    }

    // setSelectList([]);
  };
  return (
    <div className="react-select">
      <p className="text-base text-gray mb-0.5">{__('Улица')}</p>
      <Select
        options={selectList}
        onInputChange={(inputValue) => changeStreetOptions(inputValue)}
        onChange={(e) => handleFormChange(e)}
        inputId="city"
        placeholder=""
        styles={customStyles}
      />
    </div>
  );
}

NovaPoshtaStreetSelect.propTypes = {
  formikData: formikDataShape.isRequired,
  name: string.isRequired,
  customStyles: object,
  cityId: string,
};

NovaPoshtaStreetSelect.defaultProps = {
  customStyles: {},
  cityId: '',
};

export default NovaPoshtaStreetSelect;
