import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { combineValidators, isRequired } from 'revalidate';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { registerUser } from '../authActions';
import SocialLogin from '../SocialLogin/SocialLogin';

const RegisterForm = ({
  handleSubmit,
  registerUser,
  error,
  invalid,
  submitting
}) => {
  return (
    <div>
      <Form size="large" onSubmit={handleSubmit(registerUser)}>
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
            name="displayName"
            type="text"
            component={TextInput}
            placeholder="Known As"
          />
          <Field
            name="email"
            type="text"
            component={TextInput}
            placeholder="Email"
          />
          <Field
            name="password"
            type="password"
            component={TextInput}
            placeholder="Password"
          />
          <Button
            fluid
            size="large"
            color="teal"
            disabled={invalid || submitting}
          >
            Register
          </Button>
          <Divider horizontal>Or</Divider>
          <SocialLogin />
        </Segment>
      </Form>
    </div>
  );
};

const validate = combineValidators({
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
});

const mapDispatchToProps = {
  registerUser
};

export default connect(
  null,
  mapDispatchToProps
)(
  reduxForm({
    validate,
    form: 'registerForm'
  })(RegisterForm)
);
