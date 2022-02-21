import React from 'react';
import { __ } from '../../../i18n';
import { config } from '../../../config';

function TermsInfo() {
  return (
    <div className="pt-4">
      <p className="text-xs text-gray">
        {__('Заполняя контактную информацию')},
      </p>
      <p className="text-xs text-gray">
        {__('Вы соглашаетесь с')}
        <a className="text-link" href={`${config.baseUrl}/terms-of-use/`}>
          &nbsp;{__('пользовательским соглашением')}
        </a>
      </p>
    </div>
  );
}

export default TermsInfo;
