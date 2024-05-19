import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {languagesData} from '../screens/home/languagesData';
import {languageDataType} from '../types/type';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IHomeContext {
  currentSelectedLanguage: languageDataType;
  onPressSelectLanguage: (obj: languageDataType) => void;
  languageRandomId: number;
  onChangeToShowContent: (content: string, isVoice: boolean) => Promise<void>;
  setSearchBarValue: React.Dispatch<React.SetStateAction<string>>;
  searchBarValue: string;
  setInVisible: React.Dispatch<React.SetStateAction<boolean>>;
  inVisible: boolean;
}

const HomeContext = createContext<null | IHomeContext>(null);

type HomeContextProps = {children: React.ReactNode};

const HomeContextProvider = ({children}: HomeContextProps) => {
  console.log('home context provider');

  const [currentSelectedLanguage, setCurrentSelectedLanguage] =
    useState<languageDataType>(languagesData[4]);
  const [inVisible, setInVisible] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState('');
  const [languageRandomId, setLanguageRandomId] = useState<number>(-10);
  const onPressSelectLanguage = useCallback(async (obj: languageDataType) => {
    setLanguageRandomId(Math.random() * obj.lgn_id * 10);
    setCurrentSelectedLanguage(obj);
    await AsyncStorage.setItem('language_Code', obj.lgn_code);
  }, []);
  const onLanguageTranslation = async (text: string, langCode: string) => {
    const lang = langCode ? langCode : 'en';
    console.log('current selected lng', currentSelectedLanguage?.lgn_code);
    let response = '';
    try {
      // response = await languageTranslationApi.translateData(text, lang);
      // console.log('translated language', response);
    } catch (error) {
      console.log('error', error);
    }
    return response;
  };

  useEffect(() => {
    (async () => {
      await AsyncStorage.setItem(
        'language_Code',
        currentSelectedLanguage.lgn_code,
      );
    })();
  }, []);
  const searchContent = async (content: string, lang_code: string) => {
    console.log('content function');
    try {
      setInVisible(true);
      // const {data} = await HomeApi.get(
      //   content,
      //   lang_code,
      // );
      // console.log('data', data);
      // data && setSearchData(data);
      setInVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeToShowContent = async (
    content: string,
    isVoice: boolean = false,
  ) => {
    try {
      const languageCode: string | null = await AsyncStorage.getItem(
        'language_Code',
      );
      console.log(
        'current selected language',
        currentSelectedLanguage?.lgn_code,
        'languageCode async storage',
        languageCode,
      );

      setSearchBarValue(content);
      console.log('content', content, currentSelectedLanguage?.lgn_code);

      if (content?.length > 2 && !isVoice) {
        if (
          currentSelectedLanguage?.lgn_code == 'en' ||
          !currentSelectedLanguage?.lgn_code
        ) {
          await searchContent(content.trim(), 'en');
        } else if (content.endsWith(' ') == true) {
          console.log('onLanguageTranslation');
          setInVisible(true);
          const response = await onLanguageTranslation(
            content,
            currentSelectedLanguage?.lgn_code,
          );
          setInVisible(false);
          console.log('response', response);
          setSearchBarValue(response);
          await searchContent(response, languageCode ?? 'en');
        } else {
          console.log('nothing to the search');
        }
      } else if (isVoice) {
      }
    } catch (error) {
      console.log('error', error);
    }
    // const response = await onLanguageTranslation(
    //   content,
    //   currentSelectedLanguage?.lgn_code,
    // );
    // console.log("current language selected responser",response);
  };
  const value: IHomeContext = {
    currentSelectedLanguage,
    onPressSelectLanguage,
    languageRandomId,
    onChangeToShowContent,
    inVisible,
    searchBarValue,
    setInVisible,
    setSearchBarValue,
  };
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

const useHomeContext = () => {
  const context = useContext<null | IHomeContext>(HomeContext);
  if (!context)
    throw new Error('Please Home Context use in Home COntext Provider');
  return context;
};

export {HomeContextProvider, useHomeContext};
