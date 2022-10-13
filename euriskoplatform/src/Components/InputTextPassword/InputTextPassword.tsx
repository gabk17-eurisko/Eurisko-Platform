import {View, TextInput, Pressable} from 'react-native';
import React, {ReactNode, useCallback, useState} from 'react';
import styles from '../../assets/styles';
import {IInputTextPasswordProps, strength} from '../../types';
import {passwordStrength} from 'check-password-strength';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import InputContainer from '../InputContainer/InputContainer';

const defaultPasswordStrengthColors: strength = [
  '#FF0909',
  '#FF9900',
  '#0099FF',
  '#00FF99',
];

const defaultProps = {
  label: '',
  labelStyle: null,
  showErrors: true,
  errorStyle: null,
  inputStyle: null,
  disabled: false,
  disabledStyle: null,
  shoudlShowIcon: true,
  iconPosition: 'end' as const,
  hiddenIcon: null,
  visibleIcon: null,
  shouldShowPasswordStrength: true,
  strengthColorList: defaultPasswordStrengthColors,
};

/**
 * Input Text component used for Password.
 * For other types check other inputs.
 */

interface IPasswordIconWrapperProps {
  togglePasswordVisibility: () => void;
  isPasswordVisible: boolean;
  hiddenIcon: ReactNode;
  visibleIcon: ReactNode;
}

const PasswordIconWrapper: React.FC<IPasswordIconWrapperProps> = ({
  togglePasswordVisibility,
  isPasswordVisible,
  hiddenIcon,
  visibleIcon,
}) => (
  <>
    <Pressable
      hitSlop={10}
      style={styles.passwordIconWrapper}
      onPress={togglePasswordVisibility}>
      {isPasswordVisible ? hiddenIcon : visibleIcon}
    </Pressable>
  </>
);

const InputTextPassword: React.FC<IInputTextPasswordProps> = ({
  disabled,
  shoudlShowIcon,
  iconPosition,
  hiddenIcon,
  visibleIcon,
  shouldShowPasswordStrength,
  strengthColorList,
  disabledStyle,
  errorMessage,
  errorStyle,
  inputStyle,
  label,
  labelStyle,
  showErrors,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = (): void =>
    setIsPasswordVisible(previousState => !previousState);

  const [passwordValue, setPasswordValue] = useState<string>('');

  const strengthWidth = useSharedValue(0);

  const animatedPasswordStrengthStyle = useAnimatedStyle(() => ({
    width: `${strengthWidth.value}%`,
  }));

  const renderPasswordStrength = useCallback(password => {
    const {id} = passwordStrength(password);

    const widthValue = !password ? 0 : id + 1;

    strengthWidth.value = withTiming(widthValue * 25);

    return (
      <Animated.View
        style={[
          {
            height: '100%',
            backgroundColor: strengthColorList
              ? strengthColorList[id]
              : defaultPasswordStrengthColors[id],
          },
          animatedPasswordStrengthStyle,
        ]}
      />
    );
  }, []);

  return (
    <>
      <InputContainer
        disabled={disabled}
        disabledStyle={disabledStyle}
        errorMessage={errorMessage}
        errorStyle={errorStyle}
        inputStyle={inputStyle}
        label={label}
        labelStyle={labelStyle}
        showErrors={showErrors}>
        <View
          style={{
            flexDirection: iconPosition === 'start' ? 'row-reverse' : 'row',
          }}>
          <TextInput
            {...props}
            editable={!disabled}
            secureTextEntry={!isPasswordVisible}
            value={passwordValue}
            onChangeText={setPasswordValue}
            style={styles.passwordInput}
          />
          {shoudlShowIcon && (
            <PasswordIconWrapper
              hiddenIcon={hiddenIcon}
              isPasswordVisible={isPasswordVisible}
              togglePasswordVisibility={togglePasswordVisibility}
              visibleIcon={visibleIcon}
            />
          )}
        </View>
      </InputContainer>
      {shouldShowPasswordStrength && (
        <View style={styles.passwordStrengthBarViewStyle}>
          {renderPasswordStrength(passwordValue)}
        </View>
      )}
    </>
  );
};

InputTextPassword.defaultProps = defaultProps;

InputTextPassword.displayName = 'InputTextPassword';

export default InputTextPassword;
