import React, { useState } from 'react';
import { config } from '../../config';
import RootElement from '../../utils/rootElement';

/* eslint-disable */
const CheckoutRightSidebar = () => {
  const [htmlEl, setHtmlContent] = useState('');
  const storeCode = RootElement.getStoreCode();

  const params = {
    identifier: 'pravyj-sajdbar-chekauta',
    store: storeCode,
  };

  const query = Object.keys(params)
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    )
    .join('&');

  if (!htmlEl) {
    fetch(
      `${config.baseUrl}/rest/${storeCode}/V1/crmIntegration/checkout/renderCmsPage?${query}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer 6gn2y2np87chqd6zb7sjuphsluy3oq77',
        },
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then((data) => setHtmlContent(data.content));
      } else {
        throw new Error('Something went wrong');
      }
    });
  }

  return (
    <div className=" md:block" dangerouslySetInnerHTML={{ __html: htmlEl }} />
  );
};

export default React.memo(CheckoutRightSidebar);
