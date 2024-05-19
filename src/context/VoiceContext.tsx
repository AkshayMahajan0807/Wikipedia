import {createContext, useCallback, useContext, useState} from 'react';
import Voice, {
  SpeechEndEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
} from '@react-native-voice/voice';
import {useHomeContext} from './HomeContext';
interface IVoiceContext {
  startToExecuteVoice: () => () => void;
  onSpeechStart: (e: SpeechStartEvent) => void;
  onSpeechEnd: (e: SpeechEndEvent) => void;
  onStart: () => Promise<void>;
  onStop: () => Promise<void>;
  message: string;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const VoiceContext = createContext<null | IVoiceContext>(null);

type VoiceContextProps = {children: React.ReactNode};

const VoiceContextProvider = ({children}: VoiceContextProps) => {
  const [message, setMessage] = useState('');
  console.log('voice context');
  const {currentSelectedLanguage, onChangeToShowContent, searchBarValue} =
    useHomeContext();
  const [isVisible, setIsVisible] = useState(false);
  const onSpeechStart = (e: SpeechStartEvent) => {
    console.log('voice recognize start', e);
  };
  console.log('voice context', currentSelectedLanguage.lgn_code);
  const onStart = useCallback(async () => {
    await Voice.start(currentSelectedLanguage.lgn_code);
    setIsVisible(true);
  }, [currentSelectedLanguage]);
  const onSpeechEnd = useCallback((e: SpeechEndEvent) => {
    console.log('on Speech end', e);
    Voice.removeAllListeners();
    setTimeout(() => {
      setIsVisible(false);
    }, 1000);
  }, []);
  const onStop = async () => {
    await Voice.stop();
    Voice.removeAllListeners();
  };
  const onSpeechResults = useCallback((e: SpeechResultsEvent) => {
    console.log(':speech result', e);
    onChangeToShowContent(e.value ? e.value[0] : '', true);
    setMessage(e.value ? e.value[0] : '');
  }, []);
  const startToExecuteVoice = useCallback(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const value: IVoiceContext = {
    startToExecuteVoice,
    onSpeechStart,
    onSpeechEnd,
    onStart,
    onStop,
    message,
    isVisible,
    setIsVisible,
    setMessage,
  };
  return (
    <VoiceContext.Provider value={value}>{children}</VoiceContext.Provider>
  );
};

const useVoiceContext = () => {
  const context = useContext<null | IVoiceContext>(VoiceContext);
  if (!context)
    throw new Error('Please Voice Context use in Voice Context Provider');
  return context;
};

export {VoiceContextProvider, useVoiceContext};
