import React, {FC} from 'react';
import {ColorValue, StyleProp, TextStyle, ViewStyle} from 'react-native';

export type CustomIconProps = {
  name: string;
  size?: number | undefined;
  color?: number | ColorValue | undefined;
  style?: StyleProp<TextStyle>;
  VectorIconComponent: any;
};

const CustomIcon = ({
  name,
  size = 24,
  color = '#000',
  style,
  VectorIconComponent,
}: CustomIconProps) => {
  return (
    <VectorIconComponent name={name} size={size} color={color} style={style} />
  );
};

export default CustomIcon;
