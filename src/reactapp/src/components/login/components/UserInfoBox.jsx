import React from 'react';
import _get from 'lodash.get';


import useLoginAppContext from '../hooks/useLoginAppContext';
import useLoginFormContext from '../hooks/useLoginFormContext';

function UserInfoBox() {
  const { isLoggedIn, customer } = useLoginAppContext();
  const { loginFormValues } = useLoginFormContext();
  const customerEmail = _get(customer, 'email', '');

  return (
    <>
      <div className="py-2">
        <span className="flex flex-wrap items-center justify-center">
          {isLoggedIn && (
            <>
              <span>{_get(customer, 'fullName')}</span>
              {customerEmail && <span>{`(${customerEmail})`}</span>}
            </>
          )}
          {!isLoggedIn && _get(loginFormValues, 'email')}
        </span>
      </div>
    </>
  );
}

export default UserInfoBox;
