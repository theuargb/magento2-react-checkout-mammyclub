/* eslint-disable */
import React, { useContext } from 'react';
import CheckoutFormContext from '../../context/Form/CheckoutFormContext';
import _get from 'lodash.get';
import LiqPayWidgetForm from './LiqPayWidgetForm';
import { useState } from 'react';

const LiqPayWidget = React.memo(({ orderId }) => {
  const { liqPayReadyToInit } = useContext(CheckoutFormContext);
  const [liqPayData, setLiqPayData] = useState({});
  const fetchLiqPayWidget = () => {
    fetch(
      `https://mammyclub.perspective.net.ua/rest/V1/liqpay/hydrateWidget?orderId=#${orderId}`
    )
      .then((response) => response.json())
      .then((data) => JSON.parse(data))
      .then((liqPayInitValues) =>
        setLiqPayData({
          data: liqPayInitValues.data,
          signature: liqPayInitValues.signature,
        })
      );
  };
  React.useEffect(() => {
    if (liqPayReadyToInit) {
      fetchLiqPayWidget();
    }
  }, [liqPayReadyToInit]);
  return <LiqPayWidgetForm liqPayData={liqPayData} />;
});

export default LiqPayWidget;
