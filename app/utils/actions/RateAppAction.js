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
