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

export default {
  modelMediator: {
    REPOSITORY: 'REPOSITORY',
    INIT: 'INIT',
    APP_STATUS: 'APP_STATUS',
  },
  language: {
    HOME_titleAppBar: 'HOME_titleAppBar',
    HOME_newTimeZone: 'HOME_newTimeZone',
    HOME_createNewTimezone: 'HOME_createNewTimezone',
    SNACKBAR_successUpdateDataset: 'SNACKBAR_successUpdateDataset',
    SNACKBAR_failUpdateDataset: 'SNACKBAR_failUpdateDataset',
    SNACKBAR_connectionFail: 'SNACKBAR_connectionFail',
    SNACKBAR_textButtonClose: 'SNACKBAR_textButtonClose',
    DRAWER_TITLE: 'DRAWER_TITLE',
    CARD_VIEW_BANNER_DELETE: 'CARD_VIEW_BANNER_DELETE',
    CARD_VIEW_BANNER_ADD_ALARM: 'CARD_VIEW_BANNER_ADD_ALARM',
    CARD_VIEW_BANNER_CLOSE: 'CARD_VIEW_BANNER_CLOSE',
    ERROR_DIALOG_MESSAGE: 'ERROR_DIALOG_MESSAGE',
    NEW_TIME_ZONE_SEARCH_TEXT: 'NEW_TIME_ZONE_SEARCH_TEXT',
    NEW_TIME_ZONE_INFO_TEXT: 'NEW_TIME_ZONE_INFO_TEXT',
    PLACEHOLDER_INSERT_CITY_EXAMPLE: 'PLACEHOLDER_INSERT_CITY_EXAMPLE',
    PLACEHOLDER_INSERT_COUNTRY_EXAMPLE: 'PLACEHOLDER_INSERT_COUNTRY_EXAMPLE',
    CITY_EXIST_ALREADY: 'CITY_EXIST_ALREADY',
    MESSAGE_REFRESH_LIST: 'MESSAGE_REFRESH_LIST',
    DRAWER_HOME: 'DRAWER_HOME',
    DRAWER_SETTING: 'DRAWER_SETTING',
    DRAWER_SHARE: 'DRAWER_SHARE',
    DRAWER_RATE: 'DRAWER_RATE',
    VIEW_SETTING_TIME: 'VIEW_SETTING_TIME',
    VIEW_SETTING_THEME: 'VIEW_SETTING_THEME',
    VIEW_SETTING_LANGUAGE: 'VIEW_SETTING_LANGUAGE',
    VIEW_SETTING_EXTRA: 'VIEW_SETTING_EXTRA',
    SHARE_MESSAGE: 'SHARE_MESSAGE',
    ITALIAN_SUPPORT: 'ITALIAN_SUPPORT',
    ENGLISH_US_SUPPORT: 'ENGLISH_US_SUPPORT',
    AUTO_LANGUAGE: 'AUTO_LANGUAGE',
    CANCEL_BUTTON_DIALOG_LANGUAGE: 'CANCEL_BUTTON_DIALOG_LANGUAGE',
    OK_BUTTON_DIALOG_LANGUAGE: 'OK_BUTTON_DIALOG_LANGUAGE',
  },
  navigation: {
    HOME: 'HOME',
    SETTING: 'SETTING',
  },
  db: {
    TIME_FORMAT: 'typeHoursFormat',
    DARK_THEME: 'darkTheme',
  },
};
