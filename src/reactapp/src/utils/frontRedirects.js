import { config } from '../config';
import { __ } from '../i18n';

export const pushCustomerAccToBrowserHistory = () => {
  window.history.pushState(
    {},
    __('Customer Account'),
    config?.customerAccountUrlKey
  );
};
