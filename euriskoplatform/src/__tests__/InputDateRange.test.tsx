import React, {useCallback, useState} from 'react';
import {Button, Text, View} from 'react-native';
import {fireEvent, render} from '@testing-library/react-native';
import InputDateRange from '../Components/InputDateRange/InputDateRange';

const InputDateRangeDefault = ({isOpen}: any) => {
  return (
    <InputDateRange
      visible={isOpen}
      startDate={new Date(2022, 1, 16)}
      endDate={new Date(2022, 1, 15)}
      onDismiss={() => {}}
      onConfirm={() => {}}
    />
  );
};

const InputDateRangeLabel = () => {
  return (
    <InputDateRange
      visible={true}
      startDate={new Date(2022, 1, 16)}
      endDate={new Date(2022, 1, 15)}
      onDismiss={() => {}}
      onConfirm={() => {}}
      label="Choose Period"
      saveLabel="OK"
    />
  );
};

describe('Input Date Range', () => {
  test('component not rendering when visibility is false', () => {
    const {queryAllByText} = render(<InputDateRangeDefault isOpen={false} />);

    const inputDateRange = queryAllByText(/save/i);
    expect(inputDateRange.length).toBe(0);
  });

  test('component not rendering when visibility is true', () => {
    const {queryAllByText} = render(<InputDateRangeDefault isOpen={true} />);

    const inputDateRange = queryAllByText(/save/i);
    expect(inputDateRange.length).toBe(1);
  });

  test('component showing labels properly', () => {
    const {queryAllByText} = render(<InputDateRangeLabel />);

    const label = queryAllByText(/choose period/i);
    const saveLabel = queryAllByText(/ok/i);

    expect(label.length).toBe(1);
    expect(saveLabel.length).toBe(1);
  });
});
