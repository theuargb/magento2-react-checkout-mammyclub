import React, { useState } from 'react';

const CheckoutRightSidebar = () => {
  const [htmlEl, setHtmlContent] = useState('');

  if (!htmlEl) {
    fetch(
      'https://mammyclub.perspective.net.ua/rest/V1/crmIntegration/checkout/renderCmsPage?pageId=11',
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
    <div
      className="hidden  md:block"
      dangerouslySetInnerHTML={{ __html: htmlEl }}
    />
  );
};

export default React.memo(CheckoutRightSidebar);
