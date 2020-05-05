/**
 * MyLocalTimes is an mobile app for consulting the local time of the cities.
 * Copyright (C) 2020 Vincenzo Palazzo vincenzopalazzodev@gmail.com

 * This program is free software; you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.

 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */

import {StyleSheet, Platform} from 'react-native';

import DeviceInfo from 'react-native-device-info';

export default StyleSheet.create({
  droidSafeAreaTop: {
    flex: 0,
    backgroundColor: '#2780E3',
    paddingTop:
      Platform.OS === 'android' && DeviceInfo.hasNotch === true ? 25 : 0,
  },
  droidSafeAreaDown: {
    flex: 1,
    //backgroundColor: '#2780E3',
    paddingBottom:
      Platform.OS === 'ios' && DeviceInfo.hasNotch === true ? 10 : 0,
  },
  appBar: {
    height: 65,
  },
  loadingIndicator: {
    position: 'absolute',
    margin: 16,
    right: '45%',
    top: '80%',
  },
  snackbar: {
    backgroundColor: '#373A3C',
    margin: 25,
  },
});
