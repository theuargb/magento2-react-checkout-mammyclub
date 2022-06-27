import React, { useState } from 'react';
import { string } from 'prop-types';
import { fetchCmsPageRequest } from '../../api';

const CmsContent = ({ CmsIdentifier }) => {
  const [htmlEl, setHtmlContent] = useState('');

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  };

  const fetchPage = async () => {
    const data = await fetchCmsPageRequest(CmsIdentifier);
    const decodedHtml = htmlDecode(data.content);
    setHtmlContent(decodedHtml);
  };

  if (!htmlEl) {
    fetchPage();
  }

  return (
    <div className="md:block" dangerouslySetInnerHTML={{ __html: htmlEl }} />
  );
};

CmsContent.propTypes = {
  CmsIdentifier: string.isRequired,
};
export default React.memo(CmsContent);
