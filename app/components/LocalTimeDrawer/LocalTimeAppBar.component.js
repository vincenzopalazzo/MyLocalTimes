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

import React, {Component} from 'react';

import {Appbar, Avatar, withTheme} from 'react-native-paper';

import ThemeManager from '../../Theme.style';
import GlobalStyle from '../../index.style';

const LITE_THEME = ThemeManager.lite;
const LOG_TAG = new Date().toISOString() + ' ' + 'LocalTimeAppBar.component.js';

class MyLocalTimeAppBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {nameIcon, action, title} = this.props;
    return (
      <Appbar.Header theme={LITE_THEME} style={GlobalStyle.appBar}>
        <Appbar.Action icon={nameIcon} onPress={action} />
        <Appbar.Content title={title} />
        <Avatar.Image
          theme={LITE_THEME}
          size={35}
          source={require('../../assets/avatar.png')}
        />
      </Appbar.Header>
    );
  }
}

export default withTheme(MyLocalTimeAppBar);
