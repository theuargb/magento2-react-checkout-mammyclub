import React, { useState } from 'react';
import _get from 'lodash.get';
import { bool, string, func, shape } from 'prop-types';
import InputMask from 'react-input-mask';

// import { ErrorMessage, Field } from 'formik';
import { Field } from 'formik';

import { _replace } from '../../../utils';
import { formikDataShape } from '../../../utils/propTypes';
import { __ } from '../../../i18n';

function TextInputPhoneMask({
  id,
  name,
  type,
  label,
  width,
  helpText,
  required,
  isHidden,
  className,
  formikData,
  placeholder,
  actions,
  ...rest
}) {
  const {
    setFieldValue,
    formSectionId,
    setFieldTouched,
    formSectionErrors,
    formSectionValues,
    formSectionTouched,
  } = formikData;
  const inputId = id || name;
  const relativeFieldName = _replace(name, formSectionId).replace('.', '');
  const hasFieldError = !!_get(formSectionErrors, relativeFieldName);
  const value = _get(formSectionValues, relativeFieldName, '') || '';
  const hasFieldTouched = !!_get(formSectionTouched, relativeFieldName);
  const { onBlur } = rest;
  const [fieldInFocus, setFocusState] = useState(false);
  const hasError = hasFieldError && hasFieldTouched && !fieldInFocus;

  const handleFieldBlur = () => {
    setFocusState(false);
    onBlur();
  };

  return (
    <div className={`mt-4 form-control ${isHidden ? 'hidden' : ''}`}>
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={inputId} className="mb-0.5 text-base text-gray">
            {label}
            {required && <sup className="text-red-500"> *</sup>}
          </label>
        )}
        <div
          className={`feedback text-sm md:text-xs text-right ${
            hasError ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {hasError && (
            <div className="h-5 w-5">
              <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <title>background</title>
                  <rect
                    fill="none"
                    id="canvas_background"
                    height="19"
                    width="22"
                    y="-1"
                    x="-1"
                  />
                </g>
                <g>
                  <title>{__('Invalid value')}</title>
                  <g
                    stroke="null"
                    transform="scale(2.3038599491119385) translate(-79.98338317871094,-10.48225212097168) "
                    id="svg_1"
                  >
                    <path
                      stroke="null"
                      id="white_bg"
                      fill="#FFFFFF"
                      d="m84.21998,11.73617l2.98316,5.17837l-5.91023,0.01984l2.92707,-5.19821z"
                    />
                    <path
                      stroke="null"
                      id="foo"
                      fill="#ea0000"
                      d="m84.23771,10.48313c-0.14583,-0.00975 -0.2949,0.06151 -0.38829,0.18949l-3.8446,6.68391c-0.02599,0.10102 -0.02697,0.16534 -0.00384,0.26043c0.02213,0.09093 0.10861,0.18472 0.19127,0.20735l8.00654,0.00248c0.05006,-0.0094 0.11908,-0.03377 0.15292,-0.05407c0.12335,-0.07399 0.20674,-0.27098 0.11936,-0.42066l-3.89206,-6.66704c-0.05685,-0.09739 -0.17147,-0.16757 -0.279,-0.19247c-0.02053,-0.00475 -0.04149,-0.00803 -0.06232,-0.00943zm-0.01774,1.25305l2.98316,5.17837l-5.91023,0.01984l2.92707,-5.19821z"
                    />
                    <path
                      stroke="null"
                      fill="black"
                      d="m84.11361,16.57751c-0.13498,-0.06692 -0.23777,-0.22784 -0.23777,-0.37222c0,-0.26882 0.27135,-0.47132 0.52808,-0.39409c0.1732,0.0521 0.29091,0.2139 0.28947,0.39788c-0.00123,0.15628 -0.06657,0.2714 -0.19994,0.35229c-0.10209,0.06191 -0.27289,0.06917 -0.37984,0.01614zm0.03068,-1.06149c-0.01687,-0.0096 -0.05661,-0.04302 -0.0883,-0.07427c-0.11073,-0.10919 -0.1106,-0.10822 -0.18278,-1.2765c-0.06416,-1.03851 -0.0647,-1.05465 -0.03716,-1.12924c0.06194,-0.16784 0.19995,-0.24133 0.42976,-0.22885c0.14607,0.00793 0.25857,0.06104 0.33169,0.15658c0.06246,0.08161 0.07604,0.12774 0.07598,0.25811c-0.00006,0.14167 -0.08749,1.87904 -0.09991,1.98551c-0.01627,0.13944 -0.09492,0.2526 -0.21018,0.30243c-0.06587,0.02847 -0.17456,0.03157 -0.21909,0.00623z"
                      id="svg_2"
                    />
                  </g>
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
      <Field
        name={name}
        value={value}
        type={type || 'tel'}
        placeholder={placeholder}
        render={({ field }) => (
          <InputMask
            {...field}
            id={inputId}
            className={`form-input ${
              hasError ? 'border-dashed border-red-500' : ''
            } ${className} ${width || 'w-full'}`}
            {...rest}
            mask="+389(99)999-99-99"
            type="tel"
            onChange={(event) => {
              const newValue = event.target.value;
              setFieldTouched(name, newValue);
              setFieldValue(name, newValue);
              actions.saveAddress();
              setFocusState(true);
              if (newValue !== '+380(__)___-__-__') {
                event.target.classList.remove(
                  'border-dashed',
                  'border-red-500'
                );
              }
            }}
            onBlur={handleFieldBlur}
          />
        )}
      />
      <div className="text-xs ">{helpText}</div>
    </div>
  );
}

TextInputPhoneMask.propTypes = {
  id: string,
  type: string,
  label: string,
  width: string,
  required: bool,
  isHidden: bool,
  helpText: string,
  className: string,
  placeholder: string,
  name: string.isRequired,
  formikData: formikDataShape.isRequired,
  actions: shape({
    saveAddress: func,
  }),
};

TextInputPhoneMask.defaultProps = {
  id: '',
  label: '',
  width: '',
  helpText: '',
  type: 'text',
  className: '',
  required: false,
  placeholder: '',
  isHidden: false,
  actions: {
    saveAddress: () => {},
  },
};

export default TextInputPhoneMask;
