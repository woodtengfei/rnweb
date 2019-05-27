/**
 * @Name ApiUtil
 * @Description 网络接口
 * @author wood
 * @date 2019/3/15
 */
import {Alert} from 'react-native';
import util from '../util/util';
import sha1 from 'crypto-js/sha1';
import DeviceInfo from 'react-native-device-info';
import layout from '../config/layout';
import queryString from 'querystring';
import I18n from '../i18n/i18n';

const CONTENT_TYPE_JSON = "application/json; charset=utf-8";
const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded; charset=UTF-8";

let ShowTokenInvalidAlert = false;

export default class ApiUtil {

  static mall = __DEV__ ? "http://mall.super.com/" : "https://mall.superbuy.com/";
  static bbs = __DEV__ ? "http://bbs.test.com/" : "https://bbs.superbuy.com/";
  static gateway = __DEV__ ? "http://api.test.com/gateway/" : "https://api.superbuy.com/gateway/";
  static newApi = __DEV__ ? "http://api.test.com/" : "https://api.superbuy.com/";
  static front = __DEV__ ? "http://front.test.com/" : "https://front.superbuy.com/";


static fetch(path: string, params: object = {}, callback: function, options: object = {method: ApiUtil.method.get, encrypt: ApiUtil.encrypt.v3, baseUrl: ApiUtil.front}) {
    // 用户不传入params，则末尾参数就是callback
    if (typeof params === 'function') {
      if (arguments.length === 2) {
        callback = params;
        params = {};
      }
      if (arguments.length === 3 && typeof callback !== 'object') {
        options = callback;
        callback = params;
        params = {};
      }
    }
    // 根据encrypt获取header
    let encrypt;
    switch (options['encrypt']) {
      case ApiUtil.encrypt.v1:
        encrypt = ApiUtil.encrypt.v1;
        break;
      case ApiUtil.encrypt.v2:
        encrypt = ApiUtil.encrypt.v2;
        break;
      default:
        encrypt = ApiUtil.encrypt.v3;
    }
    delete options['encrypt'];
    let headers = ApiUtil.getHeaderFields(encrypt);
    let body = null;
    let urlString = (options['baseUrl'] || ApiUtil.front) + path;
    let method = ApiUtil.method.get === options['method'] ? ApiUtil.method.get : ApiUtil.method.post;
    delete options['baseUrl'];
    delete options['encrypt'];
    // 除了encrypt、method、baseUrl之外其他属性都算是用户自定义的header
    for (let key in options) {
      headers[key] = options[key];
    }
    // post默认是application/json提交，get默认是表单提交，可以在options中自定义
    if (ApiUtil.method.post === method) {
      body = headers['Content-Type'] === CONTENT_TYPE_JSON ? JSON.stringify(params) : queryString.stringify(params);
    } else {
      headers['Content-Type'] = CONTENT_TYPE_FORM;
      urlString += '?' + queryString.stringify(params);
    }
    if (body === null && CONTENT_TYPE_JSON === headers['Content-Type']) {
      body = JSON.stringify(params);
    }
    console.log('------------request info-----------\nurlString:', urlString, '\nmethod:', method, '\nheaders:', headers, '\nbody:', body, '\n------end------');
    fetch(urlString, {
      method: method,
      headers: headers,
      body: body,
      credentials: 'include',
      mode: 'cors',
    }).then((response) => response.json()).then((json) => {
      console.log('------fetch json------\n', json, '\n------end------');
      let result = json;
      if (json['state'] !== undefined) {
        result = {isSuccess: json['state'] === 0, code: json['state'], msg: json['msg'], data: json['data']};
      } else if (json['Code'] !== undefined) {
        result = {isSuccess: json['Code'] === 10000, code: json['Code'], msg: json['Message'], data: json['Data'] || json['List']};
      }
      // 登录状态已过期
      if (!result.isSuccess && result.code === 10002 && ShowTokenInvalidAlert === false) {
        ShowTokenInvalidAlert = true;
        Alert.alert(
            I18n.t('alert.title'),
            result.msg,
            [
              {text: I18n.t('alert.sure'), onPress: () => {ShowTokenInvalidAlert = false;}},
              {text: I18n.t('alert.cancel'), onPress: () => ShowTokenInvalidAlert = false, style: 'cancel'},
            ],
            { cancelable: false }
        )
      }
      typeof callback === 'function' && callback(result);
    }).catch((error) => {
      console.log('------fetch error------\n', error, '\n------end------');
      typeof callback === 'function' && callback(error);
    });
  }

