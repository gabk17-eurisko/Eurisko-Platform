import {Platform, StyleSheet, SafeAreaView} from 'react-native';
import {COLORS} from './colors';

export default StyleSheet.create({
  inputContainerStyle: {
    flex: 1,
  },
  inputViewStyle: {
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 5,
    borderColor: COLORS.gray,
  },
  inputLabelStyles: {
    marginBottom: 10,
    fontSize: 15,
    fontWeight: '400',
  },
  errorTextstyle: {
    color: COLORS.error,
    marginTop: 10,
    fontSize: 13,
    fontWeight: '300',
  },
  disabledInputStyle: {
    backgroundColor: COLORS.disabled,
  },
  errorInputStyle: {
    borderColor: COLORS.error,
  },
  passwordInput: {
    flex: 1,
  },
  passwordIconWrapper: {
    paddingHorizontal: 3,
  },
  passwordStrengthBarViewStyle: {
    height: 2,
    marginVertical: 5,
    borderRadius: 1,
  },
  countryListItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  itemCode: {
    color: COLORS.grey,
  },
  countryListItemView: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  countryListItemText: {
    paddingLeft: Platform.OS === 'android' ? 5 : 15,
    paddingRight: Platform.OS === 'ios' ? 5 : 15,
    color: COLORS.black,
  },
  wrapperPhoneNumber: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 5,
  },
  titleViewPhoneNumber: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
    marginTop: 20,
  },
  titleTextPhoneNumber: {
    color: COLORS.black,
    fontSize: 17,
  },
  closeButton: {
    zIndex: 10,
    position: 'absolute',
    right: 0,
  },
  modalInputContainerPhoneNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  flatListPhoneNumber: {
    width: '100%',
    marginBottom: 120,
  },
  safeAreaPhoneNumber: {
    flex: 1,
  },
  inputPhoneNumber: {
    flex: 1,
    fontSize: 18,
  },
  inputPhoneNumberIconWrapper: {
    paddingHorizontal: 10,
  },
  extensionTxtPhoneNumber: {
    fontSize: 18,
  },
  inputContainerPhoneNumber: {
    height: 50,
    justifyContent: 'center',
  },
});
