import * as React from 'react';

export const navigationRef: any = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

export function navToMerchant() {
  navigationRef.current?.navigate('Settings', {
    screen: 'EnableMerchant',
    initial: false,
  });
}

export const getCurrentRoute = () => {
  const route = navigationRef.getCurrentRoute();
  return route.name;
};
