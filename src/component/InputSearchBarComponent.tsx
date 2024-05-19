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
import Entypo from 'react-native-vector-icons/Entypo';
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
};
export const InputSearchBarComponent = ({
  value,
  inputStyle,
  onChangeText,
  style,
  onSearchToPress,
  placeholder,
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
          name="mic"
          VectorIconComponent={Entypo}
          size={3}
          iconButtonSize={2.1}
          onPress={onSearchToPress}
        />
      )}
    />
  );
};
