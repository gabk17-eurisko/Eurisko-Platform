import {TextInput} from 'react-native';
import React from 'react';
import {IInputTextEmail, IInputTextProps} from '../../types';
import InputContainer from '../InputContainer/InputContainer';

const defaultProps = {
  label: '',
  labelStyle: null,
  showErrors: true,
  errorStyle: null,
  inputStyle: null,
  disabled: false,
  disabledStyle: null,
};

/**
 * Input Text component used for email
 * For other types check other inputs.
 */

const InputTextEmail: React.FC<IInputTextProps & IInputTextEmail> = ({
  disabled,
  disabledStyle,
  errorMessage,
  errorStyle,
  inputStyle,
  label,
  labelStyle,
  showErrors,
  ...props
}) => {
  return (
    <InputContainer
      disabled={disabled}
      disabledStyle={disabledStyle}
      errorMessage={errorMessage}
      errorStyle={errorStyle}
      inputStyle={inputStyle}
      label={label}
      labelStyle={labelStyle}
      showErrors={showErrors}>
      <TextInput {...props} editable={!disabled} keyboardType="email-address" />
    </InputContainer>
  );
};

InputTextEmail.defaultProps = defaultProps;

InputTextEmail.displayName = 'InputTextEmail';

export default InputTextEmail;
