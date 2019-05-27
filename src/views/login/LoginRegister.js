/**
 * @Name LoginRegister
 * @Description 登录和注册
 * @author wood
 * @date 2019/3/20
 */
import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Login from './Login';
import Register from './Register';

export default class LoginRegister extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigation } = this.props;
    return (
        <View style={styles.container}>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
            <Login navigation={navigation}/>
            <Register navigation={navigation}/>
          </ScrollView>
        </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
