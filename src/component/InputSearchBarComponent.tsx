import {
  Falsy,
  GestureResponderEvent,
  RecursiveArray,
  RegisteredStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import 'react-native-get-random-values';
import {MD2Colors, Searchbar} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import CustomIcon from './CustomIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconButtonComponent} from './IconButtonComponent';
import {useHomeContext} from '../context/HomeContext';
import {forwardRef} from 'react';
type InputSearchBarComponentType = {
  value: string;
  onChangeText?:
    | (((text: string) => void) & ((query: string) => void))
    | undefined;
  inputStyle?: StyleProp<TextStyle>;
  style?:
    | (
        | false
        | TextStyle
        | RegisteredStyle<TextStyle>
        | RecursiveArray<TextStyle | Falsy | RegisteredStyle<TextStyle>>
      )
    | null
    | undefined;
  onSearchToPress?:
    | (((event: GestureResponderEvent) => void) &
        ((e: GestureResponderEvent) => void) &
        ((e: GestureResponderEvent) => void))
    | undefined;
  placeholder?: string | undefined;
  iconName?: 'clear' | 'mic';
  ref?: React.LegacyRef<any> | undefined;
  onFocus?: () => void;
};
export const InputSearchBarComponent = forwardRef(
  (
    {
      value,
      inputStyle,
      onChangeText,
      style,
      onSearchToPress,
      placeholder,
      iconName = 'mic',
      onFocus,
    }: InputSearchBarComponentType,
    ref: any,
  ) => {
    const {onStoreSearchKeyword, storeSearchKeyword} = useHomeContext();
    return (
      <Searchbar
        ref={ref}
        value={value}
        onFocus={onFocus}
        onChangeText={onChangeText}
        inputStyle={[{}, inputStyle]}
        style={[{backgroundColor: MD2Colors.amber300}, style]}
        returnKeyType="search"
        onSubmitEditing={() => {
          console.log('event');
          onStoreSearchKeyword(value);
        }}
        mode="bar"
        placeholder={placeholder}
        right={() => (
          <IconButtonComponent
            name={iconName}
            VectorIconComponent={MaterialIcons}
            size={3}
            iconButtonSize={2.1}
            onPress={onSearchToPress}
          />
        )}
      />
    );
  },
);
