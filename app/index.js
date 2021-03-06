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
import GlobalStyle from './index.style';
import ThemeManager from './Theme.style';

import React, {Component} from 'react';
import {
  Provider as PaperProvider,
  FAB,
  Snackbar,
  ActivityIndicator,
  withTheme,
} from 'react-native-paper';
import ScrollViewCardsTime from './components/ScrollViewCardsTime/ScrollViewCardsTime.component';
import ComponentStyle from './components/ScrollViewCardsTime/ScollViewCardsTime.component.style';
import DialogNewTimeZone from './components/DialogNewTimeZone/DialogNewTimeZone.component';
import DAOAppStorage from './utils/DAOAppStorage';
import LanguageProvider from './utils/LanguageProvider';
import Constant from './utils/Constant';
import MyLocalTimeAppBar from './components/LocalTimeDrawer/LocalTimeAppBar.component';
import {SafeAreaView, StatusBar} from 'react-native';
import MomentTimeZone from './utils/MomentTimeZone';
import TimeZoneCity from './utils/model/TimeZoneCity';
import AppModel from './utils/AppModel';

const LOG_TAG = new Date().toISOString() + ' ' + 'index.js';
const LITE_THEME = ThemeManager.lite;

/**
 * @author https://github.com/vincenzopalazzo
 */
class MyBetweenTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appInitialized: false,
      toastVisible: false,
      reloadState: false,
      toastMessage: 'TimeZone Updated',
      dialogVisible: false,
      loading: false,
      intervalEvent: undefined,
      dataSource: [],
    };
    this.doCloseSnackBar = this.doCloseSnackBar.bind(this);
    this.doAddDataToList = this.doAddDataToList.bind(this);
    this.doCloseDialog = this.doCloseDialog.bind(this);
    this.doPrintError = this.doPrintError.bind(this);
    this.updateCityDataSource = this.updateCityDataSource.bind(this);
    this.refreshCityList = this.refreshCityList.bind(this);
  }

  doCloseSnackBar(
    value,
    message = LanguageProvider.getInstance().getTranslate(
      Constant.language.MESSAGE_REFRESH_LIST,
    ),
  ) {
    this.setState({
      toastVisible: !value,
      toastMessage: message,
    });
  }

  doPrintError(messageError) {
    if (!messageError) {
      console.warn(LOG_TAG, 'Message error null');
      throw new Error('Message error null');
    }
    this.setState({
      toastVisible: true,
      loading: false,
      toastMessage: messageError,
    });
  }

  doCloseDialog(value) {
    this.setState({
      dialogVisible: !value,
    });
  }

  async doAddDataToList(cityTime) {
    if (!cityTime) {
      throw new Error(
        `Error inside method doAddDataToList, value city: ${cityTime}`,
      );
    }
    console.debug(LOG_TAG, 'Method doAddDataToList with param: ', cityTime);
    let dataSource = this.state.dataSource;
    if (dataSource.some(city => city.toString() === cityTime.toString())) {
      this.setState({
        dialogVisible: false,
      });
      this.doCloseSnackBar(
        false,
        LanguageProvider.getInstance().getTranslate(
          Constant.language.CITY_EXIST_ALREADY,
        ),
      );
      return;
    }
    dataSource.push(cityTime);
    this.setState({
      dataSource: dataSource,
      dialogVisible: false,
    });
    try {
      await DAOAppStorage.putObjectWithKey(
        Constant.modelMediator.REPOSITORY,
        this.state.dataSource,
      );
    } catch (err) {
      this.doPrintError(err.message);
    }
  }

  refreshCityList() {
    let dataSource = this.state.dataSource;
    let dataSourceUpdate = dataSource.map(item =>
      this.updateCityDataSource(item),
    );
    this.setState({
      dataSource: dataSourceUpdate,
    });
  }

  updateCityDataSource(localTimeCity) {
    if (!localTimeCity) {
      throw new Error(
        `ERROR inside method: updateCityDataSource: value city from dataSource is ${localTimeCity}`,
      );
    }
    console.debug(
      LOG_TAG,
      `In method updateCityDataSource with object ${localTimeCity}`,
    );
    let cityTimeObject = TimeZoneCity.fromJsonToClass(localTimeCity);
    console.debug(
      LOG_TAG,
      `TimeZoneCity from json is: ${cityTimeObject.nameCity}`,
    );
    let queryFormat = cityTimeObject.toString(); //This return CITY/COUNTRY or only COUNTRY
    const timeFormat = AppModel.getInstance().getValue(Constant.db.TIME_FORMAT);
    let timeZoneUpdate = MomentTimeZone.timeZoneWithFormat(
      queryFormat,
      timeFormat,
    );
    cityTimeObject.setTime(timeZoneUpdate);
    return cityTimeObject;
  }

  async componentDidMount(): void {
    console.debug(LOG_TAG, 'Component Did mount');
    let init = await DAOAppStorage.getObjectWithKey(
      Constant.modelMediator.INIT,
    );
    let timeFormat = await DAOAppStorage.getObjectWithKey(
      Constant.db.TIME_FORMAT,
    );

    if (!init) {
      //Initialize APP
      await DAOAppStorage.putObjectWithKey(Constant.modelMediator.INIT, true);
      await DAOAppStorage.putObjectWithKey(
        Constant.modelMediator.REPOSITORY,
        this.state.dataSource,
      );
    } else {
      //Using dataStored
      let dataSource = await DAOAppStorage.getObjectWithKey(
        Constant.modelMediator.REPOSITORY,
      );
      let dataSourceObj = dataSource.map(item =>
        this.updateCityDataSource(item),
      );
      console.debug(LOG_TAG, `Data source ${dataSourceObj}`);
      this.setState({
        dataSource: dataSourceObj,
      });
    }
    let interval = setInterval(this.refreshCityList, 60000);
    this.setState({
      intervalEvent: interval,
      timeFormat: timeFormat,
    });
  }

  async componentWillUnmount(): void {
    let interval = this.state.intervalEvent;
    if (interval) {
      clearInterval(interval);
    }
    await DAOAppStorage.putObjectWithKey(
      Constant.modelMediator.REPOSITORY,
      this.state.dataSource,
    );
  }

  render() {
    return (
      <PaperProvider theme={LITE_THEME}>
        <StatusBar
          backgroundColor={LITE_THEME.colors.accent}
          barStyle="light-content"
        />
        <SafeAreaView style={GlobalStyle.droidSafeAreaTop} />
        <SafeAreaView style={GlobalStyle.droidSafeAreaDown}>
          <MyLocalTimeAppBar
            title={LanguageProvider.getInstance().getTranslate(
              Constant.language.HOME_titleAppBar,
            )}
            nameIcon="menu"
            action={this.props.navigation.openDrawer}
          />
          <ScrollViewCardsTime
            data={this.state.dataSource}
            onComunicate={this.doCloseSnackBar}
            onRefresh={this.refreshCityList}
            onError={this.doPrintError}
            setState={p => {
              this.setState(p);
            }}
            {...this.state}
          />
          <DialogNewTimeZone
            title={LanguageProvider.getInstance().getTranslate(
              Constant.language.HOME_createNewTimezone,
            )}
            visible={this.state.dialogVisible}
            setState={p => {
              this.setState(p);
            }}
            {...this.state}
            onSubmit={this.doAddDataToList}
            onComunicate={this.doCloseSnackBar}
          />
          <FAB
            style={ComponentStyle.fab}
            visible={this.state.toastVisible === false}
            fat
            label={LanguageProvider.getInstance().getTranslate(
              Constant.language.HOME_newTimeZone,
            )}
            icon="plus"
            onPress={() => this.setState({dialogVisible: true})}
          />
          <ActivityIndicator
            style={GlobalStyle.loadingIndicator}
            animating={this.state.loading}
            //theme={LITE_THEME}
            //color={LITE_THEME.colors.accent}
          />
          <Snackbar
            style={GlobalStyle.snackbar}
            //theme={LITE_THEME}
            visible={this.state.toastVisible}
            onDismiss={() => this.doCloseSnackBar(true)}
            action={{
              label: LanguageProvider.getInstance().getTranslate(
                Constant.language.SNACKBAR_textButtonClose,
              ),
              onPress: () => {
                this.doCloseSnackBar(true);
              },
            }}>
            {this.state.toastMessage}
          </Snackbar>
        </SafeAreaView>
      </PaperProvider>
    );
  }
}

export default withTheme(MyBetweenTime);
