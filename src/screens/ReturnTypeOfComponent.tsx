import {View} from 'react-native';
import {getRegularExp, getYouTubeVideoId} from '../helper/helper';
import {Image} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {getYoutubeMeta} from 'react-native-youtube-iframe';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
export const ReturnTypeOfComponent = ({url}: {url: string}) => {
  const type = getRegularExp;
  const [thumbnail_url, setThumbnail_url] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  if (getRegularExp('YOUTUBE')?.test(url)) {
    const videoID = getYouTubeVideoId(url);
    useEffect(() => {
      (async () => {
        if (videoID) {
          try {
            setIsLoading(true);
            const response = await getYoutubeMeta(videoID);
            console.log('response', response.thumbnail_url);
            setThumbnail_url(response.thumbnail_url);
          } catch (error) {
            console.error('error ', error);
          } finally {
            setIsLoading(false);
          }
        }
      })();
    }, [videoID]);

    return (
      <View>
        {isLoading ? (
          <ActivityIndicator animating />
        ) : (
          <Image
            source={{uri: thumbnail_url}}
            resizeMode="stretch"
            height={responsiveHeight(22)}
            style={{position: 'relative'}}
          />
        )}
        <AntDesign
          name="play"
          size={responsiveFontSize(4)}
          color={'red'}
          style={{position: 'absolute', top: 70, left: 170}}
        />
      </View>
    );
    // <Image source={}/>
  } else if (getRegularExp('IMAGE')?.test(url)) {
    return (
      <Image
        source={{uri: url}}
        resizeMode="stretch"
        height={responsiveHeight(22)}
      />
    );
  } else {
    return;
  }

  return;
};
