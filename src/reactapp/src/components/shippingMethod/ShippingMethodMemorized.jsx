import React from 'react';
import ShippingMethodList from './components/ShippingMethodList';
import NoShippingMethodInfoBox from './components/NoShippingMethodInfoBox';
import ShippingMethodFormManager from './components/ShippingMethodFormManager';
import { formikDataShape } from '../../utils/propTypes';

const ShippingMethodMemorized = React.memo(({ formikData }) => (
  <ShippingMethodFormManager formikData={formikData}>
    <NoShippingMethodInfoBox />
    <ShippingMethodList />
  </ShippingMethodFormManager>
));

ShippingMethodMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default ShippingMethodMemorized;
