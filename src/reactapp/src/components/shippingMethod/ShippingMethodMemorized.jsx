import React from 'react';
import { object } from 'prop-types';
import ShippingMethodList from './components/ShippingMethodList';
import NoShippingMethodInfoBox from './components/NoShippingMethodInfoBox';
import ShippingMethodFormManager from './components/ShippingMethodFormManager';
import { formikDataShape } from '../../utils/propTypes';

const ShippingMethodMemorized = React.memo(({ formikData, cmsHtmlContent }) => (
  <ShippingMethodFormManager formikData={formikData}>
    <NoShippingMethodInfoBox />
    <ShippingMethodList cmsHtmlContent={cmsHtmlContent} />
  </ShippingMethodFormManager>
));

ShippingMethodMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
  cmsHtmlContent: object,
};

ShippingMethodMemorized.defaultProps = {
  cmsHtmlContent: {},
};

export default ShippingMethodMemorized;
