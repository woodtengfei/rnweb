/**
 * @Name I18n
 * @Description 语言国际化配置文件
 * @author wood
 * @date 2019/3/12
 */
import I18n from 'react-native-i18n'
import DeviceInfo from 'react-native-device-info'
import en from './en';
import zh from './zh';

const LANGUAGE_MAP = {en: 'en-US', cn: 'zh-CN'};

/** 首选默认语言 */
I18n.defaultLocale = 'zh-CN';

/** 找相似语言进行模糊匹配 */
I18n.fallbacks = true;

/** 所支持的语言库 */
I18n.translations = {
  zh,
  en,
};

/**
 * 获取/设置用户首选的语言环境
 * 可以从服务器获取或者本地记录用户语言
 * ['en-US', 'zh-CN']
 * */
I18n.setLanguage = (lang) => {
  // 设置本地语言环境
  // I18n.locale = (lang && LANGUAGE_MAP[lang]) || DeviceInfo.getDeviceLocale();
  I18n.locale = DeviceInfo.getDeviceLocale();
  console.log('设备语言环境是：' + I18n.locale);
  // TODO 发送通知-语言改变重新加载
  return I18n.locale;
};

I18n.isChinese = () => {
  return 'zh-CN' === I18n.locale;
};

I18n.getLanguage = () => {
  return I18n.isChinese() ? 'cn' : 'en';
};

export default I18n;

(I18n.setLanguage)();
