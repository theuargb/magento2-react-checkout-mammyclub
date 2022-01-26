import React from 'react';
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

function PaymentMethodList({ methodRenderers }) {
  const { fields, submitHandler, formikData } = usePaymentMethodFormContext();
  // const { methodList, isVirtualCart, doCartContainShippingAddress } =
  //   usePaymentMethodCartContext();
  const { methodList } = usePaymentMethodCartContext();
  // const { paymentValues, setFieldValue, setFieldTouched } = formikData;
  const { setFieldValue, setFieldTouched } = formikData;

  // const paymentAvailable = isVirtualCart || doCartContainShippingAddress;

  const handlePaymentMethodSelection = async (event) => {
    const methodSelected = _get(methodList, `${event.value}.code`);

    if (!methodSelected) {
      return;
    }

    await setFieldValue(fields.code, methodSelected);

    setFieldTouched(fields.code, true);
    // don't need to save payment method in case the method opted has a custom
    // renderer. This is because custom payment renderers may have custom
    // functionalities associated with them. So if in case they want to perform
    // save payment operation upon selection, then they need to deal with it there.
    if (!methodRenderers[methodSelected]) {
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
      height: '26px',
      minHeight: 'none',
      boxShadow: '0px 0px 4px 0px #ccc inset',
    }),
    container: (provided) => ({
      ...provided,
      height: '24px',
      minHeight: 'none',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '24px',
      minHeight: 'none',
      borderLeft: 'none',
      padding: '0',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '24px',
      minHeight: 'none',
      padding: '0 5px',
    }),
    input: (provided) => ({
      ...provided,
      height: '20px',
      fontSize: '13px',
      lineHeight: '13px',
      outline: 'none',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return {
        ...provided,
        opacity,
        transition,
        height: '13px',
        fontSize: '13px',
        lineHeight: '13px',
        alighSelf: 'center',
      };
    },
  };

  const methodListForSelect = [];
  _objToArray(methodList).forEach((method) => {
    const value = method.code;
    const label = method.title;
    methodListForSelect.push({ label, value });
  });

  return (
    /*  <div
      title={
        !paymentAvailable ? __('Please provide a shipping address first.') : ''
      }
      className={classNames(
        !paymentAvailable ? 'cursor-not-allowed opacity-40' : '',
        'py-4'
      )}
    >
       <ul>
        {_objToArray(methodList).map((method) => {
          const MethodRenderer = methodRenderers[method.code];
          return (
            <>
              <li key={method.code}>
                {MethodRenderer ? (
                  <MethodRenderer
                    method={method}
                    selected={paymentValues}
                    actions={{ change: handlePaymentMethodSelection }}
                  />
                ) : (
                  <RadioInput
                    value={method.code}
                    label={method.title}
                    name="paymentMethod"
                    disabled={!paymentAvailable}
                    onChange={handlePaymentMethodSelection}
                    checked={method.code === paymentValues.code}
                  />
                )}
              </li>
            </>
          );
        })}
      </ul>   */
    <div className="react-select pt-4 pb-5 border-t-2 border-b-2 border-container-lightner">
      <p className="text-base text-gray mb-0.5">
        {__('Способ оплаты (обязательно)')}
      </p>
      <Select
        options={methodListForSelect}
        onChange={(event) => handlePaymentMethodSelection(event)}
        inputId="city"
        placeholder=""
        styles={customSelectStyles}
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
