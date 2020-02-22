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

import NetInfo from "@react-native-community/netinfo";

const LOG_TAG = new Date().toISOString() + ' ' + 'Util.js ';

class Util{

    static doChangeIntoApiName(stringName){
        if(!stringName){
            throw new Error('String pass to Util are not correct, the value is: ', stringName);
        }
        stringName = stringName.trim();
        console.debug(LOG_TAG, ' final string after regex is: ', stringName);
        let stringSpit = stringName.split(' ');
        let finalString = '';
        for(let i = 0; i < stringSpit.length; i++){
            let firstLetter = stringSpit[i].substr(0, 1);
            let remainString = stringSpit[i].substr(1, stringName.length);
            finalString += firstLetter.toUpperCase() + remainString.toLowerCase();
            if(i !== (stringSpit.length - 1)){
                finalString += '_';
            }
        }
        console.debug(LOG_TAG, 'Final String is: ', finalString);
        //This create a bug with this example string New_York => New_york and the api is key sensitive
        console.debug(LOG_TAG, 'Api name is: ', finalString);
        return finalString;
    }

    //TODO this method fixed the JSON reconverter
    //but I want fix this bug
    static doPrintTime(time){
        if(!time){
            throw new Error(' The time is not valid');
        }
        return time.toTimeString().substr(0, 5).toString();
    }

    static async doCheckDeviceNetwork(){
        let connectionIsReady = false;
        await NetInfo.fetch().then(state => {
            connectionIsReady = state.isConnected;
            console.debug(LOG_TAG, 'Network device is ', connectionIsReady === true ? 'enable' : 'disable');
        });
        return connectionIsReady;
    }
}

export default Util;