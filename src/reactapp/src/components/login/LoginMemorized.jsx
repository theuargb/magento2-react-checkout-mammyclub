import React from 'react';

import LoginForm from './components/LoginForm';
// import UserInfoBox from './components/UserInfoBox';
import LoginFormManager from './components/LoginFormManager';
import { formikDataShape } from '../../utils/propTypes';
// import LoginInfoBox from './components/LoginInfoBox';

const LoginMemorized = React.memo(({ formikData }) => (
  <LoginFormManager formikData={formikData}>
    {/* <LoginInfoBox /> */}
    <LoginForm />
    {/* <UserInfoBox /> */}
  </LoginFormManager>
));

LoginMemorized.propTypes = {
  formikData: formikDataShape.isRequired,
};

export default LoginMemorized;
