/**
 * @Name Login
 * @Description 登录页面
 * @author wood
 * @date 2019/3/20
 */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, KeyboardAvoidingView, TextInput, Button, Image} from 'react-native';
import I18n from '../../i18n/i18n';
import layout from '../../config/layout';
import colors from '../../config/colors';
import ApiUtil from '../../api/ApiUtil';
import Loading from '../../components/Loading';
import util from '../../util/util';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isValid: false,
      isSecure: true,
      verifyImgUrl: null,
      verifyCode: null,
    };

  }

  componentDidMount() {

  }

  login = () => {
    const { email, password, isValid, verifyImgUrl, verifyCode } = this.state;
    if (!isValid) return;
    let params = {"loginToken": email.trim(), "password": password.trim()};
    if (verifyImgUrl && verifyCode) {
      params['verifyCode'] = verifyCode;
    }
    let options = {
      method: ApiUtil.method.post,
      encrypt: ApiUtil.encrypt.v3,
      baseUrl: ApiUtil.newApi,
      'Content-Type': ApiUtil.contentTypeForm,
    };
    this.setState({isLoading: true});
    ApiUtil.fetch("auth/login", params, (result) => {
      this.setState({isLoading: false});
      if (result.isSuccess) {
        util.setUserInfo(result.data);
        util.toast(I18n.t('personal.loginSuccess'));
        this.props.navigation.goBack();
      } else if (result.code === 20003) {
        this.getVerifyCode();
        util.toast(result.msg);
      } else {
        util.toast(result.msg);
      }
    }, options);
  };

  getVerifyCode = () => {
    const { email } = this.state;
    let params = {"loginToken": email.trim()};
    let options = {
      method: ApiUtil.method.post,
      encrypt: ApiUtil.encrypt.v1,
      baseUrl: ApiUtil.newApi,
      'Content-Type': ApiUtil.contentTypeForm,
    };
    ApiUtil.fetch("auth/refresh-verify-code", params, (result) => {
      if (result.isSuccess && result.data.imageUrl) {
        this.setState({verifyImgUrl: ApiUtil.newApi + result.data.imageUrl.substring(1)})
      }
    }, options);
  };

  loginThirdAccount = (type) => {

  };

  render() {
    const {
      email,
      password,
      isSecure,
      isValid,
      isLoading,
      verifyImgUrl,
      verifyCode,
    } = this.state;
    return (
        <KeyboardAvoidingView style={styles.container}>
          <Loading visible={isLoading}/>
          <TextInput
              inputStyle={styles.textStyle}
              value={email}
              keyboardAppearance="light"
              autoFocus={false}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              placeholder={I18n.t('personal.emailHolder')}
              containerStyle={[styles.containerStyle, {marginTop: 44}]}
              ref={input => (this.emailInput = input)}
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={email => {
                let isValid = email.length >= 5 && password.length >= 6;
                this.setState({ email, isValid });
              }}
              clearButtonMode="while-editing"
              // errorMessage={
              //   isValid ? null : 'Please enter a valid email address'
              // }
          />
          <TextInput
              inputStyle={styles.textStyle}
              value={password}
              keyboardAppearance="light"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={isSecure}
              returnKeyType={'done'}
              blurOnSubmit={true}
              containerStyle={styles.containerStyle}
              placeholder={I18n.t('personal.pwdHolder')}
              ref={input => (this.passwordInput = input)}
              onChangeText={password => {
                let isValid = email.length >= 5 && password.length >= 6;
                this.setState({ password, isValid });
              }}
              onSubmitEditing={() => this.passwordInput.blur()}
              rightIcon={
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({isSecure: !isSecure})}>
                  <Image style={{width: 20, height: 20}} source={isSecure ?
                      require('../../../assets/images/personal/password_hide.png') :
                      require('../../../assets/images/personal/password_show.png')}
                  />
                </TouchableOpacity>
              }
          />
          {
            verifyImgUrl &&
            <TextInput
                inputStyle={styles.textStyle}
                value={verifyCode}
                keyboardAppearance="light"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType={'done'}
                blurOnSubmit={true}
                containerStyle={styles.containerStyle}
                placeholder={I18n.t('personal.verifyCode')}
                ref={input => (this.verifyCodeInput = input)}
                onChangeText={verifyCode => {
                  this.setState({ verifyCode });
                }}
                rightIcon={
                  <View style={{flexDirection: 'row'}}>
                    <Image style={{width: 70, height: 30}} type="clear" source={{uri: verifyImgUrl}}/>
                    <Button type="clear" onPress={this.getVerifyCode} icon={
                      <Image style={{width: 20, height: 20}} source={require('../../../assets/images/personal/login_verify_refresh.png')}/>
                    }/>
                  </View>
                }
            />
          }
          <Button
              title={I18n.t('personal.login')}
              buttonStyle={styles.buttonStyle}
              disabled={!isValid}
              disabledStyle={{opacity: 0.6, backgroundColor: colors.c1268bb}}
              disabledTitleStyle={{color: colors.white}}
              onPress={this.login}
          />
          <View style={{marginTop: layout.height - 420}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{backgroundColor: colors.ddd, height: 0.5}}/>
              <Text style={{fontSize: 12, color: colors.c666}}>{I18n.t('personal.thirdLogin')}</Text>
              <View style={{backgroundColor: colors.ddd, height: 0.5}}/>
            </View>
            <View style={styles.thirdView}>
              <TouchableOpacity onPress={this.loginThirdAccount(0)}>
                <Image style={styles.thirdImage} source={require('../../../assets/images/personal/login_wechat.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.loginThirdAccount(1)}>
                <Image style={styles.thirdImage} source={require('../../../assets/images/personal/login_qq.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.loginThirdAccount(2)}>
                <Image style={styles.thirdImage} source={require('../../../assets/images/personal/login_weibo.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.loginThirdAccount(3)}>
                <Image style={styles.thirdImage} source={require('../../../assets/images/personal/login_facebook.png')}/>
              </TouchableOpacity>
            </View>
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
  thirdView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
  thirdImage: {
    width: 40,
    height: 40,
  },
});
