import {View, TouchableOpacity} from 'react-native';
import {
  Text,
  TouchableRipple,
  MD3Colors,
  useTheme,
  MD2Colors,
} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';
import {useHomeContext} from '../../context/HomeContext';
import {memo} from 'react';
import {languageDataType} from '../../types/type';

export const LanguageComponent = memo(({item}: {item: languageDataType}) => {
  const {onPressSelectLanguage, currentSelectedLanguage} = useHomeContext();

  const isSelectedLanguage =
    currentSelectedLanguage?.id == item.id ? true : false;

  return (
    <TouchableRipple
      style={{
        padding: responsiveWidth(0.8),
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => onPressSelectLanguage(item)}>
      <View
        style={{
          justifyContent: 'center',
          gap: 12,
        }}>
        <View
          style={{
            position: 'relative',
            backgroundColor: item.color,
            width: responsiveWidth(18),
            height: responsiveHeight(10),
            borderRadius: responsiveWidth(1),
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: isSelectedLanguage ? responsiveWidth(0.3) : 0,
            borderColor: MD2Colors.amber700,
          }}>
          {isSelectedLanguage ? (
            <Icon
              name="checkcircleo"
              size={responsiveFontSize(2.5)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: MD2Colors.amber700,
                borderRadius: responsiveWidth(5),
              }}
              color={'white'}
            />
          ) : (
            ''
          )}
          <Text
            style={{
              textAlign: 'justify',
              flexWrap: 'wrap',
              fontSize: responsiveFontSize(4),
              fontWeight: '700',
            }}>
            {item.logo}
          </Text>
          <View style={{height: responsiveHeight(3)}} />
          <Text
            style={{
              textAlign: 'center',
              flexWrap: 'wrap',
              fontSize: responsiveFontSize(1.6),
              position: 'absolute',
              bottom: responsiveHeight(0.9),
              // left:responsiveWidth(1.4),
              fontWeight: '700',
            }}>
            {item.lang}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
});
