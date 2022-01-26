/* eslint-disable */
import React, { useContext } from 'react';
import _get from 'lodash.get';
import CheckoutFormContext from '../../context/Form/CheckoutFormContext';
import { object } from 'prop-types';
import { useEffect } from 'react';

const LiqPayWidgetForm = ({ liqPayData }) => {
  const { data, signature } = liqPayData;
  const { setLiqPayStatus } = useContext(CheckoutFormContext);

  useEffect(() => {
    if (data && signature) {
      window.LiqPayCheckoutCallback = (function () {
        LiqPayCheckout.init({
          data: `${data}`,
          signature: `${signature}`,
          embedTo: '#liqpay_checkout',
          language: 'ru',
          mode: 'popup', // embed || popup
        })
          .on('liqpay.callback', function (data) {
            if (data.status === 'success') {
              setLiqPayStatus(true);
            }
            // console.log(data.status);
            // console.log(data);
          })
          .on('liqpay.ready', function (data) {
            console.log('ready', data);
          })
          .on('liqpay.close', function (data) {
            console.log('close', data);
          });
        console.log(LiqPayCheckout);
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
