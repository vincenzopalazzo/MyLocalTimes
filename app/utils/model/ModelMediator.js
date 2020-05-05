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

let _SINGLETON;
//@deprecated
class ModelMediatorSingleton {
  constructor() {
    this.repository = new Map([]);
  }

  static getInstance() {
    if (!_SINGLETON) {
      _SINGLETON = new ModelMediatorSingleton();
    }
    return _SINGLETON;
  }

  putBean(key, object) {
    if (!key || !object) {
      throw new Error('Object or key is/are null');
    }
    this.repository.set(key, object);
  }

  getBean(key) {
    if (!key) {
      throw new Error('Key null');
    }
    if (this.repository.has(key)) {
      return this.repository.get(key);
    }
    throw undefined;
  }
}

export default ModelMediatorSingleton;
