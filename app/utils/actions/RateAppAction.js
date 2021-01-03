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

import Rate, {AndroidMarket} from 'react-native-rate';

class RateAppAction {
  static doRateApp() {
    const options = {
      //AppleAppID: '2193813192',
      GooglePackageName: 'com.mybetweentime',
      //AmazonPackageName: 'com.mywebsite.myapp',
      //OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: false,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'http://www.mywebsite.com/myapp.html',
    };
    Rate.rate(options, success => {
      if (success) {
        //TODO SEE THIS
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        //this.setState({rated: true});
      }
    });
  }
}

export default RateAppAction;
