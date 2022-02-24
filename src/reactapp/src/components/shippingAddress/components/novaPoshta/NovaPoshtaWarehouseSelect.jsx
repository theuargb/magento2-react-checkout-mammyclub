import React, { useState, useEffect } from 'react';
import { string, object } from 'prop-types';
import Select, { components } from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';
import { config } from '../../../../config';

const options = [
  { value: 'void', label: __('Введите номер или адрес отделения...') },
];

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
      `${config.baseUrl}/rest/V1/novaposhta/warehouses?cityRef=${selectedCityId}`
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

  /*eslint-disable*/

  const CustomOption = ({ children, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return <components.Option {...newProps}>{children}</components.Option>;
  };

  return (
    <div className="react-select">
      <p className="text-base text-gray mb-0.5">
        {__('Номер склада Новой Почты')}
      </p>
      <Select
        options={selectList}
        placeholder=""
        onChange={(e) => handleFormChange(e)}
        styles={{
          ...customStyles,
          option: (provided, { isDisabled }) => ({
            ...provided,
            fontSize: '13px',
            lineHeight: '13px',
            color: isDisabled ? '#000' : '',
            '&:hover': {
              background: 'rgb(128,191,255, 0.3)',
            },
          }),
        }}
        value={selectValue}
        noOptionsMessage={() => __('No options...')}
        components={{ Option: CustomOption }}
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
