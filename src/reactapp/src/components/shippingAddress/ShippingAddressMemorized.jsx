import React from 'react';
import { node } from 'prop-types';
import { __ } from '../../i18n';
import Card from '../common/Card';
import ShippingAddressForm from './components/ShippingAddressForm';
import ShippingAddressFormikProvider from './components/ShippingAddressFormikProvider';
import { formikDataShape } from '../../utils/propTypes';

const ShippingAddressMemorized = React.memo(({ formikData, children }) => (
  <ShippingAddressFormikProvider formikData={formikData}>
    <Card>
      <h3 className="mb-6 text-primary-darker">{__('Shipping address')}</h3>
      <ShippingAddressForm>{children}</ShippingAddressForm>
    </Card>
  </ShippingAddressFormikProvider>
));

ShippingAddressMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
  children: node.isRequired,
};

export default ShippingAddressMemorized;
