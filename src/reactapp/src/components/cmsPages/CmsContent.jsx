import React, { useState } from 'react';
import { object } from 'prop-types';

const CmsContent = ({ cmsHtmlContent }) => {
  const [htmlEl, setHtmlContent] = useState(null);
  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    return doc.documentElement.textContent;
  };

  if (!htmlEl && cmsHtmlContent?.content) {
    const decodedHtml = htmlDecode(cmsHtmlContent?.content);
    setHtmlContent(decodedHtml);
  }

  return <div dangerouslySetInnerHTML={{ __html: htmlEl }} />;
};

CmsContent.propTypes = {
  cmsHtmlContent: object,
};
CmsContent.defaultProps = {
  cmsHtmlContent: {},
};
export default React.memo(CmsContent);
