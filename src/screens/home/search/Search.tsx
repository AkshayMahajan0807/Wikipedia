import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {HomeStackScreenProps} from '../../../navigation/HomeStack';
import {InputSearchBarComponent} from '../../../component/InputSearchBarComponent';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useEffect} from 'react';
import {VoiceRecognitionComponent} from '../../../component/VoiceRecognizationComponent';
import {useVoiceContext} from '../../../context/VoiceContext';
import {useHomeContext} from '../../../context/HomeContext';

export const Search = ({navigation, route}: HomeStackScreenProps) => {
  const {isVoiceRecognize}: any = route.params;

  const {
    startToExecuteVoice,
    onSpeechEnd,
    onSpeechStart,
    onStart,
    onStop,
    message,
    isVisible,
    setIsVisible,
    setMessage,
  } = useVoiceContext();

  const {onChangeToShowContent, searchBarValue, setSearchBarValue} =
    useHomeContext();
  useEffect(() => {
    if (isVoiceRecognize) {
      startToExecuteVoice();
      onStart();
    }
  }, [isVoiceRecognize]);
  return (
    <>
      <VoiceRecognitionComponent
        isVisible={isVisible}
        onStopIt={onStop}
        message={message}
      />
      <View
        style={{flex: 1, flexDirection: 'column', padding: responsiveWidth(2)}}>
        <InputSearchBarComponent
          value={searchBarValue}
          onChangeText={text => {
            setSearchBarValue(text);
            onChangeToShowContent(text, false);
          }}
          onSearchToPress={() => {
            setIsVisible(true);
            onStart();
          }}
        />
      </View>
    </>
  );
};
