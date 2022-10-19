import React, {
  forwardRef,
  Ref,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import {View, Text, Pressable, Alert, FlatList, Image} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  dataType,
  IBottomSheetMediaPickerProps,
} from '../../types/BottomSheetMediaPicker.types';
import styles from '../../assets/styles/index';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {CameraOptions, ImageLibraryOptions} from 'react-native-image-picker';

const defaultProps = {
  shouldCheckMediaSize: false,
  mediaSizeLimit: 1000000,
  libraryOptions: {},
  cameraOptions: {},
  separatorComponent: <View style={styles.separator} />,
  customPhotoText: 'Take Photo',
  customVideoText: 'Take Video',
  customGalleryText: 'Select Image From Gallery',
  customCancelText: 'Cancel',
  customButtonStyle: {},
  customButtonTextStyle: {},
  photoEnabled: true,
  videoEnabled: true,
  galleryEnabled: true,
  cancelEnabled: true,
  customFileExceedsLimitBehavior: null,
  reorder: null,
};

const BottomSheetMediaPicker = ({
  shouldCheckMediaSize,
  mediaSizeLimit,
  libraryOptions,
  cameraOptions,
  separatorComponent,
  customPhotoText,
  customVideoText,
  customGalleryText,
  customCancelText,
  customButtonContainerStyle,
  customButtonTextStyle,
  photoEnabled,
  videoEnabled,
  galleryEnabled,
  cancelEnabled,
  customFileExceedsLimitBehavior,
  reorder,
  getMedia,
  children,
  getRef,
  ...props
}: IBottomSheetMediaPickerProps) => {
  const [numOfButtons, setNumOfButtons] = useState<number>(1);
  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);

  const snapPoints = useMemo(
    () => [`${12 * numOfButtons + 5 / notZero(numOfButtons)}`],
    [numOfButtons],
  );

  function notZero(n: number) {
    if (n === 0) {
      console.warn('You must have at least 1 button in your bottom sheet');
    }
    return n + 1;
  }

  const handleCancel = () => {
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    if (getRef) getRef(bottomSheetRef);
  }, []);

  const data: dataType = {
    photo: {
      text: customPhotoText,
      onPress: () => handleMedia('photo'),
    },
    video: {
      text: customVideoText,
      onPress: () => handleMedia('video'),
    },
    gallery: {
      text: customGalleryText,
      onPress: () => handleMedia('', true),
    },
    cancel: {
      text: customCancelText,
      onPress: handleCancel,
    },
  };

  if (!cancelEnabled) delete data.cancel;
  if (!photoEnabled) delete data.photo;
  if (!videoEnabled) delete data.video;
  if (!galleryEnabled) delete data.gallery;

  let mapable = Object.keys(data).map(elem => data[elem]);

  const checkForDuplicates = (array: Array<string>) => {
    return new Set(array).size !== array.length;
  };

  if (reorder) {
    if (!checkForDuplicates(reorder)) {
      mapable = [];
      reorder.forEach(item => {
        if (data[item]) mapable.push(data[item]);
        else {
          console.warn(`${item} is undefined`);
        }
      });
    } else {
      console.warn('No two equal strings are allowed');
    }
  }

  useEffect(() => {
    setNumOfButtons(mapable?.length);
  }, [mapable]);

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

  const checkMediaSize = media => {
    for (let i = 0; i <= media?.assets?.length; i++) {
      if (mediaSizeLimit && media.assets[i]?.fileSize > mediaSizeLimit) {
        customFileExceedsLimitBehavior
          ? customFileExceedsLimitBehavior()
          : Alert.alert(`Exceeds ${mediaSizeLimit} bytes`);
        return;
      }
    }

    getMedia(media);
  };

  const handleMedia = async (mediaType: string, isLibrary: boolean = false) => {
    try {
      const media: ImagePicker.ImagePickerResponse = isLibrary
        ? await ImagePicker.launchImageLibrary(
            libraryOptions as ImageLibraryOptions,
          )
        : await ImagePicker.launchCamera({
            mediaType: mediaType,
            ...cameraOptions,
          } as CameraOptions);

      shouldCheckMediaSize ? checkMediaSize(media) : getMedia(media);
      handleCancel();
    } catch {}
  };

  const renderItem = ({item, index}) => {
    return (
      <>
        <Pressable
          style={[styles.optionContainer, customButtonContainerStyle]}
          onPress={item?.onPress}>
          <Text style={[styles.optionText, customButtonTextStyle]}>
            {item?.text}
          </Text>
        </Pressable>
        {index !== mapable?.length - 1 && separatorComponent}
      </>
    );
  };

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRoot}>
      <View style={styles.container}>
        {children}
        <BottomSheet
          enablePanDownToClose
          ref={bottomSheetRef}
          animationConfigs={animationConfigs}
          index={-1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          {...props}>
          <View style={styles.contentContainer}>
            <FlatList data={mapable} renderItem={renderItem} />
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

BottomSheetMediaPicker.defaultProps = defaultProps;

BottomSheetMediaPicker.displayName = 'BottomSheetMediaPicker';

export default BottomSheetMediaPicker;
