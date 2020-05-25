import React, {Component} from 'react';
import {View} from 'react-native';

import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

import MyBetweenTime from './index';
import MyLocalTimesSetting from './components/SettingView/MyLocalTimesSetting.component';
import LocalTimeDrawer from './components/LocalTimeDrawer/LocalTimeDrawer.component';
import Constant from './utils/Constant';
import LanguageProvider from './utils/LanguageProvider';

const DrawerNavigation = createDrawerNavigator();

class MyLocalTimesApp extends Component {
  constructor(props) {
    super(props);
    this.setState({
      update: true,
    });
  }

  render() {
    return (
      <NavigationContainer>
        <DrawerNavigation.Navigator
          drawerContent={props => <LocalTimeDrawer {...props} />}
          initialRouteName={Constant.navigation.HOME}>
          <DrawerNavigation.Screen
            name={Constant.navigation.HOME}
            component={MyBetweenTime}
          />
          <DrawerNavigation.Screen
            name={Constant.navigation.SETTING}
            component={MyLocalTimesSetting}
          />
        </DrawerNavigation.Navigator>
      </NavigationContainer>
    );
  }
}

export default MyLocalTimesApp;
