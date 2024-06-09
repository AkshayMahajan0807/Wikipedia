import {TouchableOpacity, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {searchKeywordType, useHomeContext} from '../../../context/HomeContext';

export const RecentSearchItem = ({item}: {item: searchKeywordType}) => {
  const {onPressToSetSearchItem} = useHomeContext();
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <IconButton
          style={{flex: 1}}
          icon={() => <AntDesign name="clockcircle" size={15} />}
        />
        <TouchableOpacity
          style={{flex: 10}}
          onPress={() => onPressToSetSearchItem(item)}>
          <Text
            style={{
              textAlignVertical: 'center',
              paddingVertical: responsiveWidth(3.5),
              fontSize: responsiveFontSize(2),
              letterSpacing: 1.5,
            }}>
            {item.searchKeyword}
          </Text>
        </TouchableOpacity>
        <IconButton
          style={{flex: 1}}
          icon={() => <FontAwesome name="history" size={15} />}
        />
      </View>
    </View>
  );
};
