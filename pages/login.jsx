import React from 'react';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
};

const Login = () => {
  return (
    <FacebookLogin
      appId="2931610017126226"
      autoLoad
      fields="name,email,picture"
      scope="pages_manage_engagement"
      callback={responseFacebook}
    />
  );
};

export default Login;
