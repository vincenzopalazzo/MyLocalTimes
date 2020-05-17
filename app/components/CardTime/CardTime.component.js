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

import {Text, View} from 'react-native';

import {IconButton, Banner, Card, withTheme} from 'react-native-paper';

import CardTimeStyle from './CardTime.component.style';
import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';

const LOG_TAG = new Date().toISOString() + ' ' + 'CardTime.js';

class CardTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bannerVisible: false,
    };
  }

  render() {
    let {cityName, cityTime, onRemove} = this.props;
    console.debug(LOG_TAG, cityName);
    console.debug(LOG_TAG, cityTime);
    let deleteTextButton = LanguageProvider.getInstance().getTranslate(
      Constant.language.CARD_VIEW_BANNER_DELETE,
    );
    let addAlarmTextButton = LanguageProvider.getInstance().getTranslate(
      Constant.language.CARD_VIEW_BANNER_ADD_ALARM,
    );
    let closeTextButton = LanguageProvider.getInstance().getTranslate(
      Constant.language.CARD_VIEW_BANNER_CLOSE,
    );
    return (
      <View>
        <Card theme={this.props.theme}>
          <Card.Content>
            <View style={CardTimeStyle.viewStyle}>
              <Text style={CardTimeStyle.nameLabel}>{cityName}</Text>
              <IconButton
                style={CardTimeStyle.updateLabel}
                size={18}
                icon="settings"
                onPress={() =>
                  this.setState({bannerVisible: !this.state.bannerVisible})
                }
              />
            </View>
            <Text style={CardTimeStyle.timeLabel}>{cityTime}</Text>
          </Card.Content>
        </Card>
        <Banner
          contentStyle={CardTimeStyle.badge}
          visible={this.state.bannerVisible}
          actions={[
            {
              label: `${deleteTextButton}`,
              icon: 'delete',
              onPress: () => onRemove(),
            },
            {
              label: `${addAlarmTextButton}`,
              icon: 'map-clock',
              disabled: true,
              onPress: () => this.setState({bannerVisible: false}),
            },
            {
              label: `${closeTextButton}`,
              icon: 'close',
              onPress: () => this.setState({bannerVisible: false}),
            },
          ]}
        />
      </View>
    );
  }
}

export default withTheme(CardTime);
