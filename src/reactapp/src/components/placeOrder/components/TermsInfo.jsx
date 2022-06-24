import React from 'react';
import { __ } from '../../../i18n';
import { config } from '../../../config';

function TermsInfo() {
  return (
    <div className="pt-4">
      <p className="text-xs text-gray">
        {__('Filling out contact information')},
      </p>
      <p className="text-xs text-gray">
        {__('You agree with')}
        <a
          className="text-link"
          rel="noreferrer"
          target="_blank"
          href={`${config.baseUrl}/terms-of-use/`}
        >
          &nbsp;{__('terms of use')}
        </a>
      </p>
    </div>
  );
}

export default TermsInfo;
