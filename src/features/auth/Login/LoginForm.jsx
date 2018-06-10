import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login } from '../authActions';

const LoginForm = ({ login, handleSubmit }) => {
  return (
    <Form error size="large" onSubmit={handleSubmit(login)}>
      <Segment>
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
      </Segment>
    </Form>
  );
};

const actions = { login };

export default connect(
  null,
  actions
)(
  reduxForm({
    form: 'loginForm'
  })(LoginForm)
);
