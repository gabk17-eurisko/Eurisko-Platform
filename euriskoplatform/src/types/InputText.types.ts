import {TextInputProps} from 'react-native'
import {IInputContainerProps} from './InputContainer.types'

interface IInputTextProps extends IInputContainerProps {
  /**
   * Boolean if set to false input is disabled
   *
   * *type {?boolean}
   */
  disabled?: boolean
}

export {IInputTextProps}
