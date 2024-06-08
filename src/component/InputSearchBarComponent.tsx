import {
  Falsy,
  GestureResponderEvent,
  RecursiveArray,
  RegisteredStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import {MD2Colors, Searchbar} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import CustomIcon from './CustomIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconButtonComponent} from './IconButtonComponent';
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
};
export const InputSearchBarComponent = ({
  value,
  inputStyle,
  onChangeText,
  style,
  onSearchToPress,
  placeholder,
  iconName = 'mic',
}: InputSearchBarComponentType) => {
  return (
    <Searchbar
      value={value}
      onChangeText={onChangeText}
      inputStyle={[{}, inputStyle]}
      style={[{backgroundColor: MD2Colors.amber300}, style]}
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
};
