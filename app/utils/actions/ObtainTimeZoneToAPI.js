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

const URL_BASE =
  'https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz=';

const LOG_TAG = new Date().toISOString() + ' ' + 'ObtainTimeZoneToAPI.js';

class ObtainTimeZoneToAPI {
  constructor() {}

  //The name city should be null for the apy, an example should be turkey
  static async createRequestByName(nameCity, nameCountry) {
    if (!nameCountry) {
      throw new Error('Name City or Name of County is/are null');
    }
    try {
      let finalUrl;
      if (!nameCity) {
        finalUrl = URL_BASE + Util.doChangeIntoApiName(nameCountry);
        console.debug(
          LOG_TAG,
          'Final url into ObtainTimeZoneToAPI: ',
          finalUrl,
        );
      } else {
        finalUrl =
          URL_BASE +
          Util.doChangeIntoApiName(nameCountry) +
          '/' +
          Util.doChangeIntoApiName(nameCity);
        console.debug(
          LOG_TAG,
          'Final url into ObtainTimeZoneToAPI: ',
          finalUrl,
        );
      }
      return await fetch(finalUrl)
        .then(response => response.json())
        .then(responseJson => {
          responseJson.cityUrl = finalUrl;
          console.debug(
            LOG_TAG,
            'Object json into ObtainTimeZoneToAPI: ',
            responseJson,
          );
          return responseJson;
        })
        .catch(error => {
          throw error;
        });
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }

  static async createRequestByURL(url) {
    console.debug(LOG_TAG, 'URL in method createRequestByURL: ', url);
    return await fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.debug(LOG_TAG, responseJson);
        return responseJson;
      })
      .catch(error => {
        throw error;
      });
  }
}

export default ObtainTimeZoneToAPI;
