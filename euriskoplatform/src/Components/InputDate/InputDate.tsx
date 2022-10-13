import React from 'react';
import {Platform} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {IInputDateProps} from '../../types/InputDate.types';

const defaultProps = {
  displayIOS: 'default',
  displayAndroid: 'default',
};

const InputDate = ({displayIOS, displayAndroid, ...props}: IInputDateProps) => {
  return (
    <DateTimePickerModal
      {...props}
      display={Platform.OS === 'ios' ? displayIOS : displayAndroid}
    />
  );
};

InputDate.defaultProps = defaultProps;

InputDate.displayName = 'InputDate';

export default InputDate;
