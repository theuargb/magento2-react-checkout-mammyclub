import escapeRegExp from 'lodash/escapeRegExp';
import React, { useState, useEffect, useMemo } from 'react';
import { string, object } from 'prop-types';
import Select from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';

const options = [
  { value: 'void', label: __('Введите номер или адрес отделения...') },
];

function NovaPoshtaWarehouseSelect({
  selectedCityId,
  name,
  formikData,
  customStyles,
}) {
  const MAX_DISPLAYED_OPTIONS = 100;
  const [selectList, setSelectList] = useState(options);
  const { setFieldValue, setFieldTouched } = formikData;
  const [selectValue, setSelectValue] = useState('void');
  const [inputValue, setInputValue] = useState('');

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
      .then(() => {
        if (postList.length > 0) {
          setSelectList(postList);
        } else {
          setSelectList(options);
        }
      });
  }, [selectedCityId]);

  const filteredSelectList = useMemo(() => {
    if (!inputValue) {
      return selectList;
    }

    const matchByStart = [];
    const matchByInclusion = [];

    const regByInclusion = new RegExp(escapeRegExp(inputValue), 'i');
    const regByStart = new RegExp(`^${escapeRegExp(inputValue)}`, 'i');
    /* eslint-disable */
    for (const option of selectList) {
      if (regByInclusion.test(option.label)) {
        if (regByStart.test(option.label)) {
          matchByStart.push(option);
        } else {
          matchByInclusion.push(option);
        }
      }
    }

    return [...matchByStart, ...matchByInclusion];
  }, [inputValue, selectList]);

  const slicedOptions = useMemo(
    () => filteredSelectList.slice(0, MAX_DISPLAYED_OPTIONS),
    [filteredSelectList, selectedCityId]
  );

  return (
    <div className="react-select">
      <p className="text-base text-gray mb-0.5">
        {__('Номер склада Новой Почты')}
      </p>
      <Select
        options={slicedOptions}
        placeholder=""
        onChange={(e) => handleFormChange(e)}
        onInputChange={(value) => setInputValue(value)}
        styles={customStyles}
        value={selectValue}
        noOptionsMessage={() => __('No options...')}
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
