import {Modal, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import YoutubePlayer from 'react-native-youtube-iframe';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
export const YouTubeVideoModal = ({
  url,
  isVisible,
  onCloseModel,
}: {
  url: string;
  isVisible: boolean;
  onCloseModel: () => void;
}) => {
  return (
    <Modal visible={isVisible}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 10}} />
        <IconButton
          onPress={onCloseModel}
          icon={() => (
            <Entypo name="cross" color={'red'} size={responsiveFontSize(4)} />
          )}
        />
      </View>
      <View
        style={{
          height: '100%',
          justifyContent: 'center',
        }}>
        <YoutubePlayer height={300} play={true} videoId={url} />
      </View>
    </Modal>
  );
};
