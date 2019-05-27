/**
 * @Name HotUpdate
 * @Description 热更新
 * @author wood
 * @date 2019/4/17
 */
import {Platform, Linking, Alert} from 'react-native';
import I18n from '../i18n/i18n';
// import codePush from 'react-native-code-push';
// import {
//   isFirstTime,
//   isRolledBack,
//   checkUpdate,
//   downloadUpdate,
//   switchVersion,
//   switchVersionLater,
//   markSuccess,
// } from 'react-native-update';
// import _updateConfig from '../../update';
// const {appKey} = _updateConfig[Platform.OS];

const HotUpdate = {
  /************************************
  /// Pushy热更新初始化
  initPushy: ():void => {
    if (isFirstTime) {
      // Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
      //   {text: '是', onPress: () => {throw new Error('模拟启动失败,请重启应用');}},
      //   {text: '否', onPress: () => {markSuccess();}},
      // ]);
      markSuccess();
    } else if (isRolledBack) {
      Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
    }
    // 检查当前版本是否需要更新
    this.checkPushyUpdate = function() {
      this.doUpdate = function(info) {
        downloadUpdate(info).then(hash => {
          Alert.alert(I18n.t('alert.title'), I18n.t('update.downloaded'), [
            {text: I18n.t('alert.yes'), onPress: () => {markSuccess();switchVersion(hash);}},
            {text: I18n.t('alert.no')},
            {text: I18n.t('update.nextTime'), onPress: () => {markSuccess();switchVersionLater(hash);}},
          ]);
        }).catch(err => {
          console.log('pushy downloadUpdate 更新失败', err);
        });
      };
      checkUpdate(appKey).then(info => {
        if (info.expired) {
          // 该应用包(原生部分)已过期，需要前往应用市场下载新的版本
          Alert.alert(I18n.t('alert.title'), I18n.t('update.expired'), [
            {text: I18n.t('alert.sure'),
              onPress: () => {info.downloadUrl && Linking.openURL(info.downloadUrl);},
            },
            {text: I18n.t('alert.cancel')},
          ]);
        } else if (info.upToDate) {
          // 当前已经更新到最新，无需进行更新
          console.log('您的应用版本已是最新');
        } else {
          // 当前有新版本可以更新(非原生部分-更新脚本)
          Alert.alert(I18n.t('alert.title'),
              I18n.t('update.newVersion') + info.name +
              I18n.t('update.isUpdate') + info.description, [
                {text: I18n.t('alert.yes'), onPress: () => this.doUpdate(info)},
                {text: I18n.t('alert.no')},
              ]);
        }
      }).catch(err => {
        console.log('pushy checkUpdate 更新失败', err);
      });
    };
    // 检查版本更新
    this.checkPushyUpdate();
  },
   ***************************************/
  /// CodePush热更新初始化
  initCodePush: ():void => {
    if (Platform.OS === 'web') {
      console.log('web');
      return;
    }
    /**
     * 苹果App允许使用热更新，为了不影响用户体验，规定必须使用静默更新。
     * Google Play不能使用静默更新，必须弹框告知用户App有更新。
     * 中国的android市场必须采用静默更新（如果弹框提示，App会被“请上传最新版本的二进制应用包”原因驳回）
     * */
    let updateDialog = __DEV__;
    if (!__DEV__ && Platform.OS === 'android') {
      updateDialog = true;
    }
    // 自动检查、下载、安装更新，不需要自定义UI或其他操作
    // codePush.sync({
    //   // 建议updateDialog=false有助于App Store审核
    //   updateDialog: updateDialog,
    //   installMode: codePush.InstallMode.IMMEDIATE
    // });
  },
};
export default HotUpdate;
