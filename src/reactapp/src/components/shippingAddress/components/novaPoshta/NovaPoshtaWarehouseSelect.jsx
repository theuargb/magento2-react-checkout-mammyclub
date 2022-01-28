import React, { useState, useEffect } from 'react';
import { string, object } from 'prop-types';
import Select from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';

const options = [{ value: 'void', label: 'Введите название города....' }];

function NovaPoshtaWarehouseSelect({
  selectedCityId,
  name,
  formikData,
  customStyles,
}) {
  const [selectList, setSelectList] = useState(options);
  const { setFieldValue, setFieldTouched } = formikData;
  const [selectValue, setSelectValue] = useState('void');

  const handleFormChange = (e) => {
    const newValue = e.label;
    setFieldTouched(name, newValue);
    setFieldValue(name, newValue);

    setSelectValue(e);
  };

  useEffect(() => {
    setSelectValue('void');
    const postList = [];
    fetch(
      `https://mammyclub.perspective.net.ua/rest/V1/novaposhta/warehouses?cityRef=${selectedCityId}`
    )
      .then((response) => response.json())
      .then((data) =>
        Array.isArray(JSON.parse(data))
          ? JSON.parse(data).forEach((postCode) => {
              const postItem = {
                value: postCode.id,
                label: postCode.text,
              };
              if (postItem) {
                postList.push(postItem);
              }
            })
          : console.log(JSON.parse(data))
      )
      .then(() => setSelectList(postList));
    // setSelectList([]);
  }, [selectedCityId]);

  return (
    <div className="react-select">
      <p className="text-base text-gray mb-0.5">
        {__('Номер склада Новой Почты')}
      </p>
      <Select
        options={selectList}
        placeholder=""
        onChange={(e) => handleFormChange(e)}
        styles={customStyles}
        value={selectValue}
      />
    </div>
  );
}

NovaPoshtaWarehouseSelect.propTypes = {
  selectedCityId: string.isRequired,
  formikData: formikDataShape.isRequired,
  name: string.isRequired,
  customStyles: object,
};

NovaPoshtaWarehouseSelect.defaultProps = {
  customStyles: {},
};

export default NovaPoshtaWarehouseSelect;
