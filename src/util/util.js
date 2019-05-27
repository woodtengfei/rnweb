/**
 * @Name util
 * @Description 常用工具类
 * @author wood
 * @date 2019/3/15
 */
import DeviceInfo from 'react-native-device-info'
import {Platform} from 'react-native';
import { AsyncStorage } from "react-native"
import I18n from '../i18n/i18n';
import layout from '../config/layout';
import Toast from 'react-native-root-toast';

let USER_INFO = null;
const USER_INFO_KEY = '@UserInfo:USER_INFO_KEY';
let TOAST_IS_SHOW = false;

const util = {
  isIPhoneX: ():boolean => {
    return (Platform.OS === 'ios' && (Number(((layout.height/layout.width)+"").substr(0,4)) * 100) === 216);
  },
  getCityName: ():string => {
    return 'Shenzhen';
  },
  getAppName: ():string => {
    return 'superbuy';
  },
  getAppVersion: ():string => {
    return DeviceInfo.getVersion();
  },
  getSystemVersion: ():string => {
    return DeviceInfo.getSystemVersion();
  },
  getPlatform: ():string => {
    return Platform.OS === 'ios' ? 'iOS' : 'Android';
  },
  getTagA: ():string => {
    return '';
  },
  getTagQ: ():string => {
    return '';
  },
  getNTag: ():string => {
    return '';
  },
  getLanguage: ():string => {
    return (USER_INFO && USER_INFO['language']) || I18n.getLanguage();
  },
  getCurrency: ():string => {
    return (USER_INFO && USER_INFO['currencyCode']) || 'CNY';
  },
  getUserId: ():string => {
    return (USER_INFO && USER_INFO['userId']) || '';
  },
  getAccessToken: ():string => {
    return (USER_INFO && USER_INFO['accessToken']) || '';
  },
  getUserName: ():string => {
    return (USER_INFO && USER_INFO['loginToken']) || '';
  },
  setUserInfo: async (userInfo) => {
    try {
      USER_INFO = userInfo;
      await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    } catch (error) {
      console.log(error);
    }
  },
  getUserInfo: async ():Object => {
    try {
      if (USER_INFO !== null) {
        return USER_INFO;
      }
      console.log('async getUserInfo');
      const value = await AsyncStorage.getItem(USER_INFO_KEY);
      if (value !== null) {
        USER_INFO = JSON.parse(value);
        I18n.setLanguage(USER_INFO['language']);
        return USER_INFO;
      }
      return {};
    } catch (error) {
      console.log(error);
    }
  },
  isLogin: ():boolean => {
    return util.getUserId() && util.getAccessToken();
  },
  formatPrice: (value): number => {
    let tmp = parseFloat(value);
    if (isNaN(tmp)) {
      return value;
    } else {
      return tmp.toFixed(2);
    }
  },
  toast: (string):void => {
    if (TOAST_IS_SHOW) return;
    let toast = Toast.show(string, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShown: () => TOAST_IS_SHOW = true,
      onHidden: () => TOAST_IS_SHOW = false,
    });
  },
};

export default util;

(util.getUserInfo)();
