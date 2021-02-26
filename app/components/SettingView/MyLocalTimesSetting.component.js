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
import {ScrollView} from 'react-native';
import {List, withTheme, Switch, Divider} from 'react-native-paper';
import MyLocalTimeAppBar from '../LocalTimeDrawer/LocalTimeAppBar.component';
import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';
import Theme from '../../Theme.style';
import ShareAppAction from '../../utils/actions/ShareAppAction';
import RateAppAction from '../../utils/actions/RateAppAction';
import DialogChooseLanguageComponent from './DialogChooseLanguage.component';
import DAOAppStorage from '../../utils/DAOAppStorage';

const LOG_TAG = `${new Date().toISOString()} MyLocalTimesSetting.component.js`;

class MyLocalTimesSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lanDialogVisible: false,
    };

    this.onShare = this.onShare.bind(this);
    this.onRate = this.onRate.bind(this);
    this.closeLanguageDialog = this.closeLanguageDialog.bind(this);
    this.checkOnDatabase = this.checkOnDatabase.bind(this);
    this.changeValueTheme = this.changeValueTheme.bind(this);
    this.changeValueTimeFormat = this.changeValueTimeFormat.bind(this);
  }

  async checkOnDatabase() {
    let typeHoursFormat = await DAOAppStorage.getObjectWithKeyDefVal(
      'typeHoursFormat',
      true,
    );
    let darkTheme = await DAOAppStorage.getObjectWithKeyDefVal(
      'darkTheme',
      false,
    );
    console.debug(`${darkTheme} ${typeHoursFormat}`);
    this.setState({
      typeHoursFormat: typeHoursFormat,
      darkTheme: darkTheme,
    });
  }

  changeValueTheme(newValue) {
    this.setState({
      darkTheme: newValue,
    });
    DAOAppStorage.putObjectWithKey('darkTheme', newValue).catch(e =>
      console.error(`Error generated is ${e}`),
    );
  }

  changeValueTimeFormat(newValue) {
    this.setState({
      typeHoursFormat: newValue,
    });
    DAOAppStorage.putObjectWithKey('typeHoursFormat', newValue).catch(e =>
      console.error(`Error generated is ${e}`),
    );
  }

  async componentDidMount() {
    await this.checkOnDatabase();
  }

  async onShare() {
    try {
      await ShareAppAction.doShareWith(
        LanguageProvider.getInstance().getTranslate(
          Constant.language.SHARE_MESSAGE,
        ),
      );
    } catch (e) {}
  }

  onRate() {
    RateAppAction.doRateApp();
  }

  closeLanguageDialog() {
    this.setState({
      lanDialogVisible: false,
    });
  }

  render() {
    const theme = Theme.lite;
    return (
      <ScrollView theme={theme}>
        <MyLocalTimeAppBar
          title={LanguageProvider.getInstance().getTranslate(
            Constant.language.HOME_titleAppBar,
          )}
          nameIcon="arrow-left-thick"
          action={this.props.navigation.goBack}
        />
        <List.Section theme={theme}>
          <List.Subheader>
            {LanguageProvider.getInstance().getTranslate(
              Constant.language.VIEW_SETTING_TIME,
            )}
          </List.Subheader>
          <List.Item
            title="Time Format (12h or 24h)"
            left={() => <List.Icon icon="clock-outline" />}
            right={() => (
              <Switch
                theme={theme}
                value={this.state.typeHoursFormat}
                onValueChange={() =>
                  this.changeValueTimeFormat(!this.state.typeHoursFormat)
                }
              />
            )}
          />
        </List.Section>
        <Divider />
        <List.Section theme={theme}>
          <List.Subheader>
            {LanguageProvider.getInstance().getTranslate(
              Constant.language.VIEW_SETTING_LANGUAGE,
            )}
          </List.Subheader>
          <List.Item
            title="Language App"
            left={() => <List.Icon icon="alphabetical" />}
            onPress={() => this.setState({lanDialogVisible: true})}
          />
          <Divider />
        </List.Section>
        <List.Section theme={theme}>
          <List.Subheader>
            {LanguageProvider.getInstance().getTranslate(
              Constant.language.VIEW_SETTING_THEME,
            )}
          </List.Subheader>
          <List.Item
            title="Dark Theme"
            left={() => <List.Icon icon="weather-night" />}
            right={() => (
              <Switch
                theme={theme}
                value={this.state.darkTheme}
                onValueChange={() =>
                  this.changeValueTheme(!this.state.darkTheme)
                }
              />
            )}
          />
        </List.Section>
        <List.Section theme={theme}>
          <List.Subheader>
            {LanguageProvider.getInstance().getTranslate(
              Constant.language.VIEW_SETTING_EXTRA,
            )}
          </List.Subheader>
          <List.Item
            title={LanguageProvider.getInstance().getTranslate(
              Constant.language.DRAWER_SHARE,
            )}
            left={() => <List.Icon icon="share-variant" />}
            onPress={() => this.onShare()}
          />
          <List.Item
            title={LanguageProvider.getInstance().getTranslate(
              Constant.language.DRAWER_RATE,
            )}
            left={() => <List.Icon icon="star" />}
            onPress={() => this.onRate()}
          />
        </List.Section>
        <DialogChooseLanguageComponent
          visible={this.state.lanDialogVisible}
          onDismiss={this.closeLanguageDialog}
        />
      </ScrollView>
    );
  }
}

export default withTheme(MyLocalTimesSetting);
