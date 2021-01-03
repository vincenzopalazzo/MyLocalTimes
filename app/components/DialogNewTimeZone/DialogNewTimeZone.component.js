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
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {View, Platform} from 'react-native';
import {BottomModal, ModalContent, ModalTitle} from 'react-native-modals';
import {Button, Chip, withTheme, TextInput} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import DialogNewTimeZoneStyle from './DialogNewTimeZone.component.style';
import CreateNewPersonalTimeZone from '../../utils/actions/CreateNewPersonalTimeZone';
import MyLocalTimesErrorDialog from '../ErrorDialog/MyLocalTimesErrorDialog.component';
import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';

const LOG_TAG = `${new Date().toISOString()} DialogNewTimeZone.js`;

class DialogNewTimeZone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameCity: undefined,
      nameCountry: undefined,
      unsubscribeNetworkEvent: undefined,
      componentEnabled: true,
      modalDialog: false,
    };

    this.doCreateNewTimeZone = this.doCreateNewTimeZone.bind(this);
    this.setDialogVisible = this.setDialogVisible.bind(this);
  }

  setDialogVisible(value) {
    this.setState({
      modalDialog: value,
    });
  }

  async doCreateNewTimeZone() {
    try {
      let newLocalTimeZoneCity;
      try {
        newLocalTimeZoneCity = CreateNewPersonalTimeZone.createNewTimeZone(
          this.state.nameCity,
          this.state.nameCountry,
        );
      } catch (e) {
        console.warn(LOG_TAG, e.message);
        this.setDialogVisible(true);
        return;
      }
      this.setState({
        componentEnabled: false,
      });
      this.props.onSubmit(newLocalTimeZoneCity);
      this.setState({
        nameCity: '',
        nameCountry: '',
        componentEnabled: true,
      });
    } catch (e) {
      console.error(LOG_TAG, e);
      this.props.onComunicate(false, e.message);
    }
  }

  render() {
    let {visible, title} = this.props;
    return (
      <View>
        <BottomModal
          width={0.9}
          rounded
          visible={visible}
          onClose={this.props.onClose}
          onTouchOutside={() => this.props.setState({dialogVisible: false})}
          onSwipeOut={() => this.props.setState({dialogVisible: false})}
          modalTitle={<ModalTitle title={title} hasTitleBar />}>
          <ModalContent>
            <TextInput
              style={DialogNewTimeZoneStyle.textInput}
              placeholder={LanguageProvider.getInstance().getTranslate(
                Constant.language.PLACEHOLDER_INSERT_CITY_EXAMPLE,
              )}
              label={'City name'}
              disabled={!this.state.componentEnabled}
              theme={this.props.theme}
              onChangeText={text => this.setState({nameCity: text})}
            />

            <TextInput
              style={DialogNewTimeZoneStyle.textInput}
              placeholder={'Ex: Europe, America'}
              label={'County'}
              disabled={!this.state.componentEnabled}
              theme={this.props.theme}
              onChangeText={text => this.setState({nameCountry: text})}
            />
            <View style={DialogNewTimeZoneStyle.buttonsDialog}>
              <Button
                icon="magnify"
                mode="contained"
                theme={this.props.theme}
                disabled={!this.state.componentEnabled}
                onPress={() => this.doCreateNewTimeZone()}>
                {LanguageProvider.getInstance().getTranslate(
                  Constant.language.NEW_TIME_ZONE_SEARCH_TEXT,
                )}
              </Button>
            </View>
            <Chip
              style={DialogNewTimeZoneStyle.chipInfo}
              icon="information"
              disabled={true}
              onPress={() => console.log('Pressed')}>
              {LanguageProvider.getInstance().getTranslate(
                Constant.language.NEW_TIME_ZONE_INFO_TEXT,
              )}
            </Chip>
            {Platform.OS === 'ios' && <KeyboardSpacer />}
          </ModalContent>
          {this.state.modalDialog && (
            <MyLocalTimesErrorDialog
              visible={this.state.modalDialog}
              closeDialog={this.setDialogVisible}
              message={LanguageProvider.getInstance().getTranslate(
                Constant.language.ERROR_DIALOG_MESSAGE,
              )}
            />
          )}
        </BottomModal>
      </View>
    );
  }
}

export default withTheme(DialogNewTimeZone);
