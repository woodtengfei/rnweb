/**
 * @Name Loading
 * @Description 请求数据加载中Loading
 * @author wood
 * @date 2019/3/21
 */
import React, {Component} from 'react';
import {StyleSheet, Image} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class Loading extends Spinner {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Spinner
            {...this.props}
            customIndicator={<Image style={styles.imageStyle} source={require('../../assets/images/gif/loading.gif')}/>}
        />
    );
  };
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 30,
    height: 30,
  },
});
