import {AppDispatch, RootState} from '..';

export const renderWallet =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    console.log(getState());
  };
