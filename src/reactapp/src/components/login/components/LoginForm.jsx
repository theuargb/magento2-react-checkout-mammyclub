import React from 'react';

import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import useLoginFormContext from '../hooks/useLoginFormContext';
// import useLoginAppContext from '../hooks/useLoginAppContext';

function LoginForm() {
  const { fields, formikData, handleKeyDown } = useLoginFormContext();
  // const { isLoggedIn } = useLoginAppContext();

  return (
    <>
      <div>
        <TextInput
          type="email"
          label={__('Email')}
          name={fields.email}
          formikData={formikData}
          onKeyDown={handleKeyDown}
        />
        <p className="text-gray-extralighter text-base mt-1">
          {__('Here we will send all documents confirming the purchase')}
        </p>
      </div>
    </>
  );
}

export default LoginForm;
