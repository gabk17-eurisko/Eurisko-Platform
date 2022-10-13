import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  TouchableOpacity,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {COLORS} from './src/assets/styles/colors';
const App = () => {
  const [tempImage, setTempImage] = useState<any>({uri: null});

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['45%'], []);

  // renders
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const checkMediaSize = (media: number) => {
    if (media > 50000000) {
      alert('Exceeds 50 mb');
      return;
    }
  };

  const handleMediaChange = async (type: string) => {
    try {
      const selectedImage: any = await ImagePicker.launchCamera({
        quality: 0.4,
        mediaType: type,
      } as any);

      checkMediaSize(selectedImage.assets[0].fileSize);

      setTempImage(selectedImage.assets[0]);
      handleCancel();
    } catch {}
  };

  const handleGallery = async () => {
    try {
      const media: any = await ImagePicker.launchImageLibrary({
        quality: 0.4,
        mediaType: 'mixed',
      } as any);

      checkMediaSize(media.assets[0].fileSize);

      setTempImage(media.assets[0]);
      handleCancel();
    } catch (err) {
      alert(err);
    }
  };

  const handleCancel = () => {
    bottomSheetRef?.current?.close();
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRoot}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.square}
          onPress={() => bottomSheetRef?.current?.expand()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: tempImage?.uri,
            }}
          />
        </TouchableOpacity>
        <BottomSheet
          enablePanDownToClose
          ref={bottomSheetRef}
          animationConfigs={animationConfigs}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}>
          <View style={styles.contentContainer}>
            <Pressable
              style={styles.optionContainer}
              onPress={() => handleMediaChange('photo')}>
              <Text style={styles.optionText}>Take Photo</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable
              style={styles.optionContainer}
              onPress={() => handleMediaChange('video')}>
              <Text style={styles.optionText}>Take Video</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable style={styles.optionContainer} onPress={handleGallery}>
              <Text style={styles.optionText}>Select Image From Gallery</Text>
            </Pressable>
            <View style={styles.separator} />
            <Pressable style={styles.optionContainer} onPress={handleCancel}>
              <Text style={styles.optionText}>Cancel</Text>
            </Pressable>
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerRoot: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 24,
  },
  optionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
  },
  optionText: {
    fontSize: 16,
  },
  separator: {
    marginHorizontal: 20,
    borderBottomColor: COLORS.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
  },
  tinyLogo: {
    width: '100%',
    height: '100%',
  },
});

export default App;
