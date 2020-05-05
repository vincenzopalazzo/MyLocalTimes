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

import * as RNLocalize from 'react-native-localize';
import I18n from 'i18n-js';
import {I18nManager} from 'react-native';
import memoize from 'lodash.memoize';

import en from '../config/language/en';
import it from '../config/language/it';

let _SINGLETON;

class LanguageProvider {
  static getInstance() {
    if (!_SINGLETON) {
      _SINGLETON = new LanguageProvider();
    }
    return _SINGLETON;
  }

  constructor() {
    this.bundle = memoize(
      (key, config) => I18n.t(key, config),
      (key, config) => (config ? key + JSON.stringify(config) : key),
    );
    this._initSupportedLanguage();
    this._configureBundle();
  }

  _initSupportedLanguage() {
    this.translationGetters = {
      en,
      it,
    };
  }

  _configureBundle() {
    // fallback if no available language fits
    const fallback = {languageTag: 'en', isRTL: false};

    const {languageTag, isRTL} =
      RNLocalize.findBestAvailableLanguage(
        Object.keys(this.translationGetters),
      ) || fallback;

    // clear translation cache
    this.bundle.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    I18n.translations = {[languageTag]: this.translationGetters[languageTag]};
    I18n.locale = languageTag;
  }

  getTranslate(key) {
    return this.bundle(key);
  }
}

export default LanguageProvider;
