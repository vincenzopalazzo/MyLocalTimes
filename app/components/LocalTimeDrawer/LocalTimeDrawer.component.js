import React, {Component} from 'react';

import {Avatar, Drawer, withTheme} from 'react-native-paper';
import {View, Share} from 'react-native';
import styles from './MyLocalTimeDrawer.style';
import Theme from '../../Theme.style';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import LanguageProvider from '../../utils/LanguageProvider';
import Constant from '../../utils/Constant';
import ShareAppAction from '../../utils/actions/ShareAppAction';
import RateAppAction from '../../utils/actions/RateAppAction';

class LocalTimeDrawer extends Component {
  constructor(props) {
    super(props);

    this.onShare = this.onShare.bind(this);
    this.onRate = this.onRate.bind(this);
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

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1}}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                theme={Theme.lite}
                source={{
                  uri: 'https://i.redd.it/xqepnsbdt5301.png',
                }}
                size={65}
              />
            </View>
          </View>
        </View>
        <DrawerContentScrollView {...this.props}>
          <Drawer.Section>
            <Drawer.Item
              icon="home"
              label={LanguageProvider.getInstance().getTranslate(
                Constant.language.DRAWER_HOME,
              )}
              onPress={() => navigation.navigate(Constant.navigation.HOME)}
            />
            <Drawer.Item
              icon="settings"
              label={LanguageProvider.getInstance().getTranslate(
                Constant.language.DRAWER_SETTING,
              )}
              onPress={() => navigation.navigate(Constant.navigation.SETTING)}
            />
          </Drawer.Section>
        </DrawerContentScrollView>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <Drawer.Item
            icon="share-variant"
            label={LanguageProvider.getInstance().getTranslate(
              Constant.language.DRAWER_SHARE,
            )}
            onPress={() => this.onShare()}
          />
          <Drawer.Item
            icon="star"
            label={LanguageProvider.getInstance().getTranslate(
              Constant.language.DRAWER_RATE,
            )}
            onPress={() => this.onRate()}
          />
        </Drawer.Section>
      </View>
    );
  }
}

export default withTheme(LocalTimeDrawer);
