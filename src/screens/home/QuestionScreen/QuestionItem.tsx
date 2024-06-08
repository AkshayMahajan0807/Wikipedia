import React, {memo} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useQuestionContext} from '../../../context/QuestionContext';
export const QuestionItem = memo(
  ({question, ans = '1'}: {question: string; ans?: string}) => {
    const {
      onPressSelectQuestion,
      currentSelectedQuestion,
      onPressToRemoveAnswer,
      questionAnswerPair,
    } = useQuestionContext();
    const questionAns = questionAnswerPair.find(
      item => item.question == question,
    );

    return (
      <View
        style={{
          flexDirection: 'column',
          paddingVertical: 5,
          paddingHorizontal: 5,
        }}>
        <View style={{borderRadius: 8, borderWidth: 1, height: 90}}>
          <TouchableOpacity
            style={{
              backgroundColor:
                currentSelectedQuestion === question ? '#dfdf' : '#ffff',
              padding: 10,
              borderRadius: 8,
            }}
            onPress={() => onPressSelectQuestion(question)}>
            <Text style={{fontSize: responsiveFontSize(2), letterSpacing: 2}}>
              {question}
            </Text>
          </TouchableOpacity>
          {questionAns?.ans && (
            <TouchableOpacity
              onPress={() => onPressToRemoveAnswer(questionAns?.ans ?? '')}>
              <Text> {questionAns?.ans}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);
