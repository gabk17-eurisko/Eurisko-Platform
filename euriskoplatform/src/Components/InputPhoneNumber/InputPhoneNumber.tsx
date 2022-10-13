import {
  View,
  Text,
  Modal,
  Pressable,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import countriesLibrary from 'i18n-iso-countries';
import React, {useCallback, useEffect, useState} from 'react';
import {getCountryCallingCode} from 'libphonenumber-js';
import styles from '../../assets/styles';
import InputText from '../InputText/InputText';
// @ts-ignore
import Flag from 'react-native-flags';
import InputContainer from '../InputContainer/InputContainer';
import {
  IInputPhoneNumberProps,
  LanguageKey,
} from '../../types/InputPhoneNumber';

countriesLibrary.registerLocale(require('i18n-iso-countries/langs/en.json'));
countriesLibrary.registerLocale(require('i18n-iso-countries/langs/ar.json'));
const countries = countriesLibrary.getNames('en', {select: 'official'});

let countriesArray = [] as any;

for (let [key, value] of Object.entries(countries)) {
  try {
    countriesArray.push({
      alpha2: key,
      name: value,
      nameAr: countriesLibrary.getName(key, 'ar'),
      code: `+${getCountryCallingCode(key as any)}`,
      codeAr: `+${Number(getCountryCallingCode(key as any)).toLocaleString(
        'ar-EG',
      )}`,
    });
  } catch {}
}

const defaultProps = {
  extensionPositionStart: false,
  showExtension: false,
  modalTitle: 'Select your country',
  modalCloseText: 'Close',
  inputTextStyle: {},
  extenstionTextStyle: {},
  modalCloseSVG: null,
  reverse: false,
  language: LanguageKey.en,
};

const InputPhoneNumber = ({
  disabled,
  disabledStyle,
  errorMessage,
  errorStyle,
  inputStyle,
  label,
  labelStyle,
  showErrors,
  extensionPositionEnd,
  showExtension,
  modalTitle,
  modalCloseText,
  inputTextStyle,
  extensionTextStyle,
  modalCloseSVG,
  reverse,
  language,
  getInputValue,
  ...props
}: IInputPhoneNumberProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [extValue, setExtValue] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<Array<Object>>([]);
  const [countryExtension, setCountryExtension] = useState<any>({
    alpha2: 'US',
    name: 'United States of America',
    nameAr: 'الولايات المتحدة',
    code: '+1',
    codeAr: '+١',
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const isArabic = language === 'ar';

  const renderItem = useCallback(
    ({item}: any) => {
      return (
        <Pressable
          onPress={() => {
            setModalVisible(false);
            setFilteredCountries([]);
            setCountryExtension(item);
            setInputValue('');
          }}>
          <View style={styles.countryListItem}>
            {reverse ? (
              <>
                <View style={styles.countryListItemView}>
                  <Text style={styles.countryListItemText}>
                    {isArabic ? item?.nameAr : item?.name}
                  </Text>
                  <Flag size={32} code={item?.alpha2} />
                </View>
                <Text style={styles.itemCode}>
                  {isArabic ? item?.codeAr : item?.code}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.itemCode}>
                  {isArabic ? item?.codeAr : item?.code}
                </Text>
                <View style={styles.countryListItemView}>
                  <Flag size={32} code={item?.alpha2} />
                  <Text style={styles.countryListItemText}>
                    {isArabic ? item?.nameAr : item?.name}
                  </Text>
                </View>
              </>
            )}
          </View>
        </Pressable>
      );
    },
    [setCountryExtension, setModalVisible],
  );

  useEffect(() => {
    getInputValue(
      isArabic ? countryExtension?.codeAr : countryExtension?.code,
      inputValue,
    );
  }, [countryExtension, inputValue]);

  return (
    <>
      <InputContainer
        testID="container"
        disabled={disabled}
        disabledStyle={disabledStyle}
        errorMessage={errorMessage}
        errorStyle={errorStyle}
        inputStyle={[styles.inputContainerPhoneNumber, inputStyle]}
        label={label}
        labelStyle={labelStyle}
        showErrors={showErrors}>
        <View
          testID="extensionPosition"
          style={{
            flexDirection: extensionPositionEnd ? 'row' : 'row-reverse',
          }}>
          <TextInput
            {...props}
            textAlign={isArabic ? 'right' : 'left'}
            editable={!disabled}
            value={inputValue}
            keyboardType="number-pad"
            onChangeText={setInputValue}
            style={[styles.inputPhoneNumber, inputTextStyle]}
          />
          <Pressable
            testID="button"
            style={styles.inputPhoneNumberIconWrapper}
            onPress={() =>
              disabled ? null : setModalVisible((prev: boolean) => !prev)
            }>
            {showExtension ? (
              <Text
                testID="extension"
                style={[styles.extensionTxtPhoneNumber, extensionTextStyle]}>
                {isArabic ? countryExtension?.codeAr : countryExtension?.code}
              </Text>
            ) : (
              <Flag size={32} code={countryExtension?.alpha2 ?? 'US'} />
            )}
          </Pressable>
        </View>
      </InputContainer>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible((prev: boolean) => !prev);
        }}>
        <SafeAreaView style={styles.safeAreaPhoneNumber}>
          <View style={styles.wrapperPhoneNumber}>
            <View
              testID="modalHeader"
              style={[
                styles.titleViewPhoneNumber,
                reverse && {flexDirection: 'row-reverse'},
              ]}>
              <Text style={styles.titleTextPhoneNumber}>{modalTitle}</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setFilteredCountries([]);
                  setInputValue('');
                }}>
                {modalCloseSVG ? (
                  modalCloseSVG
                ) : (
                  <Text style={styles.titleTextPhoneNumber}>
                    {modalCloseText}
                  </Text>
                )}
              </Pressable>
            </View>
            <View style={styles.modalInputContainerPhoneNumber}>
              <InputText
                testID="searchInput"
                value={extValue}
                textAlign={isArabic ? 'right' : 'left'}
                onChangeText={e => {
                  setExtValue(e);
                  setFilteredCountries(() => {
                    return countriesArray.filter(
                      (country: any) =>
                        country.name.toLowerCase().includes(e.toLowerCase()) ||
                        country.nameAr
                          .toLowerCase()
                          .includes(e.toLowerCase()) ||
                        country.code.includes(e) ||
                        country.codeAr.includes(e) ||
                        country.alpha2.includes(e.toUpperCase()),
                    );
                  });
                }}
              />
            </View>
            <FlatList
              testID="flatlist"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
              style={[styles.flatListPhoneNumber]}
              data={
                filteredCountries.length > 0
                  ? filteredCountries
                  : countriesArray
              }
              renderItem={renderItem}
              keyExtractor={item => item?.alpha2}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

InputPhoneNumber.defaultProps = defaultProps;

InputPhoneNumber.displayName = 'InputPhoneNumber';

export default InputPhoneNumber;
