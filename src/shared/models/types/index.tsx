import {NavigationProp, RouteProp} from '@react-navigation/core';

export interface GenericNavigation {
  navigation?: NavigationProp<any>;
  route?: RouteProp<any, any>;
}

export interface ChartItem {
  key: number;
  amount: number;
  svg: {fill: string};
  onPress?: (key: string) => void;
}

export enum ScreenSelectionType {
  Currency = 'currency',
  Langugage = 'language',
}
