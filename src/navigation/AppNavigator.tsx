import {NavigationContainer} from '@react-navigation/native';
import {HomeStack} from './HomeStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {VoiceContextProvider} from '../context/VoiceContext';
import {HomeContextProvider} from '../context/HomeContext';

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
          <HomeStack />
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};
