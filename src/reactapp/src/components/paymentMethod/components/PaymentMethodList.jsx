import React, { useState } from 'react';
import _get from 'lodash.get';
import { object } from 'prop-types';
import Select from 'react-select';
import { __ } from '../../../i18n';

// import RadioInput from '../../common/Form/RadioInput';
// import { __ } from '../../../i18n';
// import { classNames, _objToArray } from '../../../utils';
import { _objToArray } from '../../../utils';
import usePaymentMethodCartContext from '../hooks/usePaymentMethodCartContext';
import usePaymentMethodFormContext from '../hooks/usePaymentMethodFormContext';
import InfoPopups from '../../InfoPopups/InfoPopups';

function PaymentMethodList({ methodRenderers }) {
  const { fields, submitHandler, formikData } = usePaymentMethodFormContext();
  // const { methodList, isVirtualCart, doCartContainShippingAddress } =
  //   usePaymentMethodCartContext();
  const { methodList } = usePaymentMethodCartContext();
  // const { paymentValues, setFieldValue, setFieldTouched } = formikData;
  const { setFieldValue, setFieldTouched } = formikData;
  // const paymentAvailable = isVirtualCart || doCartContainShippingAddress;
  const [isPaymentMethodChangeByUser, setPaymentMethodChangeByUser] =
    useState(false);

  const handlePaymentMethodSelection = async (event) => {
    const methodSelected = _get(methodList, `${event.value}.code`);

    if (!methodSelected) {
      return;
    }
    console.log(methodSelected);
    await setFieldValue(fields.code, methodSelected);

    setFieldTouched(fields.code, true);

    // don't need to save payment method in case the method opted has a custom
    // renderer. This is because custom payment renderers may have custom
    // functionalities associated with them. So if in case they want to perform
    // save payment operation upon selection, then they need to deal with it there.
    if (!methodRenderers[methodSelected]) {
      setPaymentMethodChangeByUser(true);

      await submitHandler(methodSelected);
    }
  };

  const customSelectStyles = {
    option: (provided) => ({
      ...provided,
      fontSize: '13px',
      lineHeight: '13px',
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
      padding: '0 4px',
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
  const methodListForSelect = [];
  _objToArray(methodList).forEach((method) => {
    const value = method.code;
    const label = method.title;
    methodListForSelect.push({ label, value });
  });

  /*  Сохранение первого доступного метода оплаты.
  Если пользователем не будет выбран метод оплаты, то останется первый доступный метод - ликпей */

  React.useEffect(() => {
    if (!isPaymentMethodChangeByUser) {
      submitHandler(methodListForSelect[0].value);
    }
  }, [isPaymentMethodChangeByUser]);
  /*  ========================================================================================  */

  return (
    <div className="react-select pt-4 pb-5 border-t-2 border-b-2 border-container-lightner">
      <p className="text-base text-gray mb-0.5">
        {__('Способ оплаты (обязательно)')}
        <sup className="text-red-500"> *</sup>
      </p>
      <Select
        options={methodListForSelect}
        defaultValue={{
          label: methodListForSelect[0].label,
          value: methodListForSelect[0].value,
        }}
        onChange={(event) => handlePaymentMethodSelection(event)}
        inputId="city"
        placeholder=""
        styles={customSelectStyles}
      />
      <InfoPopups
        positionStyles="absolute top-0 right-0 mt-4 mr-6"
        label={__('Оплата')}
        className="absolute top-0 right-0"
        linkToCMSBlock="https://mammyclub.perspective.net.ua/rest/V1/cmsBlock/call_to_us"
      />
    </div>
  );
}

PaymentMethodList.propTypes = {
  methodRenderers: object,
};

PaymentMethodList.defaultProps = {
  methodRenderers: {},
};

export default PaymentMethodList;
