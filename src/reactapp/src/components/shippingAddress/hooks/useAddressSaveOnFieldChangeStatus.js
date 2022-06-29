import { useRef } from 'react';
import useSaveAddressAction from './useSaveAddressAction';

export default function useAddressSaveOnFieldChangeStatus() {
  const isAddressFieldInFocus = useRef();

  const setAddress = useSaveAddressAction();

  return (addressToSave, status) => {
    if (status === 'blur') {
      isAddressFieldInFocus.current = false;
      setTimeout(() => {
        if (!isAddressFieldInFocus.current) {
          setAddress(addressToSave);
        }
      }, 0);
    }
    if (status === 'focus') {
      isAddressFieldInFocus.current = true;
    }
  };
}
