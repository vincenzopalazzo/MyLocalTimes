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

import CityTime from '../model/CityTime'
import ObtainTimeZoneToAPI from "./ObtainTimeZoneToAPI";

const LOG_TAG = new Date().toISOString() + ' ' + 'CreateNewPersonalTimeZone.js';

class CreateNewPersonalTimeZone {

    constructor() {}

    static async doAction(cityName, countryName) {
        if (!cityName && !countryName) {
            throw new Error('County name or/and City name isn\'t valid');
        }
        try {
            return await ObtainTimeZoneToAPI.createRequestByName(cityName, countryName).then(jsonResponse => {
                console.debug(LOG_TAG, jsonResponse);
                let newDate = new Date(jsonResponse.year,
                    jsonResponse.month,
                    jsonResponse.day,
                    jsonResponse.hours,
                    jsonResponse.minutes,
                    jsonResponse.seconds,
                    jsonResponse.millis);
                let newCityTime = new CityTime(cityName, 0, jsonResponse.cityUrl, newDate);
                console.debug(LOG_TAG, newCityTime);
                return newCityTime;
            }).catch(error => {
                console.error(error);
                throw error;
            });
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

export default CreateNewPersonalTimeZone;