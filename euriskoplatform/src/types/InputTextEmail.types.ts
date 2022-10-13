import {IInputTextProps} from './InputText.types'

interface IInputTextEmail extends IInputTextProps {
  validationSchema?: RegExp
}

export {IInputTextEmail}
