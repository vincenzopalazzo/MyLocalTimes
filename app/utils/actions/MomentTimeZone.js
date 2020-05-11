'use strict';

import moment from 'moment-timezone';
import Util from '../Util';

const LOG_TAG = new Date().toISOString() + ' ' + 'MomentTimeZone.js ';

/**
 * @author https://github.com/vincenzopalazzo
 */
class MomentTimeZone {
  static timeZoneWithCityAnCountry(cityName, countryName, h24Format = true) {
    cityName = Util.doCapitalizeString(cityName);
    countryName = Util.doCapitalizeString(countryName);
    let format = this._getFormat(h24Format);
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
    console.debug(
      `${LOG_TAG} ${countryName}: ${moment.tz(countryName).format(format)}`,
    );
    return moment.tz(`${countryName}`).format(format);
  }

  static _getFormat(h24Format) {
    let format = 'HH:mm';
    if (h24Format === false) {
      format += ' A';
    }
    return format;
  }
}

export default MomentTimeZone;
