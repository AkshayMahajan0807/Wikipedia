import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {HomeStackScreenProps} from '../../../navigation/HomeStack';
import {InputSearchBarComponent} from '../../../component/InputSearchBarComponent';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useEffect, useState} from 'react';
import {VoiceRecognitionComponent} from '../../../component/VoiceRecognizationComponent';
import {useVoiceContext} from '../../../context/VoiceContext';
import {useHomeContext} from '../../../context/HomeContext';
import {ActionSheetComponent} from '../../../component/ActionSheetComponent';
import {LanguageComponent} from '../LanguageComponent';

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

  const [searchValue, setSearchValue] = useState('');
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
          iconName={searchValue || searchBarValue ? 'clear' : 'mic'}
          value={searchBarValue}
          onChangeText={text => {
            setSearchBarValue(text);
            setSearchValue(text);
            onChangeToShowContent(text, false);
          }}
          onSearchToPress={() => {
            searchValue || searchBarValue
              ? (() => {
                  setSearchValue('');
                  setSearchBarValue('');
                })()
              : (() => {
                  setIsVisible(true);
                  onStart();
                })();
          }}
        />
      </View>
    </>
  );
};
