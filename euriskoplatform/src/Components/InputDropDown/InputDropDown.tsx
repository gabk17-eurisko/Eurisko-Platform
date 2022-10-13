import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {IInputDropDownPickerProps} from '../../types/InputDropDownPicker.types';

export const InputDropDownFunction = DropDownPicker;

const InputDropDown = ({...props}: IInputDropDownPickerProps) => {
  return <DropDownPicker {...props} />;
};

export default InputDropDown;
