import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import Carousel, {CarouselRenderItem} from 'react-native-reanimated-carousel';
const width = Dimensions.get('window').width;

type CarouselComponentType = {
  renderItem: CarouselRenderItem<number>;
  loop?: boolean | undefined;
  width: number;
  height: number;
  autoPlay?: boolean | undefined;
  data: any[];
  scrollAnimationDuration?: number | undefined;
  onSnapToItem?: ((index: number) => void) | undefined;
};
export const CarouselComponent = ({
  height,
  renderItem,
  width,
  autoPlay,
  data,
  loop,
  onSnapToItem,
  scrollAnimationDuration,
}: CarouselComponentType) => {
  return (
    <Carousel
      loop={loop}
      width={width}
      height={height}
      autoPlay={autoPlay}
      data={data}
      scrollAnimationDuration={scrollAnimationDuration}
      onSnapToItem={onSnapToItem}
      renderItem={renderItem}
    />
  );
};
