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
'use strict';

import AsyncStorage from '@react-native-community/async-storage';

const LOG_TAG = new Date().toISOString() + ' ' + 'DAOAndroidStorage.js';

class DAOAndroidStorage {
  static async putObjectWithKey(key, object) {
    if (!key || !object) {
      throw new Error('Key or object are null');
    }
    try {
      await AsyncStorage.setItem(key, JSON.stringify(object));
    } catch (e) {
      console.warn(LOG_TAG, `Error generated is ${e.message}`);
      throw e;
    }
  }

  static async getObjectWithKey(key) {
    if (!key) {
      throw new Error('Key is null');
    }
    try {
      let item = await AsyncStorage.getItem(key);
      return JSON.parse(item);
    } catch (e) {
      console.warn(LOG_TAG, `Error generated is ${e.message}`);
      throw e;
    }
  }

  static async mergeObjectWithKey(key) {
    if (!key) {
      throw new Error('Key is null');
    }
    //TODO
    throw new Error('method mergeObjectWithKey not implemented');
  }
}

export default DAOAndroidStorage;
