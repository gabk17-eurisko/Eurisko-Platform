import {View, Text} from 'react-native';
import React from 'react';
import {
  DatePickerModal,
  en,
  registerTranslation,
} from 'react-native-paper-dates';
import {IInputDateRangeProps} from '../../types/InputDateRange.types';

const defaultProps = {
  language: 'en',
};

const InputDateRange = ({language, ...props}: IInputDateRangeProps) => {
  registerTranslation('en', en);
  return <DatePickerModal locale={language ?? 'en'} mode="range" {...props} />;
};

InputDateRange.defaultProps = defaultProps;

InputDateRange.displayName = 'InputDateRange';

export default InputDateRange;
