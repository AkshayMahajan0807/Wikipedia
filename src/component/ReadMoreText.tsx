import {useCallback, useEffect, useState} from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {Text} from 'react-native-paper';

export const ReadMoreText = ({
  readMoreStyle,
  text,
  textStyle,
}: {
  readMoreStyle?: StyleProp<TextStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
}) => {
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [textShown, setTextShown] = useState(false);
  const [numLines, setNumLines] = useState<any>(undefined);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  useEffect(() => {
    setNumLines(textShown ? undefined : 3);
  }, [textShown]);

  const onTextLayout = useCallback(
    (e: any) => {
      if (e.nativeEvent.lines.length > 3 && !textShown) {
        setShowMoreButton(true);
        setNumLines(3);
      }
    },
    [textShown],
  );

  return (
    <>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={numLines}
        style={textStyle}
        ellipsizeMode="tail">
        {text}
      </Text>

      {showMoreButton ? (
        <Text onPress={toggleTextShown} style={readMoreStyle}>
          {textShown ? 'Read Less' : 'Read More'}
        </Text>
      ) : null}
    </>
  );
};
