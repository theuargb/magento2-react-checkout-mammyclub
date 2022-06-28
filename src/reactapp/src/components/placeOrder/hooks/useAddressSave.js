import _get from 'lodash.get';
/* eslint-disable */
import { SHIPPING_METHOD } from '../../../config';
import { __ } from '../../../i18n';
import LocalStorage from '../../../utils/localStorage';
import { _emptyFunc, _makePromise } from '../../../utils';
import usePlaceOrderAppContext from './usePlaceOrderAppContext';
import usePlaceOrderCartContext from './usePlaceOrderCartContext';
import { ShippingMethodRequiredException } from '../utility';

export default function useAddressSave() {
  const { setErrorMessage } = usePlaceOrderAppContext();
  const { setShippingMethod, setCartAddresses } =
    usePlaceOrderCartContext();

  return async (values) => {
    try {
      let needToUpdateShippingMethod = false;
      let setCartShippingAddressPromise = _emptyFunc();
      const isBillingSame = LocalStorage.getBillingSameAsShippingInfo();
      setCartShippingAddressPromise = _makePromise(
        setCartAddresses,
        values,
        isBillingSame
      );

      // cannot perform these two operations together; because they are trying to
      // write into same tables which will cause errors
      // await setCartBillingAddressPromise();
      const cartInfo = await setCartShippingAddressPromise();

      // if there is shipping address update, then shipping method data will be reset.
      // so we need to update the shipping method again;
      // if the selected shipping method is no longer available, then stop place order process.
      if (needToUpdateShippingMethod) {
        const selectedShippingMethod = _get(values, SHIPPING_METHOD);
        const { carrierCode, methodCode } = selectedShippingMethod;
        const newShippingMethods = _get(cartInfo, 'shipping_methods');

        if (!_get(newShippingMethods, `${carrierCode}__${methodCode}`)) {
          // this means selected shipping method is not available
          throw new ShippingMethodRequiredException(
            'Selected shipping method is not available due to the shipping address change. Please select from the available methods.'
          );
        }

        if (carrierCode && methodCode) {
          await setShippingMethod(selectedShippingMethod);
        }
      }

      LocalStorage.saveCustomerAddressInfo('', isBillingSame);
    } catch (error) {
      console.error(error);
      if (error instanceof ShippingMethodRequiredException) {
        setErrorMessage(__(error.message));
      } else {
        setErrorMessage(__('Address update failed. Please try again.'));
      }
    }
  };
}
