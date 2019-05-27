/**
 * @Name Discovery
 * @Description 发现首页
 * @author wood
 * @date 2019/3/21
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import colors from '../../config/colors';

export default class Discovery extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.titleStyle}>发现首页</Text>

          <Text style={styles.h2Title}>code-push</Text>
          <Text>code-push release-react superbuy-ios ios --t 1.0.0 -k ./private.pem</Text>
          <Text>code-push release-react superbuy-android android --t 1.0.0 --des "test android code-push"</Text>
          <Text>发布正式版追加参数：--dev false --d Production</Text>

          <Text style={styles.h2Title}>pushy</Text>
          <Text>pushy bundle --platform ios</Text>
          <Text>pushy bundle --platform android</Text>
        </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.cc4d5e2,
    padding: 5,
  },
  titleStyle: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  h2Title: {
    color: colors.c142341,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  }
});
