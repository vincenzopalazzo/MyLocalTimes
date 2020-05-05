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

import {StyleSheet, Dimensions} from 'react-native';
import React from 'react';

export default StyleSheet.create({
  buttonsDialog: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textFooter: {
    alignSelf: 'center',
  },
  textInput: {
    marginTop: 16,
    fontSize: 16,
  },
  chipInfo: {
    marginTop: 15,
    justifyContent: 'center',
    textAlign: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
  },
});
