import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import InputDate from '../Components/InputDate/InputDate';
import moment from 'moment';

const InputDateDefault = () => {
  const onConfirmMock = jest.fn();
  const onCancelMock = jest.fn();

  return (
    <>
      <InputDate
        testID="inputDate"
        value={new Date()}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    </>
  );
};

const InputDateVisible = () => {
  const onConfirmMock = jest.fn();
  const onCancelMock = jest.fn();

  return (
    <>
      <InputDate
        testID="inputDate"
        value={new Date()}
        isVisible={true}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    </>
  );
};

const InputDateVisibleCustomLabel = () => {
  const onConfirmMock = jest.fn();
  const onCancelMock = jest.fn();

  return (
    <>
      <InputDate
        testID="inputDate"
        confirmTextIOS="Select"
        cancelTextIOS="Hide"
        value={new Date()}
        isVisible={true}
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    </>
  );
};

const InputDateState = ({handleConfirm, handleClose}: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <>
      <Button title="Show Date Picker" onPress={showDatePicker} testID="btn" />
      <InputDate
        testID="inputDate"
        confirmButtonTestID="btnConfirm"
        cancelButtonTestID="btnCancel"
        value={new Date()}
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      />
    </>
  );
};

const InputDateCustomButtons = ({handleConfirm, handleClose}: any) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <>
      <Button title="Show Date Picker" onPress={showDatePicker} testID="btn" />
      <InputDate
        testID="inputDate"
        confirmButtonTestID="btnConfirm"
        cancelButtonTestID="btnCancel"
        customConfirmButtonIOS={() => <Text testID="txtDone">Done</Text>}
        customCancelButtonIOS={() => <Text testID="txtClose">Close</Text>}
        value={new Date()}
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={handleClose}
      />
    </>
  );
};

const InputDateValue = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [value, setValue] = useState<string>('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const handleConfirm = (date: Date) => {
    setValue(moment(date.toLocaleString()).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <>
      <Button title="Show Date Picker" onPress={showDatePicker} testID="btn" />
      <InputDate
        testID="inputDate"
        value={new Date()}
        displayIOS={'inline'}
        confirmButtonTestID="btnConfirm"
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Text>{value}</Text>
    </>
  );
};

describe('InputDate', () => {
  test('using the component with default props', () => {
    const {queryByTestId, queryAllByText} = render(<InputDateDefault />);

    //checking if input date picker component is rendered, in this case it should not
    const inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeFalsy();

    const text = queryAllByText('Confirm');
    const textCancel = queryAllByText('Cancel');

    expect(text.length).toBe(0);
    expect(textCancel.length).toBe(0);
  });

  test('having the component visible on screen', () => {
    const {queryByTestId, queryAllByText} = render(<InputDateVisible />);
    //checking if input date picker component is rendered, in this case it should
    const inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeTruthy();

    const textConfirm = queryAllByText('Confirm');
    const textCancel = queryAllByText('Cancel');

    expect(textConfirm.length).toBe(1);
    expect(textCancel.length).toBe(1);
  });

  test('having the component visible on screen with custom labels', () => {
    const {queryByTestId, queryAllByText} = render(
      <InputDateVisibleCustomLabel />,
    );
    //checking if input date picker component is rendered, in this case it should
    const inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeTruthy();

    const textConfirm = queryAllByText(/select/i);
    const textCancel = queryAllByText(/hide/i);

    expect(textConfirm.length).toBe(1);
    expect(textCancel.length).toBe(1);
  });

  test('clicking button to show date picker', () => {
    const {queryByTestId} = render(<InputDateState />);

    let inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeFalsy();

    const buttonPicker = queryByTestId('btn');
    expect(buttonPicker).toBeTruthy();

    fireEvent.press(buttonPicker);

    // checking whether the date picker state (visible/not visible) has changed after button press
    inputDateElement = queryByTestId('inputDate');

    expect(inputDateElement).toBeTruthy();
  });

  test('showing date picker then executing custom cancel button callback on IOS', () => {
    const handleConfirm = jest.fn();
    const handleClose = jest.fn();

    const {queryByTestId} = render(
      <InputDateState
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />,
    );

    const btnPicker = queryByTestId('btn');
    expect(btnPicker).toBeTruthy();

    fireEvent.press(btnPicker);

    const inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeTruthy();

    const btnCancel = queryByTestId('btnCancel');
    expect(btnCancel).toBeTruthy();

    fireEvent.press(btnCancel);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('showing date picker then executing custom confirm button callback on IOS', () => {
    const handleConfirm = jest.fn();
    const handleClose = jest.fn();

    const {queryByTestId} = render(
      <InputDateState
        handleClose={handleClose}
        handleConfirm={handleConfirm}
      />,
    );

    const btnPicker = queryByTestId('btn');
    expect(btnPicker).toBeTruthy();

    fireEvent.press(btnPicker);

    const inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeTruthy();

    const btnConfirm = queryByTestId('btnCancel');
    expect(btnConfirm).toBeTruthy();

    fireEvent.press(btnConfirm);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('using a custom component for buttons on IOS', () => {
    const {queryByTestId} = render(<InputDateCustomButtons />);

    const inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeFalsy();

    const buttonPicker = queryByTestId('btn');
    expect(buttonPicker).toBeTruthy();

    fireEvent.press(buttonPicker);

    const txtDone = queryByTestId('txtDone');
    const txtClose = queryByTestId('txtClose');
    expect(txtDone).toBeTruthy();
    expect(txtClose).toBeTruthy();
  });

  test('getting date value from picker', () => {
    const {queryByTestId, queryAllByText} = render(<InputDateValue />);

    // regex pattern that finds certain date format
    const pattern = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    // checking if input date is not visible
    let inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeFalsy();

    // checking if button that opens input date is visible
    const buttonPicker = queryByTestId('btn');
    expect(buttonPicker).toBeTruthy();

    fireEvent.press(buttonPicker);

    // checking if input date is visible after pressing button
    inputDateElement = queryByTestId('inputDate');
    expect(inputDateElement).toBeTruthy();

    // checking if there was any date pattern on screen
    let date = queryAllByText(pattern);

    expect(date.length).toBe(0);

    const btnConfirm = queryByTestId('btnConfirm');
    expect(btnConfirm).toBeTruthy();

    fireEvent.press(btnConfirm);

    // checking if selected date from picker is shown on screen
    date = queryAllByText(pattern);

    expect(date.length).toBe(1);
  });
});
