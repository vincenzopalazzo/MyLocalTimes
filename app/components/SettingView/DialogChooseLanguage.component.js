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
import {Modal, View} from 'react-native';
import {withTheme, Dialog, RadioButton, Text, Button} from 'react-native-paper';
import LanguageProvider from '../../utils/LanguageProvider';
import Theme from '../../Theme.style';
import Constant from '../../utils/Constant';
import DAOAndroidStorage from '../../utils/DAOAndroidStorage';

const LOG_TAG =
  new Date().toISOString() + ' ' + 'DialogChooseLanguage.component.js';

class DialogChooseLanguageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageSelected: LanguageProvider.getInstance().getCurrentLanguage(),
    };

    this.changeLanguage = this.changeLanguage.bind(this);
    this.setLanguageSelected = this.setLanguageSelected.bind(this);
  }

  componentDidMount() {
    let languageSelected = DAOAndroidStorage.getObjectWithKeyDefVal(
      'languageSelected',
      this.state.languageSelected,
    );
    this.setState({
      languageSelected: languageSelected,
    });
  }

  componentWillUnmount() {
    DAOAndroidStorage.putObjectWithKey(
      'languageSelected',
      this.state.languageSelected,
    );
  }

  async changeLanguage() {
    console.debug(LOG_TAG, `Language selected ${this.state.languageSelected}`);
    this.props.onDismiss();
    const language = this.state.languageSelected;
    const languageSupported = LanguageProvider.getInstance().languageSupported;
    const size = languageSupported.length - 1;
    const auto = language === languageSupported[size];
    console.debug(LOG_TAG, `Is Automatic: ${auto}`);
    await LanguageProvider.getInstance().changeLanguage(language, auto);
  }

  setLanguageSelected(languageSelected) {
    console.debug(
      LOG_TAG,
      `setLanguageSelected: new language selected ${languageSelected}`,
    );
    this.setState({
      languageSelected,
    });
  }

  render() {
    let {visible, onDismiss} = this.props;
    return (
      <Modal transparent={true} visible={visible}>
        <Dialog
          theme={Theme.lite}
          visible={visible}
          onDismiss={() => onDismiss()}>
          <Dialog.Content>
            <RadioButton.Group
              theme={Theme.lite}
              onValueChange={value => this.setLanguageSelected(value)}
              value={this.state.languageSelected}>
              {LanguageProvider.getInstance()
                .getLanguageSupport()
                .map(item => (
                  <View>
                    <Text theme={Theme.lite}>{item}</Text>
                    <RadioButton theme={Theme.lite} value={item} />
                  </View>
                ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button theme={Theme.lite} onPress={() => onDismiss()}>
              {LanguageProvider.getInstance().getTranslate(
                Constant.language.CANCEL_BUTTON_DIALOG_LANGUAGE,
              )}
            </Button>
            <Button
              theme={Theme.lite}
              enable={false}
              onPress={() => this.changeLanguage()}>
              {LanguageProvider.getInstance().getTranslate(
                Constant.language.OK_BUTTON_DIALOG_LANGUAGE,
              )}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Modal>
    );
  }
}

export default withTheme(DialogChooseLanguageComponent);
