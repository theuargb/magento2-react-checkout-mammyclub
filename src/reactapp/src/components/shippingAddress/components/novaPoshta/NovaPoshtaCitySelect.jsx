import React, { useState } from 'react';
import { func, string, object } from 'prop-types';
import Select from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';

const options = [{ value: 'void', label: 'Введите название города....' }];

function NovaPoshtaCitySelect({
  handleChangeCityId,
  formikData,
  name,
  customStyles,
}) {
  const [selectList, setSelectList] = useState(options);
  const { setFieldValue, setFieldTouched } = formikData;

  const handleFormChange = (e) => {
    const newValue = e.label;
    setFieldTouched(name, newValue);
    setFieldValue(name, newValue);
    handleChangeCityId(e.value);
  };

  const changeCityOptions = (inputValue) => {
    let cityList = [];
    fetch(
      `https://mammyclub.perspective.net.ua/rest/V1/novaposhta/cities?name=${inputValue}`
    )
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(JSON.parse(data))
          ? JSON.parse(data).forEach((cityCode) => {
              const cityItem = {
                value: cityCode.id,
                label: cityCode.text,
              };
              if (cityItem) {
                cityList.push(cityItem);
              }
            })
          : console.log(JSON.parse(data))
      )
      .then(() => {
        setSelectList(cityList);
        cityList = [];
      });
  };
  return (
    <div className="react-select pt-5 pb-3">
      <p className="text-base text-gray mb-0.5">{__('Населенный пункт')}</p>
      <Select
        options={selectList}
        onInputChange={(inputValue) => changeCityOptions(inputValue)}
        onChange={(e) => handleFormChange(e)}
        inputId="city"
        placeholder=""
        styles={customStyles}
        // isSearchable={false}
        filterOption={(selectOptions) => selectOptions}
      />
    </div>
  );
}

NovaPoshtaCitySelect.propTypes = {
  handleChangeCityId: func.isRequired,
  formikData: formikDataShape.isRequired,
  name: string.isRequired,
  customStyles: object,
};

NovaPoshtaCitySelect.defaultProps = {
  customStyles: {},
};

export default NovaPoshtaCitySelect;
