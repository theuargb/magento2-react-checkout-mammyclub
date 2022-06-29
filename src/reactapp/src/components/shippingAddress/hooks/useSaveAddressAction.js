import { __ } from '../../../i18n';
import { _emptyFunc, _makePromise } from '../../../utils';
import useShippingAddressAppContext from './useShippingAddressAppContext';
import useShippingAddressCartContext from './useShippingAddressCartContext';

export default function useSaveAddressAction() {
  const { setMessage, setErrorMessage } = useShippingAddressAppContext();
  const { setCartAddresses } = useShippingAddressCartContext();
  const { setAddressNeedToUpdate } = useShippingAddressCartContext();

  return async (values) => {
    setMessage(false);

    try {
      let updateShippingAddress = _emptyFunc();
      updateShippingAddress = _makePromise(setCartAddresses, values);
      await updateShippingAddress();
      setAddressNeedToUpdate(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(__('Shipping address update failed. Please try again'));
      setAddressNeedToUpdate(false);
    }
  };
}
