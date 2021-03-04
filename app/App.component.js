/**
 * MyLocalTimes is an mobile app for consulting the local time of the cities.
 * Copyright (C) 2020-2021 Vincenzo Palazzo vincenzopalazzodev@gmail.com
 *
 * This program is free software; you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */
import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import MyBetweenTime from './index';
import MyLocalTimesSetting from './components/SettingView/MyLocalTimesSetting.component';
import LocalTimeDrawer from './components/LocalTimeDrawer/LocalTimeDrawer.component';
import Constant from './utils/Constant';
import Util from './utils/Util';
import DAOAppStorage from './utils/DAOAppStorage';

const DrawerNavigation = createDrawerNavigator();

class MyLocalTimesApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: true,
    };
    this.initDatabaseWithLocalInfo = this.initDatabaseWithLocalInfo.bind(this);
  }

  async initDatabaseWithLocalInfo() {
    const timeFormat = Util.getTimeFormatPreferer();
    await DAOAppStorage.getObjectWithKeyDefVal(
      Constant.db.TIME_FORMAT,
      timeFormat,
    );
    // TODO: Choose also the APP language
  }

  async componentDidMount() {
    await this.initDatabaseWithLocalInfo();
  }

  render() {
    return (
      <NavigationContainer>
        <DrawerNavigation.Navigator
          drawerContent={props => (
            <LocalTimeDrawer
              {...props}
              changeTimeFormat={newValue =>
                this.setState({
                  timeFormat: newValue,
                })
              }
            />
          )}
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
