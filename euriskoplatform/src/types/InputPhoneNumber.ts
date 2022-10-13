import {ReactNode} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {IInputTextProps} from './InputText.types';

export enum LanguageKey {
  ar = 'ar',
  en = 'en',
}

type Language = keyof typeof LanguageKey;

interface IInputPhoneNumberProps extends IOmittedIInputPhoneNumberProps {
  /**
   * Extension placement on the start of the input
   *
   * @type {?boolean}
   * @default false
   */
  extensionPositionEnd?: boolean;

  /**
   * Boolean that shows country extension instead of the its flag
   *
   * @type {?boolean}
   * @default false
   */
  showExtension?: boolean;

  /**
   * Custom text for the modal title header
   *
   * @type {?string}
   * @default 'Select your country'
   */
  modalTitle?: string;

  /**
   * Custom text for the close modal pressable
   *
   * @type {?string}
   * @default 'Close'
   */
  modalCloseText?: string;

  /**
   * Custom styling for the text input
   *
   * @type {?TextStyle}
   * @default {}
   */
  inputTextStyle?: StyleProp<TextStyle>;

  /**
   * Custom styling for the extension text
   *
   * @type {?TextStyle}
   * @default {}
   */
  extensionTextStyle?: StyleProp<TextStyle>;

  /**
   * Custom svg for close pressable
   *
   * @type {?ReactNode}
   * @default null
   */
  modalCloseSVG?: ReactNode;

  /**
   * Reverse modal content layout
   *
   * @type {?boolean}
   * @default false
   */
  reverse?: boolean;

  /**
   * Country and extension language support
   *
   * @type {?Language}
   * @default "en"
   */
  language?: Language;

  /**
   * Function that gets extenstion value and input value from component
   *
   * @type {Function}
   */
  getInputValue: Function;
}

type IOmittedIInputPhoneNumberProps = Omit<IInputTextProps, 'keyboardType'>;

export {IInputPhoneNumberProps};
