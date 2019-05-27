/**
 * @Name Register
 * @Description 注册页面
 * @author wood
 * @date 2019/3/20
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text, KeyboardAvoidingView} from 'react-native';
import I18n from '../../i18n/i18n';
import layout from '../../config/layout';
import colors from '../../config/colors';
import ApiUtil from '../../api/ApiUtil';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      comfirmPwd: '',
      isLoading: false,
      isValid: false,
      isSecure: true,
    };

    this.signUp = this.signUp.bind(this);
  }

  componentDidMount() {

  }

  signUp() {
    const { email, password, isValid } = this.state;
    if (!isValid) return;
    let params = {"loginToken": email.trim(), "password": password.trim()};
    let options = {method: ApiUtil.method.post, encrypt: ApiUtil.encrypt.v3, baseUrl: ApiUtil.newApi};
    ApiUtil.fetch("auth/login", params, (result) => {
      if (result.isSuccess) {

      }
    }, options);
  }

  render() {
    const {
      email,
      password,
      comfirmPwd,
      isSecure,
      isValid,
    } = this.state;
    return (
        <KeyboardAvoidingView style={styles.container}>
          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: layout.height - 420}}>
            <Text style={{fontSize: 14, color: colors.c333}}>{I18n.t('personal.alreadyAccount')}</Text>
            <Text
                style={{fontSize: 14, color: colors.c1268bb, textDecorationLine: 'underline'}}
                onPress={() => {}}
            >{I18n.t('personal.goLogin')}</Text>
          </View>
        </KeyboardAvoidingView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    flex: 1,
  },
  textStyle: {
    color: colors.c333,
    fontSize: 14,
  },
  containerStyle: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonStyle: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
