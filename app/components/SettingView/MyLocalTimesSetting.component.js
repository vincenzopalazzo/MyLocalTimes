import React, {Component} from 'react';
import {Modal, ScrollView} from 'react-native';

import {List, withTheme, Switch, Divider} from 'react-native-paper';
import MyLocalTimeAppBar from '../LocalTimeDrawer/LocalTimeAppBar.component';
import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';
import Theme from '../../Theme.style';
import ShareAppAction from '../../utils/actions/ShareAppAction';
import RateAppAction from '../../utils/actions/RateAppAction';
import DialogChooseLanguageComponent from './DialogChooseLanguage.component';

class MyLocalTimesSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lanDialogVisible: false,
    };

    this.onShare = this.onShare.bind(this);
    this.onRate = this.onRate.bind(this);
    this.closeLanguageDialog = this.closeLanguageDialog.bind(this);
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
      <ScrollView>
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
                value={true}
                onValueChange={() => console.log('swich')}
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
                value={false}
                onValueChange={() => console.log('swich')}
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
