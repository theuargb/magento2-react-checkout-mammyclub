import React from 'react';
// import Card from '../common/Card';
import ShippingMethodList from './components/ShippingMethodList';
import NoShippingMethodInfoBox from './components/NoShippingMethodInfoBox';
import ShippingMethodFormManager from './components/ShippingMethodFormManager';
import { formikDataShape } from '../../utils/propTypes';
// import useShippingMethodCartContext from './hooks/useShippingMethodCartContext';

const ShippingMethodMemorized = React.memo(({ formikData }) => (
  // const { methodsAvailable } = useShippingMethodCartContext();
  <ShippingMethodFormManager formikData={formikData}>
    {/* <Card classes={methodsAvailable ? '' : 'opacity-75'}> */}
    <NoShippingMethodInfoBox />
    <ShippingMethodList />
    {/* </Card> */}
  </ShippingMethodFormManager>
));

ShippingMethodMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default ShippingMethodMemorized;
