import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import InputPhoneNumber from '../Components/InputPhoneNumber/InputPhoneNumber';
// @ts-ignore
import renderer from 'react-test-renderer';
import {Close} from '../assets/styles/svg';
import '@testing-library/jest-native/extend-expect';

describe('<InputPhoneNumber/>', () => {
  const inputPhoneNumber = (
    <InputPhoneNumber
      getInputValue={(e: string, v: string) => {}}
      testID="input"
    />
  );

  const inputPhoneNumberWithProps = (
    <InputPhoneNumber
      getInputValue={(e: string, v: string) => {}}
      testID="input"
      extensionPositionEnd
      showExtension
      modalTitle="Pick"
      modalCloseText="Exit"
      inputTextStyle={{fontSize: 14}}
      extensionTextStyle={{fontSize: 20}}
      reverse
    />
  );

  const inputPhoneNumberArabic = (
    <InputPhoneNumber
      getInputValue={(e: string, v: string) => {}}
      language="ar"
      showExtension
    />
  );

  const inputPhoneNumberShowExtension = (
    <InputPhoneNumber
      getInputValue={(e: string, v: string) => {}}
      showExtension
    />
  );

  const inputPhoneNumberAsJson = renderer
    .create(
      <InputPhoneNumber
        getInputValue={(e: string, v: string) => {}}
        testID="input"
      />,
    )
    .toJSON();

  it('rendering successfully', () => {
    expect(inputPhoneNumber).toBeDefined();
  });

  it('renders correctly', () => {
    expect(inputPhoneNumberAsJson).toMatchSnapshot();
  });

  it('Outputs the correct text', () => {
    const {getByTestId} = render(inputPhoneNumber);

    const input = getByTestId('input');
    fireEvent.changeText(input, '123');
    expect(input.props.value).toBe('123');
  });

  it(`renders with the modal closed`, () => {
    const {queryAllByText} = render(inputPhoneNumber);
    expect(queryAllByText('Close').length).toBe(0);
  });

  it('fires the assigned event on press and opens the modal', () => {
    const {getByTestId, getByText} = render(inputPhoneNumber);
    const button = getByTestId('button');
    fireEvent.press(button);

    const isModalOpen = getByText('Select your country');
    expect(isModalOpen).toBeTruthy();
  });

  it('renders the component with prop extensionPositionStart', () => {
    const {getByTestId} = render(inputPhoneNumberWithProps);

    //this
    const extPosistionView = getByTestId('extensionPosition');
    expect(extPosistionView).toHaveStyle({flexDirection: 'row'});
    //is equivalent to that
    const flexDirection = extPosistionView.props.style.flexDirection;
    expect(flexDirection).toBe('row');
  });

  it('renders the component with styling props', () => {
    const {getByTestId} = render(inputPhoneNumberWithProps);

    const inputStyle = getByTestId('input');
    expect(inputStyle).toHaveStyle({fontSize: 14});

    const extensionStyle = getByTestId('extension');
    expect(extensionStyle).toHaveStyle({fontSize: 20});
  });

  it('renders the component with extension showing instead of flag', () => {
    const {getByText} = render(inputPhoneNumberWithProps);

    const extension = getByText('+1');
    expect(extension).toBeTruthy();
  });

  it('renders the component in arabic', () => {
    const {getByText} = render(inputPhoneNumberArabic);

    const extension = getByText('+١');
    expect(extension).toBeTruthy();
  });

  it('is possible to select country', () => {
    const {getByText, getByTestId, queryAllByText} = render(
      inputPhoneNumberShowExtension,
    );

    const button = getByTestId('button');
    fireEvent.press(button);

    const isModalOpen = getByText('Select your country');
    expect(isModalOpen).toBeTruthy();

    const country = getByText('+355');
    expect(country).toBeTruthy();

    fireEvent.press(country);

    const isModalClosed = queryAllByText('Select your country');
    expect(isModalClosed).toHaveLength(0);

    const extension = getByText('+355');
    expect(extension).toBeTruthy();
  });

  it('is possible to search for a certain extension and select it', () => {
    const {getByText, getByTestId, queryAllByText} = render(
      inputPhoneNumberShowExtension,
    );

    const arr = ['961', 'lebanon', 'Leba', 'Lb', 'لبنان'];

    const button = getByTestId('button');
    fireEvent.press(button);

    const isModalOpen = getByText('Select your country');
    expect(isModalOpen).toBeTruthy();

    const searchInput = getByTestId('searchInput');
    expect(searchInput).toBeTruthy();

    for (let i = 0; i < arr.length; i++) {
      fireEvent.changeText(searchInput, arr[i]);
      const searchedExtension = getByText('+961');
      expect(searchedExtension).toBeTruthy();
    }

    const searchedExtension = getByText('+961');
    expect(searchedExtension).toBeTruthy();

    fireEvent.press(searchedExtension);

    const isModalClosed = queryAllByText('Select your country');
    expect(isModalClosed).toHaveLength(0);

    const extension = getByText('+961');
    expect(extension).toBeTruthy();
  });
});
