import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {useCallback, useMemo} from 'react';
type ActionSheetComponentType = {
  onChange?: ((index: number) => void) | undefined;
  children: React.ReactNode;
  ref?: React.RefObject<BottomSheetMethods> | undefined;
};

export const ActionSheetComponent = ({
  children,
  onChange,
  ref,
}: ActionSheetComponentType) => {
  const snapPoint = useMemo(() => ['1%', '60%'], []);
  const onChangeSheet = useCallback(
    (index: number) => onChange && onChange(index),
    [],
  );
  return (
    <BottomSheet
      ref={ref}
      onChange={onChangeSheet}
      snapPoints={snapPoint}
      backdropComponent={(props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          onPress={() => {
            ref?.current?.close();
          }}
        />
      )}>
      {children}
    </BottomSheet>
  );
};
