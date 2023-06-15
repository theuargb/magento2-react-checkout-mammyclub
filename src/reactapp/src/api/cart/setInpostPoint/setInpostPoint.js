import { config } from '../../../config';
import env from '../../../utils/env';
import RootElement from '../../../utils/rootElement';
import modifier from './modifier';

export default async function setInpostPoint(widgetResponseData, cod = false) {
  const baseUrl = config?.baseUrl;
  const saveSelectedAddressUrl = '/inpost/select/index';

  const data = {
    point_name: widgetResponseData?.name || 'WAW171M',
    type: cod ? 0 : 1,
  };
  const dataString = `point_name=${data?.point_name}&type=${data?.type}`;

  const storeCode = env.storeCode || RootElement.getStoreCode();

  return modifier(
    await fetch(`${baseUrl}${saveSelectedAddressUrl}`, {
      headers: {
        accept: 'application/json, text/javascript, */*; q=0.01',
        Store: storeCode,
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
      },
      body: `${dataString}`,
      method: 'POST',
      mode: 'cors',
    })
      .then((response) => response.json())
      .catch((exception) => {
        console.error(exception);
        throw exception;
      })
  );
}
