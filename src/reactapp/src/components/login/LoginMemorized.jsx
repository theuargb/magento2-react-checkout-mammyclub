import React from 'react';

import LoginForm from './components/LoginForm';
import LoginFormManager from './components/LoginFormManager';
import { formikDataShape } from '../../utils/propTypes';

const LoginMemorized = React.memo(({ formikData }) => (
  <LoginFormManager formikData={formikData}>
    <LoginForm />
  </LoginFormManager>
));

LoginMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default LoginMemorized;
