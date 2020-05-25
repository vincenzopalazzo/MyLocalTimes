'use strict';

import {Share} from 'react-native';

class ShareAppAction {
  static async doShareWith(message) {
    try {
      const result = await Share.share({
        message: message,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
}

export default ShareAppAction;
