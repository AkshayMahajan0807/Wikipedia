import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from './HomeStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {VoiceContextProvider} from '../context/VoiceContext';
import {HomeContextProvider} from '../context/HomeContext';
import {QuestionContextProvider} from '../context/QuestionContext';

export const AppNavigator = () => {
  console.log('this is app navigator');
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaProvider>
          <QuestionContextProvider>
            <HomeStack />
          </QuestionContextProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};
