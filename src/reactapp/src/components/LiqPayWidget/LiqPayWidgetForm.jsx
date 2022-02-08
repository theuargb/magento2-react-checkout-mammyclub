/* eslint-disable */
import React, { useContext } from 'react';
import _get from 'lodash.get';
import CheckoutFormContext from '../../context/Form/CheckoutFormContext';
import { object, string } from 'prop-types';
import { useEffect } from 'react';

const LiqPayWidgetForm = ({ liqPayData, orderId }) => {
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
              console.log('liqPay success');
            }
            fetch(
              `https://mammyclub.perspective.net.ua/rest/V1/liqpay/getRedirectUrl?orderId=${orderId}`,
              {
                method: 'GET',
                headers: {
                  Authorization: 'Bearer 6gn2y2np87chqd6zb7sjuphsluy3oq77',
                },
              }
              // ).then((response) => location.replace(response));
            )
              .then((response) => response.json())
              .then((data) => location.replace(data));
            console.log('liqPay callback');
          })
          .on('liqpay.ready', function (data) {
            console.log('liqPay ready');
          })
          .on('liqpay.close', function (data) {
            console.log('liqPay close', data);
          });
      })();
    }
  }, [data, signature]);

  return <div id="liqpay_checkout"></div>;
};

LiqPayWidgetForm.propTypes = {
  liqPayData: object,
  orderId: string,
};
LiqPayWidgetForm.defaultProps = {
  liqPayData: {},
  orderId: '',
};

export default LiqPayWidgetForm;
