import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import colors from './styles/colors';

import Home from './pages/Home';
import Cart from './pages/Cart';

import Header from './components/Header';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Home,
      Cart,
    },
    {
      defaultNavigationOptions: (navigation) => ({
        // Substitui o cabeçalho padrão por um componente customizado
        header: () => <Header {...navigation} />,

        // headerTitleAlign: 'center',
        // headerStyle: {
        //   backgroundColor: '#7159c1',
        // },
        // headerTintColor: '#fff',
        // headerBackTitleVisible: false,
        // gestureDirection: 'horizontal',
        // cardStyleInterpolator: forHorizontalModal,
        cardStyle: {
          backgroundColor: colors.dark,
        },
      }),
    }
  )
);

export default Routes;
