import React from 'react';

import Card from '../common/Card';
import PaymentMethodList from './components/PaymentMethodList';
import NoPaymentMethodInfoBox from './components/NoPaymentMethodInfoBox';
import PaymentMethodFormManager from './components/PaymentMethodFormManager';
import { formikDataShape } from '../../utils/propTypes';
import customRenderers from '../../paymentMethods/customRenderers';
import usePaymentMethodCartContext from './hooks/usePaymentMethodCartContext';
import useAppContext from '../../hook/useAppContext';
// import LiqPayWidget from './components/LiqPayWidget';

const PaymentMethodMemorized = React.memo(({ formikData }) => {
  const { isPaymentAvailable } = usePaymentMethodCartContext();
  const { setPageLoader } = useAppContext();

  React.useEffect(() => {
    if (!isPaymentAvailable) {
      setPageLoader(true);
    } else {
      setPageLoader(false);
    }
  }, [isPaymentAvailable]);

  return (
    <PaymentMethodFormManager formikData={formikData}>
      <Card classes={isPaymentAvailable ? '' : 'opacity-75'}>
        {isPaymentAvailable ? (
          <PaymentMethodList methodRenderers={customRenderers} />
        ) : (
          <NoPaymentMethodInfoBox />
        )}
        {/* <LiqPayWidget /> */}
      </Card>
    </PaymentMethodFormManager>
  );
});

PaymentMethodMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default PaymentMethodMemorized;
