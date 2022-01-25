/* eslint-disable */
import React from 'react';
import _get from 'lodash.get';
import { object } from 'prop-types';
import { useEffect } from 'react';

const LiqPayWidgetForm = ({ liqPayData }) => {
  const { data, signature } = liqPayData;

  useEffect(() => {
    if (data && signature) {
      window.LiqPayCheckoutCallback = (function () {
        LiqPayCheckout.init({
          data: `${data}`,
          signature: `${signature}`,
          embedTo: '#liqpay_checkout',
          language: 'ru',
          mode: 'popup', // embed || popup
        });
      })();
    }
  }, [data, signature]);

  return <div id="liqpay_checkout"></div>;
};

LiqPayWidgetForm.propTypes = {
  liqPayData: object,
};
LiqPayWidgetForm.defaultProps = {
  liqPayData: {},
};

export default LiqPayWidgetForm;
