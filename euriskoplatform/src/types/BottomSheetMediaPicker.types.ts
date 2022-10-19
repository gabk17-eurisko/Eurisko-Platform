import BottomSheet, {BottomSheetProps} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {ReactElement, ReactNode} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {ImageLibraryOptions, CameraOptions} from 'react-native-image-picker';

export type dataType = {
  photo?: {
    text: string | undefined;
    onPress: () => Promise<void>;
  };
  video?: {
    text: string | undefined;
    onPress: () => Promise<void>;
  };
  gallery?: {
    text: string | undefined;
    onPress: () => Promise<void>;
  };
  cancel?: {
    text: string | undefined;
    onPress: Function;
  };
};

// a type that can create tuples of n-length
type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

type Tuple4<T> = Tuple<T, 4>;
type Tuple3<T> = Tuple<T, 3>;
type Tuple2<T> = Tuple<T, 2>;

interface IBottomSheetMediaPickerProps extends IPickBottomSheetStyling {
  /**
   * Boolean that will check media size if set to true
   *
   * @type {?boolean}
   * @default false
   */
  shouldCheckMediaSize?: boolean;

  /**
   * Limit to size of the media to be uploaded in bytes
   *
   * @type {?number}
   * @default 1000000
   */
  mediaSizeLimit?: number;

  /**
   * Select library options
   *
   * @type {?ImageLibraryOptions}
   */
  libraryOptions?: ImageLibraryOptions;

  /**
   * Select camera options
   *
   * @type {?IOmmitCameraOptions}
   */
  cameraOptions?: IOmmitCameraOptions;

  /**
   * Separator Component
   *
   * @type {?ReactNode}
   */
  separatorComponent?: ReactNode;

  /**
   * Custom photo button text
   *
   * @type {?string}
   */
  customPhotoText?: string;

  /**
   * Custom video button text
   *
   * @type {?string}
   */
  customVideoText?: string;

  /**
   * Custom gallery button text
   *
   * @type {?string}
   */
  customGalleryText?: string;

  /**
   * Custom cancel button text
   *
   * @type {?string}
   */
  customCancelText?: string;

  /**
   * Custom cancel button container style
   *
   * @type {?StyleProp<ViewStyle>}
   */
  customButtonContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Custom cancel button container style
   *
   * @type {?StyleProp<ViewStyle>}
   */
  customButtonTextStyle?: StyleProp<TextStyle>;

  /**
   * Set to false to hide section
   *
   * @type {?boolean}
   */
  photoEnabled?: boolean;

  /**
   * Set to false to hide section
   *
   * @type {?boolean}
   */
  videoEnabled?: boolean;

  /**
   * Set to false to hide section
   *
   * @type {?boolean}
   */
  galleryEnabled?: boolean;

  /**
   * Set to false to hide section
   *
   * @type {?boolean}
   */
  cancelEnabled?: boolean;

  /**
   * Custom behavior if file size exceeds limit
   *
   * @type {?Function}
   */
  customFileExceedsLimitBehavior?: Function;

  /**
   * Prop allows reordering of buttons
   *
   * Must call an array of strings using:
   * * "cancel"
   * * "photo"
   * * "gallery"
   * * "cancel"
   *
   * @type {?Tuple4<string> | ?Tuple3<string> | ?Tuple2<string>}
   */
  reorder?: Tuple4<string> | Tuple3<string> | Tuple2<string>;

  /**
   * Get media data from selection
   *
   * @type {Function}
   */
  getMedia: Function;

  /**
   * children
   *
   * @type {ReactElement}
   */
  children: ReactElement;

  /**
   * Allows the use of bottom sheet ref functions
   *
   * @type {(ref: React.MutableRefObject<BottomSheetMethods | null>) => void}
   */
  getRef: (ref: React.MutableRefObject<BottomSheetMethods | null>) => void;
}

type IOmmitCameraOptions = Omit<CameraOptions, 'mediaType' | 'saveToPhotos'>;

type IPickBottomSheetStyling = Pick<
  BottomSheetProps,
  | 'style'
  | 'handleStyle'
  | 'containerStyle'
  | 'backgroundStyle'
  | 'handleIndicatorStyle'
  | 'handleComponent'
>;

export {IBottomSheetMediaPickerProps};
