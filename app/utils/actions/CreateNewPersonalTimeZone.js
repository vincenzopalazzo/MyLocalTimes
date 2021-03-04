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
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */
import MomentTimeZone from '../MomentTimeZone';
import TimeZoneCity from '../model/TimeZoneCity';
import Util from '../Util';
import DAOAppStorage from '../DAOAppStorage';
import Constant from '../Constant';

const LOG_TAG = `${new Date().toISOString()} CreateNewPersonalTimeZone.js`;

class CreateNewPersonalTimeZone {
  static createNewTimeZone(cityName, countryName) {
    if (!countryName) {
      throw new Error(
        `Error, the country name should be not undefined, but the value now is ${countryName}`,
      );
    }
    let onlyCountry = false;
    if (!cityName) {
      onlyCountry = true;
    }
    countryName = Util.doChangeIntoApiName(countryName);
    let formatH24 = undefined;
    DAOAppStorage.getObjectWithKey(Constant.db.TIME_FORMAT).then(value => {
      formatH24 = value;
    });
    console.warn(LOG_TAG, `Format H24 -> ${formatH24}`);
    let timezone;
    try {
      if (onlyCountry === true) {
        timezone = MomentTimeZone.timeZoneWithCountry(countryName, formatH24);
      } else {
        cityName = Util.doChangeIntoApiName(cityName);
        timezone = MomentTimeZone.timeZoneWithCityAnCountry(
          cityName,
          countryName,
          formatH24,
        );
      }
    } catch (e) {
      throw e;
    }

    return new TimeZoneCity({
      city: cityName,
      country: countryName,
      time: timezone,
    });
  }
}

export default CreateNewPersonalTimeZone;
