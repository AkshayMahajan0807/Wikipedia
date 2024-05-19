import React from 'react';
import {
  HomeStackScreenProps,
  HomeStackNavigationProps,
} from '../../navigation/HomeStack';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {SearchButton} from '../../component/SearchButton';
import {useVoiceContext} from '../../context/VoiceContext';
import {FlatList} from 'react-native';
import {languagesData} from './languagesData';
import {LanguageComponent} from './LanguageComponent';
import {responsiveHeight} from 'react-native-responsive-dimensions';
// import {Text} from 'react-native-paper';

export const Home = ({navigation, route}: HomeStackScreenProps) => {
  const {setMessage} = useVoiceContext();
  console.log('home component');

  return (
    <View style={{flex: 1}}>
      <SearchButton
        searchTitle="this is Search button"
        onPressSearchButton={() => console.log('this is search button')}
        onVoiceSearch={() => {
          setMessage('');
          navigation.navigate('Search', {isVoiceRecognize: true});
        }}
      />
      <FlatList
        data={languagesData}
        style={{flex: 1}}
        renderItem={({item}) => <LanguageComponent item={item} />}
        numColumns={5}
        ListFooterComponent={() => <View style={{}} />}
        ListFooterComponentStyle={{paddingBottom: responsiveHeight(10)}}
      />
    </View>
  );
};
