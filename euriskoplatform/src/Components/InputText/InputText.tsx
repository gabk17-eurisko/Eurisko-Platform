import {TextInput} from 'react-native'
import React from 'react'
import {IInputTextProps} from '../../types'
import InputContainer from '../InputContainer/InputContainer'

const defaultProps = {
  disabled: false,
}

/**
 * Input Text component used for input of type text.
 * For other types check other inputs.
 */

const InputText: React.FC<IInputTextProps> = ({
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
      <TextInput {...props} editable={!disabled} />
    </InputContainer>
  )
}

InputText.defaultProps = defaultProps

InputText.displayName = 'InputText'

export default InputText
