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
import Util from '../Util';

const LOG_TAG = new Date().toISOString() + ' ' + 'TimeZoneCity.js ';

class TimeZoneCity {
  constructor(timeZoneCity) {
    if (timeZoneCity instanceof Object) {
      this.nameCity = timeZoneCity.city;
      this.countryName = timeZoneCity.country;
      this.time = timeZoneCity.time;
      this.id = timeZoneCity.id;
      if (!this.id) {
        this.id = Math.random() * 100000 | 0;
      }
    }
  }

  getTime = () => this.time;

  setTime = time => (this.time = time);

  static fromJsonToClass(jsonValue) {
    if (!jsonValue) {
      throw new Error(
        `ERROR inside method fromJsonToClass: JSON value equal to ${jsonValue}`,
      );
    }
    console.debug(
      LOG_TAG,
      `JSON before create class in method fromJsonToClass ${jsonValue}`,
    );
    return new TimeZoneCity({
      id: jsonValue.id,
      city: jsonValue.nameCity,
      country: jsonValue.countryName,
      time: jsonValue.time,
    });
  }

  toString() {
    console.debug(
      LOG_TAG,
      `toString in TimeZoneCity with nameCity: ${
        this.nameCity
      } and countryName ${this.countryName}`,
    );
    if (!this.nameCity) {
      return Util.doCapitalizeString(this.countryName);
    }
    this.nameCity = Util.doCapitalizeString(this.nameCity);
    this.countryName = Util.doCapitalizeString(this.countryName);
    return `${this.countryName}/${this.nameCity}`;
  }
}

export default TimeZoneCity;
