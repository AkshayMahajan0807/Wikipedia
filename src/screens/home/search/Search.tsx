import {FlatList, TextInput, View} from 'react-native';
import {Text} from 'react-native-paper';
import {HomeStackScreenProps} from '../../../navigation/HomeStack';
import {InputSearchBarComponent} from '../../../component/InputSearchBarComponent';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useEffect, useRef, useState} from 'react';
import {VoiceRecognitionComponent} from '../../../component/VoiceRecognizationComponent';
import {useVoiceContext} from '../../../context/VoiceContext';
import {useHomeContext} from '../../../context/HomeContext';
import {ActionSheetComponent} from '../../../component/ActionSheetComponent';
import {LanguageComponent} from '../LanguageComponent';
import {RecentSearchItem} from './RecentSearchItem';

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

  const {
    onChangeToShowContent,
    searchBarValue,
    setSearchBarValue,
    storeSearchKeyword,
    tempStoreSearchKeyword,
    onKeywordFilter,
    setTempStoreSearchKeyword,
    inputRef,
    isShowRecentSearchKeyWords,
    onFocusToSearchBar,
    onStoreSearchKeyword,
  } = useHomeContext();
  useEffect(() => {
    if (isVoiceRecognize) {
      startToExecuteVoice();
      onStart();
    }
  }, [isVoiceRecognize]);

  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    setTimeout(() => {
      console.log('focused', inputRef.current);

      inputRef.current?.focus();
    }, 1000);
  }, []);
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
          ref={inputRef}
          onFocus={() => onFocusToSearchBar()}
          onSubmitEditing={() => {
            onStoreSearchKeyword(searchValue);
          }}
          onChangeText={text => {
            onKeywordFilter(text);
            setSearchBarValue(text);
            setSearchValue(text);
            onChangeToShowContent(text, false);
          }}
          // inputStyle={{textAlign: 'right'}}
          // style={{textAlign: 'right'}}
          onSearchToPress={() => {
            searchValue || searchBarValue
              ? (() => {
                  setSearchValue('');
                  setSearchBarValue('');
                  setTempStoreSearchKeyword(storeSearchKeyword);
                })()
              : (() => {
                  setIsVisible(true);
                  onStart();
                })();
          }}
        />
        {isShowRecentSearchKeyWords && (
          <FlatList
            data={tempStoreSearchKeyword}
            style={{flex: 1}}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RecentSearchItem item={item} />}
            ListFooterComponent={() => <View style={{}} />}
            ListFooterComponentStyle={{paddingBottom: responsiveHeight(10)}}
          />
        )}
      </View>
    </>
  );
};
