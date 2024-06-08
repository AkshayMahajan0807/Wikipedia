import {ScrollView, View} from 'react-native';
import {HomeStackScreenProps} from '../../../navigation/HomeStack';
import {questionData} from '../../../data/questionData';
import {QuestionItem} from './QuestionItem';
import {Text} from 'react-native-paper';
import {AnswerItem} from './AnswerItem';
import {useQuestionContext} from '../../../context/QuestionContext';

export const QuestionScreen = ({navigation, route}: HomeStackScreenProps) => {
  const {answer} = useQuestionContext();
  return (
    <ScrollView>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Text style={{fontSize: 23, letterSpacing: 2}}>Question</Text>
        {questionData.sourceOptions.map((item, i) => (
          <QuestionItem question={item} key={item} />
        ))}
        <Text style={{fontSize: 23, letterSpacing: 2}}>Answer</Text>
        {answer.map(item => {
          return <AnswerItem ans={item} key={item} />;
        })}
      </View>
    </ScrollView>
  );
};
