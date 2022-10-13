import {
  AndroidNativeProps,
  IOSNativeProps,
} from '@react-native-community/datetimepicker';
import {DateTimePickerProps} from 'react-native-modal-datetime-picker';

type IOSDisplay = 'default' | 'compact' | 'inline' | 'spinner';
type AndroidDisplay = 'spinner' | 'default' | 'clock' | 'calendar';

type mergeIOSAndroidDateTimePickerPropsType = IOmittedNativeProps &
  DateTimePickerProps;

type IInputDateProps = mergeIOSAndroidDateTimePickerPropsType & {
  /**
   * Type of date time picker shown on IOS
   *
   * *type {'default' | 'compact' | 'inline' | 'spinner'}
   */
  displayIOS: IOSDisplay;

  /**
   * Type of date time picker shown on Android
   *
   * *type {'default' | 'clock' | 'calendar' | 'spinner'}
   */
  displayAndroid: AndroidDisplay;
};

type IOmittedNativeProps = Omit<IOSNativeProps | AndroidNativeProps, 'display'>;
export {IInputDateProps};
