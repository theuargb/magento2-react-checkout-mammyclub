import React from 'react';

const CheckoutRightSidebar = () => {
  let htmlEl = '';

  const setHtmlContent = (data) => {
    htmlEl = data.content;
    console.log('fetchSuccess');
  };
  if (!htmlEl) {
    fetch(
      'https://mammyclub.perspective.net.ua/rest/V1/crmIntegration/checkout/renderCmsPage?pageId=11',
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer 6gn2y2np87chqd6zb7sjuphsluy3oq77',
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if (response.ok) {
        setHtmlContent(response);
      } else {
        htmlEl = 'Не удалось загрузить данные';
        throw new Error('Something went wrong');
      }
    });
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlEl }} />;
};

export default CheckoutRightSidebar;
