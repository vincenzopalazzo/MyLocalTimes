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
} from 'react-native-paper';
import Moment from 'moment-timezone';

import ScrollViewCardsTime from './components/ScrollViewCardsTime/ScrollViewCardsTime.component';
import ComponentStyle from './components/ScrollViewCardsTime/ScollViewCardsTime.component.style';
import DialogNewTimeZone from './components/DialogNewTimeZone/DialogNewTimeZone.component';
import DAOAndroidStorage from './utils/DAOAndroidStorage';
import ObtainTimeZoneToAPI from './utils/actions/ObtainTimeZoneToAPI';
import CityTime from './utils/model/CityTime';
import Util from './utils/Util';
import NetInfo from '@react-native-community/netinfo';

import LanguageProvider from './utils/LanguageProvider';
import Constant from './utils/Constant';
import MyLocalTimeAppBar from './components/LocalTimeDrawer/LocalTimeDrawer.component';
import {SafeAreaView, View} from 'react-native';

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
      toastMessage: 'TimeZone Updated',
      dialogVisible: false,
      loading: false,
      intervalEvent: undefined,
      networkEvent: undefined,
      networkStatus: true,
      dataSource: [],
    };

    this.doCloseSnackBar = this.doCloseSnackBar.bind(this);
    this.doAddDataToList = this.doAddDataToList.bind(this);
    this.doUpdateDataSourceWithAPI = this.doUpdateDataSourceWithAPI.bind(this);
    this.doCloseDialog = this.doCloseDialog.bind(this);
    this.doRefreshListWithApi = this.doRefreshListWithApi.bind(this);
    this.doUpdateDataSourceWithoutAPI = this.doUpdateDataSourceWithoutAPI.bind(
      this,
    );
    this.doPrintError = this.doPrintError.bind(this);
  }

  doCloseSnackBar(value, message = 'Refreshed') {
    this.setState({
      toastVisible: !value,
      toastMessage: message,
    });
  }

  doPrintError(messageError) {
    if (!messageError) {
      console.error(LOG_TAG, 'Message error null');
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

  doAddDataToList(cityTime) {
    if (!cityTime) {
      throw new Error('City time null');
    }
    //let dataSource = this.state.dataSource;
    //dataSource.push(cityTime);
    console.debug(LOG_TAG, 'Method doAddDataToList with param: ', cityTime);
    let dataSource = this.state.dataSource;
    dataSource.push(cityTime);
    this.setState({
      dataSource: dataSource,
      dialogVisible: false,
    });
    DAOAndroidStorage.putObjectWithKey(
      Constant.modelMediator.REPOSITORY,
      this.state.dataSource,
    ).catch(error => {
      this.doPrintError(error.message);
    });
  }

  async doUpdateDataSourceWithAPI(dataSource) {
    if (!dataSource) {
      if (dataSource === []) {
        console.debug(LOG_TAG, 'dataSource empty');
        let message = 'Local times list empty';
        this.doCloseSnackBar(false, message);
        return;
      }
      throw new Error('Data source null');
    }
    if (!this.state.networkStatus) {
      this.doCloseSnackBar(false, 'Connection not found');
    }
    Object.assign([], ...dataSource);
    for (let i = 0; i < dataSource.length; i++) {
      this.setState({
        loading: true,
      });
      let city = CityTime.fromJsonToClass(dataSource[i]);
      console.debug(LOG_TAG, 'City time inside data source: ', city.toString());
      console.debug(LOG_TAG, 'URL inside the city: ', city.urlOnline);
      if (!this.state.networkStatus) {
        let newDate = new Date(city.time);
        console.debug(LOG_TAG, 'Time update without API: ', city.time);
        city.updateTimeWithData(newDate);
        dataSource[i] = city;
      } else {
        await ObtainTimeZoneToAPI.createRequestByURL(city.urlOnline)
          .then(result => {
            let newDate = new Date(
              result.year,
              result.month,
              result.day,
              result.hours,
              result.minutes,
              result.seconds,
              result.millis,
            );
            console.debug(
              LOG_TAG,
              'Time update with API: ',
              newDate.toTimeString(),
            );
            city.updateTimeWithData(newDate);
            dataSource[i] = city;
            console.debug(
              LOG_TAG,
              'Time inside city updated: ',
              city.toString(),
            );
          })
          .catch(error => {
            this.doPrintError(error.message);
          });
      }
    }
    console.debug(LOG_TAG, 'Data source value: ', dataSource);
    let message =
      this.state.networkStatus === true
        ? LanguageProvider.getInstance().getTranslate(
            Constant.language.SNACKBAR_successUpdateDataset,
          )
        : 'Connection not enabled';
    this.setState({
      dataSource: dataSource,
      loading: false,
      toastVisible: true,
      toastMessage: message,
    });
    DAOAndroidStorage.putObjectWithKey(
      Constant.modelMediator.REPOSITORY,
      dataSource,
    ).catch(error => {
      this.doPrintError(error.message);
    });
  }

  doUpdateDataSourceWithoutAPI() {
    let dataSource = this.state.dataSource;
    if (dataSource && dataSource.length !== 0 && this.state.networkStatus) {
      console.debug(LOG_TAG, 'called method doUpdateDataSourceWithoutAPI()');
      this.state.dataSource.forEach(city => {
        let timeCity = city.time;
        console.debug(LOG_TAG, 'City ', city.name, ' with time: ', timeCity);
        //add oneMinutes to time
        let newTime = Moment(timeCity)
          .add(1, 'minutes')
          .toDate();
        console.debug(LOG_TAG, 'New city time: ', Util.doPrintTime(newTime));
        city.updateTimeWithData(newTime);
        //check if is the time is correct with the actual time
      });
      this.setState({
        dataSource: this.state.dataSource,
      });
    }
  }

  async doRefreshListWithApi(withApi) {
    if (withApi) {
      if ((await Util.doCheckDeviceNetwork()) === false) {
        this.doCloseSnackBar(false, 'Connected not found');
        return;
      }
      await this.doUpdateDataSourceWithAPI(this.state.dataSource);
    } else {
      this.doUpdateDataSourceWithoutAPI();
    }
  }

  async componentDidMount(): void {
    let unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        networkStatus: state.isConnected,
      });
    });
    this.setState({
      networkEvent: unsubscribe,
    });
    console.log(LOG_TAG, 'Component Did mount');
    await DAOAndroidStorage.getObjectWithKey(Constant.modelMediator.INIT).then(
      init => {
        console.log(LOG_TAG, 'Component did mont value init: ', init);
        if (init === false) {
          DAOAndroidStorage.putObjectWithKey(Constant.modelMediator.INIT, true)
            .then(() => {
              this.setState({
                appInitialized: true,
              });
            })
            .catch(error => {
              this.doPrintError(error.message);
            });

          DAOAndroidStorage.putObjectWithKey(
            Constant.modelMediator.REPOSITORY,
            this.state.dataSource,
          ).catch(error => {
            this.doPrintError(error.message);
          });
        } else {
          DAOAndroidStorage.getObjectWithKey(Constant.modelMediator.REPOSITORY)
            .then(dataSource => {
              if (dataSource !== undefined) {
                //UPDATE value wit API
                this.doUpdateDataSourceWithAPI(dataSource);
              }
            })
            .catch(error => {
              this.doPrintError(error.message);
            });
        }
      },
    );
    let interval = setInterval(this.doUpdateDataSourceWithoutAPI, 60000);
    this.setState({
      intervalEvent: interval,
    });
  }

  componentWillUnmount(): void {
    let interval = this.state.intervalEvent;
    if (interval) {
      clearInterval(interval);
    }
    let networkEvent = this.state.networkEvent;
    if (networkEvent) {
      networkEvent();
    }
  }

  render() {
    return (
      <PaperProvider theme={LITE_THEME}>
        <SafeAreaView style={GlobalStyle.droidSafeAreaDown}>
          <MyLocalTimeAppBar />
          <ScrollViewCardsTime
            data={this.state.dataSource}
            onComunicate={this.doCloseSnackBar}
            onRefresh={this.doRefreshListWithApi}
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
            disabled={!this.state.networkStatus}
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

export default MyBetweenTime;
