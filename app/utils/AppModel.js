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
let _SINGLETON;

class AppModel {
  static getInstance() {
    if (_SINGLETON === undefined) {
      _SINGLETON = new AppModel();
    }
    return _SINGLETON;
  }

  constructor() {
    this.mapModel = new Map();
  }

  putValue(key: String, value: Object) {
    this.mapModel.set(key, value);
  }

  getValue(key: String) {
    let value = this.mapModel.get(key);
    if (value === undefined) {
      throw Error(`There is no element with the key ${key}`);
    }
    return value;
  }
}

export default AppModel;
