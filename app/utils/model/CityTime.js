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

import Util from '../Util';

const LOG_TAG = new Date().toISOString() + ' ' + 'CityTime.js';

/**
 * @deprecated This was implement inside in the first version of app, when the app worked with API and not with moment js
 */
class CityTime {
  static fromJsonToClass(jsonValue) {
    if (!jsonValue) {
      throw new Error('JSOn value null');
    }
    console.debug(LOG_TAG, 'City name: ', jsonValue.name);
    console.debug(LOG_TAG, 'Country name: ', jsonValue.country);
    console.debug(LOG_TAG, 'City difference: ', jsonValue.difference);
    console.debug(LOG_TAG, 'City urlOnline: ', jsonValue.urlOnline);
    console.debug(LOG_TAG, 'City time: ', jsonValue.time);
    let newDate = new Date(jsonValue.time);
    return new CityTime(
      jsonValue.name,
      jsonValue.country,
      jsonValue.difference,
      jsonValue.urlOnline,
      newDate,
    );
  }

  // This.name = this.country is necessary  because the API have some timezone with only country name
  constructor(name, country, difference, url, time = new Date()) {
    this.id = Math.random();
    this.name = name;
    this.country = Util.doCapitalizeString(country);
    if (!this.name) {
      this.name = this.country;
    }
    this.name = Util.doCapitalizeString(this.name);
    this.difference = difference;
    this.urlOnline = url;
    this.time = time;
  }

  _differenceByNow() {
    let nowDate = new Date();
    nowDate.setHours(nowDate.setHours() + this.difference);
    this.time = nowDate;
  }

  updateTimeWithData(date) {
    this.time = date;
  }

  toString() {
    //this._differenceByNow()
    return this.time.toTimeString().substr(0, 5);
  }
}

export default CityTime;
