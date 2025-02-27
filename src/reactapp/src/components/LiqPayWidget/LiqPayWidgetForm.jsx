/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import { object, string } from 'prop-types';
import CheckoutFormContext from '../../context/Form/CheckoutFormContext';
import { config } from '../../config';
import { pushCustomerAccToBrowserHistory } from '../../utils/frontRedirects';

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
            }
            fetch(
              `${config.baseUrl}/rest/V1/liqpay/getRedirectUrl?orderId=${orderId}`,
              {
                method: 'GET',
                headers: {
                  Authorization: 'Bearer 6gn2y2np87chqd6zb7sjuphsluy3oq77',
                },
              }
            )
              .then((response) => response.json())
              .then((data) =>
                setTimeout(() => {
                  pushCustomerAccToBrowserHistory();
                  window.location.replace.assign(data);
                }, 10000)
              );
          })
          .on('liqpay.ready', function (data) {})
          .on('liqpay.close', function (data) {
            pushCustomerAccToBrowserHistory();
            window.location.assign(config.successPageRedirectUrl);
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
