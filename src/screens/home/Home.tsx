import React from 'react';
import {
  HomeStackScreenProps,
  HomeStackNavigationProps,
} from '../../navigation/HomeStack';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, Text, View} from 'react-native';
import {SearchButton} from '../../component/SearchButton';
import {useVoiceContext} from '../../context/VoiceContext';
import {FlatList} from 'react-native';
import {languagesData} from './languagesData';
import {LanguageComponent} from './LanguageComponent';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {Button} from 'react-native-paper';
import {useHomeContext} from '../../context/HomeContext';
import {CarouselComponent} from '../../component/CarouselComponent';
import {CarouselRenderItemInfo} from 'react-native-reanimated-carousel/lib/typescript/types';
import {landingPageData} from '../../data/landingPageData';
import {ReturnTypeOfComponent} from '../ReturnTypeOfComponent';
import {YouTubeVideoModal} from '../../component/YouTubeVideoModal';
// import {Text} from 'react-native-paper';
const {width} = Dimensions.get('window');
export const Home = ({navigation, route}: HomeStackScreenProps) => {
  const {setMessage} = useVoiceContext();
  console.log('home component');
  const {latestTopic} = landingPageData;
  const {
    onPressToRestoreSearchKeyword,
    isOpenFullViewModal,
    videoID,
    onPressToCloseYoutubeModal,
  } = useHomeContext();
  return (
    <>
      <View style={{flex: 1}}>
        <Button onPress={() => navigation.navigate('QuestionScreen')}>
          on Press
        </Button>
        <SearchButton
          searchTitle="this is Search button"
          onPressSearchButton={() => {
            setMessage('');
            onPressToRestoreSearchKeyword();
            navigation.navigate('Search', {isVoiceRecognize: false});
          }}
          onVoiceSearch={() => {
            setMessage('');
            navigation.navigate('Search', {isVoiceRecognize: true});
          }}
        />
        {/* <FlatList
        data={languagesData}
        style={{flex: 1}}
        renderItem={({item}) => <LanguageComponent item={item} />}
        numColumns={5}
        ListFooterComponent={() => <View style={{}} />}
        ListFooterComponentStyle={{paddingBottom: responsiveHeight(10)}}
      /> */}

        <CarouselComponent
          data={latestTopic.map(item => {
            return {
              ...item,
              imageurl: item.imageurl.split(',')[0],
            };
          })}
          // autoPlay
          renderItem={({item, index}: any) => {
            console.log('item', item);

            return (
              <View
                style={{flex: 1, backgroundColor: 'red', margin: 16}}
                key={index}>
                <ReturnTypeOfComponent url={item.imageurl} />
              </View>
            );
          }}
          width={width}
          height={width / 2}
        />
      </View>
      <YouTubeVideoModal
        url={videoID}
        isVisible={isOpenFullViewModal}
        onCloseModel={() => onPressToCloseYoutubeModal()}
      />
    </>
  );
};