  static encrypt = {
    v1: 1,
    v2: 2,
    v3: 3,
  };

  static method = {
    get: "GET",
    post: "POST",
  };

  static getHeaderFields(type: ApiUtil.encrypt) {

    let userId = util.getUserId();
    let token = util.getAccessToken();
    let cityName = util.getCityName();
    let appVersion = util.getAppVersion();
    let sysVersion = util.getSystemVersion();
    let interval = Date.now();
    let language = util.getLanguage();
    let currency = util.getCurrency();
    let tagA = util.getTagA();
    let tagQ = util.getTagQ();
    let ntag = util.getNTag();
    let platform = util.getPlatform();
    let appName = util.getAppName();
    let secret = 'yaA9pBTwBdTDYz6ruLiJOI8jkijJ3Vs3';

    switch (type) {
      case ApiUtil.encrypt.v1:
        let sign1 = '456access_token:'+token+'&app_key:aaa&partner_id:&service:dotdotbuy&timestamp:'+interval+'&user_id:'+userId+'&456';
        return {
          'service': 'dotdotbuy',
          'app_key': 'aaa',
          'app-key': 'aaa',
          'partner_id': '',
          'partner-id': '',
          'timestamp': interval,
          'Ddb-Mobile-Version': sysVersion,
          'Ddb-Mobile-Platform': platform,
          'app_lang': language,
          'app-lang': language,
          'appVersion': appVersion,
          'appversion': appVersion,
          'access_token': token,
          'access-token': token,
          'user_id': userId,
          'user-id': userId,
          'WtagQ': tagQ,
          'WtagA': tagA,
          'Ntag': ntag,
          'sign': sha1(sign1),
        };
      case ApiUtil.encrypt.v2:
        let sign2 = secret+'accessToken:'+token+'&apiVersion:2.0.0&appLang:'+language+'&appVersion:'+appVersion+'&platform:'+platform+'&timestamp:'+interval+'&userId:'+userId+secret;
        return {
          'userId': userId,
          'accessToken': token,
          'appName': appName,
          'appVersion': appVersion,
          'apiVersion': '2.0.0',
          'platform': platform,
          'timestamp': interval,
          'appLang': language,
          'app_lang': language,
          'signMethod': 'sha1',
          'WtagQ': tagQ,
          'WtagA': tagA,
          'Ntag': ntag,
          'signature': sha1(sign2),
        };
      default:
        let pixel = layout.width * layout.scale + "x" + layout.width * layout.scale;
        let carrierName = DeviceInfo.getCarrier() || '';
        // 需要加密的参数
        let encryptParams = {
          'userId': userId,
          'accessToken': token,
          'appName': appName,
          'appVersion': appVersion,
          'apiVersion': '3.0.0',
          'platform': platform,
          'timestamp': interval,
          'currency': currency,
          'language': language,
        };
        let keys = [
          'accessToken',
          'apiVersion',
          'appName',
          'appVersion',
          'currency',
          'language',
          'platform',
          'timestamp',
          'userId'];
        let originSecret = secret +
            keys.map(function(key) {return key + ':' + encryptParams[key];}).
                join('&') + secret;
        // 不需要加密的
        let uncryptParams = {
          'carrier': carrierName,
          'IDFV': DeviceInfo.getUniqueID(),
          'imei': '',
          'location': cityName,
          'network': 'WIFI',
          'pixel': pixel,
          'signMethod': 'sha1',
          'systemVersion': sysVersion,
          'signature': String(sha1(originSecret)).toUpperCase(),
          'viewPage': '',
          'Ntag': ntag,
          'WtagQ': tagQ,
          'WtagA': tagA,
        };
        return Object.assign(encryptParams, uncryptParams);
    }
  }

}
