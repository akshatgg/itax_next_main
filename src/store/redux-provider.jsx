'use client';
import { Provider } from 'react-redux';
import store from '@/store/index';
function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
