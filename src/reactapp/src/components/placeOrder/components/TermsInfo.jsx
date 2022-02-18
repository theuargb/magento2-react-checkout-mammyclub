import React from 'react';
import { __ } from '../../../i18n';

function TermsInfo() {
  return (
    <div className="pt-4">
      <p className="text-xs text-gray">
        {__('Заполняя контактную информацию')},
      </p>
      <p className="text-xs text-gray">
        {__('Вы соглашаетесь с')}
        <a
          className="text-link"
          href="https://mammyclub.com/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5-%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5"
        >
          &nbsp;{__('пользовательским соглашением')}
        </a>
      </p>
    </div>
  );
}

export default TermsInfo;
