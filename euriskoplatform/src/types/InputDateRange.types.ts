import {DatePickerModalRangeProps} from 'react-native-paper-dates';

type Languages = 'en' | 'ar';

interface IInputDateRangeProps extends IOmittedDateRangeProps {
  /**
   * Languages supported
   *
   * *type {?Languages}
   */
  language?: Languages;
}

type IOmittedDateRangeProps = Omit<
  DatePickerModalRangeProps,
  'mode' | 'locale'
>;

export {IInputDateRangeProps};
