import React from 'react';

import { createDrawerNavigator } from 'react-navigation-drawer'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { HomeStackNavigator } from './src/components/home/home';
import { StudentStackNavigator } from './src/components/student/student'

import { Provider } from 'react-redux'
import { store } from "./src/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>
  );
}

const AppDrawerNavigator = createDrawerNavigator({
  Home:{
    screen: HomeStackNavigator
  },
  Student:{
    screen: StudentStackNavigator
  }
})

const AppSwitcherNavigator = createSwitchNavigator({
  Home:{
    screen: AppDrawerNavigator
  }
})

const AppContainer = createAppContainer(AppSwitcherNavigator);