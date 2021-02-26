/**
 * MyLocalTimes is an mobile app for consulting the local time of the cities.
 * Copyright (C) 2020-2021 Vincenzo Palazzo vincenzopalazzodev@gmail.com
 *
 * This program is free software; you can redistribute it and/or modify it under the terms
 * of the GNU General Public License as published by the Free Software Foundation; either
 * version 2 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with this program;
 * if not, write to the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
 */
import ComponentStyle from './ScollViewCardsTime.component.style';
import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {withTheme} from 'react-native-paper';
import CardTime from '../CardTime/CardTime.component';
import DAOAppStorage from '../../utils/DAOAppStorage';
import Constant from '../../utils/Constant';

class ScrollViewCardsTime extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      initialized: false,
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.doRemoveItem = this.doRemoveItem.bind(this);
  }

  doRemoveItem(item) {
    if (!item) {
      throw new Error('Item null');
    }
    let dataSource = this.props.dataSource;
    let indexElement = dataSource.indexOf(item);
    if (indexElement > -1) {
      dataSource.splice(indexElement, 1);
      this.props.setState({
        dataSource: dataSource,
      });
      DAOAppStorage.putObjectWithKey(
        Constant.modelMediator.REPOSITORY,
        dataSource,
      ).catch(error => {
        this.props.doError(error.message);
      });
    }
  }

  onRefresh() {
    this.setState({refreshing: true});
    this.props.onRefresh();
    this.setState({
      refreshing: false,
    });
  }

  render() {
    let {dataSource} = this.props;
    return (
      <View style={ComponentStyle.viewComponent}>
        <FlatList
          style={ComponentStyle.flatList}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.refreshing === true}
          data={dataSource}
          extraData={this.props}
          renderItem={({item}) => (
            <CardTime
              cityName={item.toString()}
              cityTime={item.time}
              onRemove={() => this.doRemoveItem(item)}
            />
          )}
          ListFooterComponent={<View style={{height: 0, marginBottom: 150}} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }
}

export default withTheme(ScrollViewCardsTime);
