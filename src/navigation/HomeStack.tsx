import {
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import {Home} from '../screens/home/Home';
import {Search} from '../screens/home/search/Search';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {VoiceContextProvider} from '../context/VoiceContext';
import {HomeContextProvider} from '../context/HomeContext';
import {QuestionScreen} from '../screens/home/QuestionScreen/QuestionScreen';

export type HomeStackParamList = {
  Home: {name: string};
  Search?: {isVoiceRecognize?: boolean};
  QuestionScreen: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export type HomeStackNavigationProps = StackNavigationProp<
  HomeStackParamList,
  'Search'
>;

export type HomeStackScreenProps = NativeStackScreenProps<HomeStackParamList>;
export const HomeStack = () => {
  return (
    <HomeContextProvider>
      <VoiceContextProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="QuestionScreen" component={QuestionScreen} />
        </Stack.Navigator>
      </VoiceContextProvider>
    </HomeContextProvider>
  );
};
