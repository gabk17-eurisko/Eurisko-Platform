import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
  MutableRefObject,
  Ref,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import styles from './src/assets/styles';
import BottomSheetMediaPicker from './src/Components/BottomSheetMediaPicker/BottomSheetMediaPicker';

let bottomSheetRefCopy: BottomSheetMethods | null;

const App = () => {
  const [tempImage, setTempImage] = useState<string>();

  useEffect(() => {
    console.log(tempImage);
  }, [tempImage]);

  return (
    <View style={{flex: 1}}>
      <BottomSheetMediaPicker
        libraryOptions={{mediaType: 'mixed', selectionLimit: 2}}
        getMedia={item => {
          setTempImage(item?.assets[0]?.uri);
        }}
        getRef={bottomSheetRef =>
          (bottomSheetRefCopy = bottomSheetRef?.current)
        }>
        <TouchableOpacity
          style={styles.square}
          onPress={() => bottomSheetRefCopy?.expand()}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: tempImage,
            }}
          />
        </TouchableOpacity>
      </BottomSheetMediaPicker>
    </View>
  );
};

export default App;
