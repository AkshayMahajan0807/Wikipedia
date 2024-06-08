import {createContext, useCallback, useContext, useState} from 'react';
import Voice, {
  SpeechEndEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
} from '@react-native-voice/voice';
import {useHomeContext} from './HomeContext';
import {questionData} from '../data/questionData';
interface IQuestionContext {
  onPressSelectQuestion: (question: string) => void;
  currentSelectedQuestion: string | null;
  answer: string[];
  onPressToRemoveAnswer: (ans: string) => void;
  onPressSelectedQuestionSetAns: (selectedAns: string) => void;
  questionAnswerPair: {
    question?: string;
    ans?: string;
  }[];
}

const QuestionContext = createContext<null | IQuestionContext>(null);

type QuestionContextProps = {children: React.ReactNode};

const QuestionContextProvider = ({children}: QuestionContextProps) => {
  const [currentSelectedQuestion, setCurrentSelectedQuestion] = useState<
    string | null
  >(null);
  const [questionAnswerPair, setQuestionAnswerPair] = useState<
    {
      question?: string;
      ans?: string;
    }[]
  >([]);
  const [answer, setAnswer] = useState(questionData.destinationOptions);
  const onPressSelectQuestion = (question: string) => {
    setCurrentSelectedQuestion(question);
  };

  const onPressToRemoveAnswer = (ans: string) => {
    setQuestionAnswerPair(questionAnswerPair.filter(item => item.ans !== ans));
    setAnswer([...answer, ans]);
  };

  const onPressSelectedQuestionSetAns = (selectedAns: string) => {
    if (currentSelectedQuestion) {
      const existItem = questionAnswerPair.find(
        q => q.question === currentSelectedQuestion,
      );
      if (existItem?.ans) {
        const pair = [
          {question: currentSelectedQuestion, ans: selectedAns},
          ...questionAnswerPair,
        ];
        const ans = existItem.ans;
        setAnswer([ans, ...answer.filter(ans => ans !== selectedAns)]);
        setQuestionAnswerPair(pair);
      } else {
        setAnswer(answer.filter(ans => ans !== selectedAns));
        const pair = [
          {question: currentSelectedQuestion, ans: selectedAns},
          ...questionAnswerPair,
        ];
        setQuestionAnswerPair(pair);
      }
    }
  };
  const value: IQuestionContext = {
    onPressSelectQuestion,
    currentSelectedQuestion,
    answer,
    onPressToRemoveAnswer,
    onPressSelectedQuestionSetAns,
    questionAnswerPair,
  };
  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};

const useQuestionContext = () => {
  const context = useContext<null | IQuestionContext>(QuestionContext);
  if (!context)
    throw new Error('Please Voice Context use in Voice Context Provider');
  return context;
};

export {QuestionContextProvider, useQuestionContext};
