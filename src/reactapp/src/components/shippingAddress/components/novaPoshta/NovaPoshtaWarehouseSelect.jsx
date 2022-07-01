import React, { useState, useEffect, useRef } from 'react';
import { List, CellMeasurerCache, CellMeasurer } from 'react-virtualized';
import { string, object } from 'prop-types';
import Select, { components, createFilter } from 'react-select';
import { formikDataShape } from '../../../../utils/propTypes';
import { __ } from '../../../../i18n';
import { config } from '../../../../config';

const options = [
  { value: 'void', label: __('Type warehouse number or address...') },
];

function NovaPoshtaWarehouseSelect({
  selectedCityId,
  name,
  formikData,
  customStyles,
  postRefField,
  ...rest
}) {
  const [selectList, setSelectList] = useState(options);
  const { setFieldValue, setFieldTouched } = formikData;
  const [selectValue, setSelectValue] = useState('void');
  const [isLoading, setIsLoading] = useState(false);
  const selectListEl = useRef(null);

  const { onBlur, onFocus } = rest;

  const handleFormChange = (e) => {
    const newValue = e.label;
    const postRef = e.ref;
    setFieldTouched(name, newValue);
    setFieldValue(name, newValue);
    setFieldValue(postRefField, postRef);
    setSelectValue(e);
  };

  useEffect(() => {
    setSelectValue('void');
    setIsLoading(true);
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
                ref: postCode.ref,
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
          setIsLoading(false);
        } else {
          setSelectList(options);
          setIsLoading(false);
        }
      });
  }, [selectedCityId]);

  /*eslint-disable*/
  const cache = new CellMeasurerCache({
    fixedWidth: true,
    minHeight: 25,
  });

  const CustomOption = ({ children, ...props }) => {
    const { onMouseMove, onMouseOver, ...rest } = props.innerProps;
    const newProps = { ...props, innerProps: rest };
    return <components.Option {...newProps}>{children}</components.Option>;
  };

  const CustomMenuList = (props) => {
    const rows = props.children;
    const rowRenderer = ({ key, index, style, parent, ...rest }) => {
      return (
        <CellMeasurer
          cache={cache}
          columnIndex={0}
          key={key}
          rowIndex={index}
          parent={parent}
        >
          {({ measure, registerChild }) => (
            <div ref={registerChild} key={key} style={style}>
              <div onLoad={measure}>{rows[index]}</div>
            </div>
          )}
        </CellMeasurer>
      );
    };

    useEffect(() => {
      if (selectListEl) {
        cache.clearAll();
        selectListEl.current.recomputeRowHeights();
      }
    }, []);
    
    if(props.children.length){
      return (
        <List
          ref={selectListEl}
          style={{ width: '100%' }}
          width={1000}
          height={300}
          rowHeight={cache.rowHeight}
          rowCount={rows.length || 0}
          rowRenderer={rowRenderer}
        />
      );
    }else{
      return(
        <p className="text-sm py-2 px-3">{ __('No options')}</p>
      )
    }
    
  };

  const recomputeListStyles = () => {
    if (selectListEl) {
      cache.clearAll();
      selectListEl.current.recomputeRowHeights();
    }
  }

  return (
    <div className="react-select">
      <p className="text-base text-gray mb-0.5">
        {__('Nova Poshta warehouse number')}
      </p>
      <Select
        options={selectList}
        placeholder=""
        onChange={(e) => handleFormChange(e)}
        onInputChange={() => recomputeListStyles()}
        isLoading={isLoading}
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
        noOptionsMessage={() => __('No options')}
        components={{
          Option: CustomOption,
          MenuList: CustomMenuList,
        }}
        filterOption={createFilter({ ignoreAccents: false })}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
}

NovaPoshtaWarehouseSelect.propTypes = {
  selectedCityId: string.isRequired,
  formikData: formikDataShape.isRequired,
  name: string.isRequired,
  customStyles: object,
  postRefField: string,
};

NovaPoshtaWarehouseSelect.defaultProps = {
  customStyles: {},
  postRefField: 'shipping_address.warehouse_ref'
};

export default NovaPoshtaWarehouseSelect;
