import React, { useState, useEffect } from 'react';
import { string } from 'prop-types';
import Select from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';

const options = [{ value: 'void', label: 'Введите название города....' }];

function NovaPoshtaWarehouseSelect({ selectedCityId, name, formikData }) {
  const [selectList, setSelectList] = useState(options);
  const { setFieldValue, setFieldTouched } = formikData;

  const handleFormChange = (e) => {
    const newValue = e.label;
    setFieldTouched(name, newValue);
    setFieldValue(name, newValue);
  };

  useEffect(() => {
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
      <Select options={selectList} onChange={(e) => handleFormChange(e)} />
    </div>
  );
}

NovaPoshtaWarehouseSelect.propTypes = {
  selectedCityId: string.isRequired,
  formikData: formikDataShape.isRequired,
  name: string.isRequired,
};

export default NovaPoshtaWarehouseSelect;
