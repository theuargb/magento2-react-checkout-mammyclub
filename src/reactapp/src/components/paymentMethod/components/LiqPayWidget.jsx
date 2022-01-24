/* eslint-disable */
import React from 'react';

function LiqPayWidget() {
  window.LiqPayCheckoutCallback = function () {
    LiqPayCheckout.init({
      data:"eyJwdWJsaWNfa2V5Ijoic2FuZGJveF9pNjkwODMyMjkwNjEiLCJ2ZXJzaW9uIjoiMyIsImFjdGlvbiI6InBheSIsImFtb3VudCI6IiIsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiJNYW1teSBDbHViIE9yZGVyICMiLCJvcmRlcl9pZCI6IiJ9",
      signature: '33Ey5e9U+hrVD+tWTI9onGxk2JM=',
      embedTo: '#liqpay_checkout',
      language: 'ru',
      mode: 'embed', // embed || popup
    });
  };

  return <div id="liqpay_checkout"></div>;
}

export default LiqPayWidget;
