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
import RNRestart from 'react-native-restart';
import I18n from 'i18n-js';
import {I18nManager} from 'react-native';
import memoize from 'lodash.memoize';

import en from '../config/language/en';
import it from '../config/language/it';
import Constant from './Constant';

const LOG_TAG = new Date().toISOString() + ' ' + 'LanguageProvider.js';

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
    this.translationGetters = {
      en,
      it,
    };
    this.languageSupported = [
      Constant.language.ITALIAN_SUPPORT,
      Constant.language.ENGLISH_US_SUPPORT,
      Constant.language.AUTO_LANGUAGE,
    ];

    this.autoupdateLanguage = true;
    this._configureBundle();
  }

  _configureBundle() {
    // fallback if no available language fits
    if (this.autoupdateLanguage === true) {
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
      I18n.translations = {
        [languageTag]: this.translationGetters[languageTag],
      };
      I18n.locale = languageTag;
    } else {
      let actual = I18n.locale;
      const {languageTag, isRTL} = RNLocalize.findBestAvailableLanguage(actual);

      // clear translation cache
      this.bundle.cache.clear();
      // update layout direction
      I18nManager.forceRTL(isRTL);

      // set i18n-js config
      I18n.translations = {
        [languageTag]: this.translationGetters[languageTag],
      };
      I18n.locale = languageTag;
    }
  }

  _isChangeLanguage() {
    if (!this.autoupdateLanguage) {
      return false;
    }
    let actualLanguage = RNLocalize.getLocales()[0].languageCode;
    console.debug(LOG_TAG, `Actual language: ${actualLanguage}`);
    console.debug(LOG_TAG, `Bundle language: ${I18n.locale}`);
    return actualLanguage !== I18n.locale;
  }

  async changeLanguage(newLanguage, auto) {
    this.autoupdateLanguage = auto;
    let lnTag;
    if (newLanguage === this.languageSupported[0]) {
      lnTag = 'it';
    } else {
      lnTag = 'en';
    }

    const {languageTag, isRTL} = RNLocalize.findBestAvailableLanguage(lnTag);

    // clear translation cache
    this.bundle.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);

    // set i18n-js config
    I18n.translations = {
      [languageTag]: this.translationGetters[languageTag],
    };
    I18n.locale = languageTag;
    RNRestart.Restart();
  }

  getCurrentLanguage() {
    if (this.autoupdateLanguage) {
      return this.getTranslate(Constant.language.AUTO_LANGUAGE);
    }
    let actualLanguage = RNLocalize.getLocales()[0].languageCode;
    if (actualLanguage === 'it') {
      return this.getTranslate(Constant.language.ITALIAN_SUPPORT);
    } else if (actualLanguage === 'en') {
      return this.getTranslate(Constant.language.ENGLISH_US_SUPPORT);
    }
  }

  getLanguageSupport() {
    return this.languageSupported.map(item => this.getTranslate(item));
  }

  getTranslate(key) {
    if (this._isChangeLanguage()) {
      console.debug(LOG_TAG, 'Language changed');
      this._configureBundle();
    }
    return this.bundle(key);
  }
}

export default LanguageProvider;
