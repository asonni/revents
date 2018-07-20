import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const DateInput = ({
  width,
  placeholder,
  meta: { touched, error },
  input: { value, onChange, onBlur, ...restInput },
  ...rest
}) => {
  // if (value) {
  //   value = moment(value, 'X');
  // }
  return (
    <Form.Field error={touched && !!error} width={width}>
      <DatePicker
        {...rest}
        onChange={onChange}
        // onBlur={() => onBlur()}
        placeholderText={placeholder}
        selected={value ? moment(value) : null}
        {...restInput}
      />
      {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
    </Form.Field>
  );
};

export default DateInput;
