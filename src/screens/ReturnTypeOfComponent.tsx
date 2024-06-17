import {TouchableOpacity, View} from 'react-native';
import {getRegularExp, getYouTubeVideoId} from '../helper/helper';
import {Image} from 'react-native';
import {ActivityIndicator, Icon, IconButton, Text} from 'react-native-paper';
import {getYoutubeMeta} from 'react-native-youtube-iframe';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useHomeContext} from '../context/HomeContext';
import {ReadMoreText} from '../component/ReadMoreText';
export const ReturnTypeOfComponent = ({
  url,
  item,
}: {
  url: string;
  item: any;
}) => {
  const type = getRegularExp;
  const [thumbnail_url, setThumbnail_url] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {onPressYoutubeVideoThumbnail} = useHomeContext();
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
      <TouchableOpacity
        style={{
          flexDirection: 'column',
        }}
        onPress={() => onPressYoutubeVideoThumbnail(videoID ?? '')}>
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
        <IconButton
          size={responsiveFontSize(5)}
          centered
          iconColor="red"
          underlayColor="#fff"
          style={{
            position: 'absolute',
            top: responsiveHeight(7),
            left: responsiveWidth(40),
          }}
          icon={() => (
            <FontAwesome
              name="youtube-play"
              size={responsiveFontSize(5)}
              color={'red'}
            />
          )}
        />
        <ReadMoreText text={item?.summery} />
      </TouchableOpacity>
    );
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
