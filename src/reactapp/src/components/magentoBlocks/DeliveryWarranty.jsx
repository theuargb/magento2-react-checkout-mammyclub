import React from 'react';
/* eslint-disable */
const DeliveryWarranty = () => {
  // fetch('https://mammyclub.perspective.net.ua/rest/V1/cmsBlock/call_to_us', {
  //   method: 'GET',
  //   headers: {
  //     Authorization: 'Bearer 6gn2y2np87chqd6zb7sjuphsluy3oq77',
  //     'Content-Type': "application/json",
  //   },
  // }).then((response) => console.log(response));

  const fakeResponse = {
    id: 11,
    identifier: 'pravyj-sajdbar-chekauta',
    title:
      '\u041f\u0440\u0430\u0432\u044b\u0439 \u0441\u0430\u0439\u0434\u0431\u0430\u0440 \u0447\u0435\u043a\u0430\u0443\u0442\u0430',
    page_layout: 'cms-full-width',
    meta_title: '',
    meta_keywords: '',
    meta_description: '',
    content_heading: '',
    content: '',
    creation_time: '2022-01-27 13:41:14',
    update_time: '2022-01-27 13:46:23',
    sort_order: '0',
    custom_theme: '',
    custom_root_template: '',
    active: true,
  };
  const htmlEl = fakeResponse.content;
  // console.log(htlmEl);
  return <div></div>;
};

export default DeliveryWarranty;
