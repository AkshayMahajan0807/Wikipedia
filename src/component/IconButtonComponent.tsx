import React from 'react';
import {IconButton, MD3Colors} from 'react-native-paper';

import CustomIcon, {CustomIconProps} from './CustomIcon';
import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
type IconButtonComponent = {
  name: string;
  size?: number | undefined;
  color?: number | ColorValue | undefined;
  style?: StyleProp<TextStyle>;
  VectorIconComponent: any;
  iconButtonSize?: number;
  onPress?:
    | (((event: GestureResponderEvent) => void) &
        ((e: GestureResponderEvent) => void) &
        ((e: GestureResponderEvent) => void))
    | undefined;
};
export const IconButtonComponent = ({
  VectorIconComponent,
  name,
  color,
  size = 2,
  style,
  onPress,
  iconButtonSize = 2,
}: IconButtonComponent) => {
  return (
    <IconButton
      icon={() => (
        <CustomIcon
          VectorIconComponent={VectorIconComponent}
          name={name}
          color={color}
          size={responsiveFontSize(size)}
          style={[{}, style]}
        />
      )}
      iconColor={MD3Colors.error50}
      size={responsiveFontSize(iconButtonSize)}
      onPress={onPress}
    />
  );
};
