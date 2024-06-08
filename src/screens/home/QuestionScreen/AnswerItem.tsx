import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useQuestionContext} from '../../../context/QuestionContext';
export const AnswerItem = memo(({ans = '1'}: {ans?: string}) => {
  const {onPressSelectedQuestionSetAns} = useQuestionContext();
  return (
    <View
      style={{
        flexDirection: 'column',
        paddingVertical: 4,
        paddingHorizontal: 5,
      }}>
      <View style={{}}>
        <TouchableOpacity
          onPress={() => onPressSelectedQuestionSetAns(ans)}
          style={{
            backgroundColor: 'gray',
            padding: 20,
            borderRadius: 8,
            borderWidth: 1,
          }}>
          <Text> {ans}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
