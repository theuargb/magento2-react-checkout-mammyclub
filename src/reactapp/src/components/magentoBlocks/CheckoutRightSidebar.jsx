import React, { useState } from 'react';

const CheckoutRightSidebar = () => {
  const [htmlEl, setHtmlEl] = useState('');

  const createHtmlEl = (data) => {
    const htmlElFromResponse = data.content;
    setHtmlEl(htmlElFromResponse);
  };

  fetch(
    'https://mammyclub.perspective.net.ua/rest/V1/crmIntegration/checkout/renderCmsPage?pageId=11',
    {
      method: 'GET',
      headers: {
        Authorization: 'Bearer 6gn2y2np87chqd6zb7sjuphsluy3oq77',
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => createHtmlEl(response));

  return <div dangerouslySetInnerHTML={{ __html: htmlEl }} />;
};

export default CheckoutRightSidebar;
