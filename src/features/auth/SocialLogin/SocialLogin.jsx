import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SocialLogin = ({ socialLogin }) => {
  return (
    <div>
      <Button
        fluid
        type="button"
        color="facebook"
        style={{ marginBottom: '10px' }}
        onClick={() => socialLogin('facebook')}
      >
        <Icon name="facebook" /> Login with Facebook
      </Button>

      <Button
        fluid
        type="button"
        color="google plus"
        onClick={() => socialLogin('google')}
      >
        <Icon name="google plus" />
        Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
