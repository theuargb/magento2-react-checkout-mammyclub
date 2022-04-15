import React from 'react';
import _get from 'lodash.get';

// import Button from '../../common/Button';
import TextInput from '../../common/Form/TextInput';
import { __ } from '../../../i18n';
import useLoginFormContext from '../hooks/useLoginFormContext';
// import useFormValidateThenSubmit from '../../../hook/useFormValidateThenSubmit';

function LoginForm() {
  const {
    fields,

    formikData,
    handleKeyDown,
    loginFormValues,
  } = useLoginFormContext();

  const customerWantsToSignIn = _get(loginFormValues, 'customerWantsToSignIn');

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

        {customerWantsToSignIn && (
          <div>
            <TextInput
              type="password"
              autoComplete="on"
              label={__('Password')}
              name={fields.password}
              formikData={formikData}
              onKeyDown={handleKeyDown}
              placeholder={__('Password')}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default LoginForm;
