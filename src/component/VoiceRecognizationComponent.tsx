import {View} from 'react-native';
import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {IconButtonComponent} from './IconButtonComponent';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, Text} from 'react-native-paper';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';

type VoiceRecognitionComponentType = {
  message?: string;
  isVisible: boolean;
  onStopIt: () => Promise<void>;
};
export const VoiceRecognitionComponent = ({
  isVisible,
  message,
  onStopIt,
}: VoiceRecognitionComponentType) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 5000, // Animation duration
      easing: Easing.out(Easing.exp),
    });
  }, []);
  return (
    <Modal isVisible={isVisible} style={{}} animationIn={'bounce'}>
      <View
        style={{
          backgroundColor: '#fff',
          flex: 1,
          borderRadius: responsiveWidth(8),
          flexDirection: 'column',
        }}>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <IconButtonComponent
            VectorIconComponent={Entypo}
            name="mic"
            size={7}
            iconButtonSize={7}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          />
        </View>
        <View style={{flex: 3, alignItems: 'center'}}>
          <Animated.View style={animatedStyle}>
            <Text style={{fontSize: responsiveFontSize(3)}}>
              {message ? message : 'Listening......'}
            </Text>
          </Animated.View>
        </View>
        <View style={{flex: 1}}>
          <Button onPress={() => onStopIt()}> Stop it!</Button>
        </View>
      </View>
    </Modal>
  );
};
