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

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeLabel: {
    textAlign: 'center',
    fontSize: 35,
  },
  nameLabel: {
    textAlign: 'left',
    margin: 5,
    marginLeft: 15,
    fontSize: 18,
  },
  updateLabel: {
    textAlign: 'right',
    margin: 5,
    marginRight: 15,
    fontSize: 18,
  },
  surface: {
    padding: 8,
    elevation: 4,
  },
  badge: {},
});
