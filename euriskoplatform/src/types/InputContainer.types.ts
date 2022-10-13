import {PropsWithChildren} from 'react'
import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native'

interface IInputContainerProps
  extends PropsWithChildren,
    IOmittedInputTextProps {
  /**
   * Style object for the Input container
   *
   * * @type {?string}
   */
  inputStyle?: StyleProp<ViewStyle>
  /**
   * Label for the Text Input title
   *
   * * @type {?string}
   */
  label?: string

  /**
   * Styles object for the label of the input
   *
   * * @type {?StyleProp<TextStyle>}
   */
  labelStyle?: StyleProp<TextStyle>

  /**
   * Boolean, if set to false won't show error and red border
   *
   * * @type {?boolean}
   */
  showErrors?: boolean

  /**
   * Styles object for error message if error is visible
   *
   * * @type {?StyleProp<TextStyle>}
   */
  errorStyle?: StyleProp<TextStyle>

  /**
   * Boolean if set to false input is disabled
   *
   * *type {?boolean}
   */
  disabled?: boolean

  /**
   * Styles object for dissabled input text
   *
   * *type {?StyleProp<ViewStyle>}
   */
  disabledStyle?: StyleProp<ViewStyle>

  /**
   * Error message for input
   *
   * *type {?string}
   */
  errorMessage?: string
}

type IOmittedInputTextProps = Omit<
  TextInputProps,
  'editable' | 'secureTextEntry'
>

export {IInputContainerProps}
