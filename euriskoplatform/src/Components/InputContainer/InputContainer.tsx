import {View, Text} from 'react-native';
import React from 'react';
import {IInputContainerProps} from '../../types';
import styles from '../../assets/styles';

const defaultProps = {
  label: '',
  labelStyle: null,
  showErrors: true,
  errorStyle: null,
  inputStyle: null,
  disabled: false,
  disabledStyle: null,
};

const InputContainer = ({
  label,
  labelStyle,
  disabled,
  disabledStyle,
  showErrors,
  errorMessage,
  errorStyle,
  inputStyle,
  children,
  ...props
}: IInputContainerProps) => {
  return (
    <>
      {label ? (
        <Text style={[styles.inputLabelStyles, labelStyle]}>{label}</Text>
      ) : null}

      <View
        {...props}
        style={[
          disabled ? disabledStyle || styles.disabledInputStyle : null,
          styles.inputViewStyle,
          inputStyle,
          //! check for the validity of the input
          showErrors && !!errorMessage ? styles.errorInputStyle : null,
        ]}>
        {children && children}
      </View>
      {showErrors && !!errorMessage && (
        <Text style={[styles.errorTextstyle, errorStyle]}>{errorMessage}</Text>
      )}
    </>
  );
};

export default InputContainer;

InputContainer.defaultProps = defaultProps;

InputContainer.displayName = 'InputContainer';
