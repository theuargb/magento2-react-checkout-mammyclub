import React from 'react';
import { __ } from '../../i18n';

const ContactUs = () => (
  <div className="bg-green grid grid-cols-2 gap-x-5 p-2.5 text-white mt-6">
    <div className="text-lbase">
      {__(
        'Если у Вас возникли вопросы, Вы можете обратиться к нам по телефону:'
      )}
    </div>
    <div className="text-right">
      <p className="text-lg+ font-bold">{__('(067) 622-45-85')}</p>
      <p className="text-lbase">{__('Время работы: пн-пт 10:00 - 18:00')}</p>
      <p className="text-xs leading-4">
        <a href=".">{__('Отправить e-mail')}</a>
        {__('можно в любое время')}
      </p>
    </div>
  </div>
);

export default ContactUs;
