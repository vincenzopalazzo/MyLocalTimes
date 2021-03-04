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

import moment from 'moment-timezone';
import Util from './Util';

const LOG_TAG = new Date().toISOString() + ' ' + 'MomentTimeZone.js ';

/**
 * @author https://github.com/vincenzopalazzo
 */
class MomentTimeZone {
  static timeZoneWithCityAnCountry(cityName, countryName, h24Format = true) {
    cityName = Util.doCapitalizeString(cityName);
    countryName = Util.doCapitalizeString(countryName);
    let format = this._getFormat(h24Format);
    let isValidZone = moment.tz.zone(`${countryName}/${cityName}`);
    if (!isValidZone) {
      throw new Error('Invalid Zone');
    }
    console.debug(
      `${LOG_TAG} ${countryName}/${cityName}: ${moment
        .tz(countryName + '/' + cityName)
        .format(format)}`,
    );
    return moment.tz(`${countryName}/${cityName}`).format(format);
  }

  static timeZoneWithCountry(countryName, h24Format = true) {
    countryName = Util.doCapitalizeString(countryName);
    let format = this._getFormat(h24Format);
    let isValidZone = moment.tz.zone(`${countryName}`);
    if (!isValidZone) {
      throw new Error('Invalid Zone');
    }
    console.debug(
      `${LOG_TAG} ${countryName}: ${moment.tz(countryName).format(format)}`,
    );
    return moment.tz(`${countryName}`).format(format);
  }

  static timeZoneWithFormat(format, h24 = true) {
    if (!format) {
      throw new Error(
        `ERROR inside method timeZoneWithFormat, the format value is ${format}`,
      );
    }
    let timeZoneFormat = this._getFormat(h24);
    let isValidZone = moment.tz.zone(`${format}`);
    if (!isValidZone) {
      throw new Error('Invalid Zone');
    }
    console.debug(
      `${LOG_TAG} ${format}: ${moment.tz(format).format(timeZoneFormat)}`,
    );
    return moment.tz(format).format(timeZoneFormat);
  }

  static _getFormat(h24Format) {
    let format = 'HH:mm';
    if (h24Format === false) {
      format = 'h:mm A';
    }
    return format;
  }
}

export default MomentTimeZone;
