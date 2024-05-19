import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {MD2Colors, Text} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {IconButtonComponent} from './IconButtonComponent';
type SearchButton = {
  searchTitle?: string;
  onPressSearchButton?: ((event: GestureResponderEvent) => void) | undefined;
  onVoiceSearch: () => void;
  searchTextStyle?: StyleProp<TextStyle>;
};

export const SearchButton = ({
  onPressSearchButton,
  searchTitle = 'Search...',
  onVoiceSearch,
  searchTextStyle,
}: SearchButton) => {
  return (
    <View style={{padding: 14}}>
      <TouchableOpacity
        onPress={onPressSearchButton}
        style={{
          backgroundColor: MD2Colors.amber300,
          height: 50,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 25,
          flexDirection: 'row',
        }}>
        <Text
          style={[
            {
              flex: 8,
              textAlignVertical: 'center',
            },
            searchTextStyle,
          ]}>
          {searchTitle}
        </Text>
        <IconButtonComponent
          VectorIconComponent={Entypo}
          name="mic"
          onPress={() => onVoiceSearch()}
          size={3}
          iconButtonSize={2.1}
        />
      </TouchableOpacity>
    </View>
  );
};
