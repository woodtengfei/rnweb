/**
 * @Name SearchView
 * @Description 搜索框
 * @author wood
 * @date 2019/3/14
 */
import React, {Component} from 'react';
import {StyleSheet, ImageBackground, Image, Text, TouchableOpacity} from 'react-native';
import colors from '../../config/colors';
import I18n from '../../i18n/i18n';
import device from '../../config/layout';

export default class SearchView extends Component {

  render() {
    return (
        <TouchableOpacity
            {...this.props} activeOpacity={0.8}
            onPress={() => {console.log('click search view')}}>
          <ImageBackground
              style={styles.container}
              source={require('../../../assets/images/header/header_search_bg.png')}>
            <Image
                style={styles.imageStyle}
                source={require('../../../assets/images/header/header_search_icon.png')}/>
            <Text style={styles.textStyle}>{I18n.t('home.headerSearch')}</Text>
          </ImageBackground>
        </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 32,
    borderRadius: 2,
    marginLeft: device.inset,
    marginRight: device.inset,
  },
  imageStyle: {
    width: 14,
    height: 14,
  },
  textStyle: {
    marginLeft: 8,
    fontSize: 12,
    color: colors.c333,
  },
});
