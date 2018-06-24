import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login, socialLogin } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const LoginForm = ({ login, handleSubmit, error, socialLogin }) => {
  return (
    <Form size="large" onSubmit={handleSubmit(login)}>
      <Segment>
        {error && (
          <Fragment>
            <Label basic color="red">
              {error}
            </Label>
            <br />
            <br />
          </Fragment>
        )}
        <Field
          name="email"
          type="text"
          component={TextInput}
          placeholder="Email Address"
        />
        <Field
          name="password"
          type="password"
          component={TextInput}
          placeholder="password"
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
        <Divider horizontal>Or</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

const mapDispatchToProps = {
  login,
  socialLogin
};

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    form: 'loginForm'
  })(LoginForm)
);
