import React from 'react';
import { StatusBar } from 'react-native';

import 'react-native-gesture-handler';
import './config/ReactotronConfig';
import { Provider } from 'react-redux';

import store from './store';
import Routes from './routes';
import NavigationService from './services/navigation';
import colors from './styles/colors';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
      <Routes
        ref={(navigatorRef) => NavigationService.setNavigator(navigatorRef)}
      />
    </Provider>
  );
}
