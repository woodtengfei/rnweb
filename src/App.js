/**
 * @Name App
 * @Description App主容器注册应用
 * @author wood
 * @date 2019/3/7
 * 参考：https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AppContainer from './main/AppContainer';
import HotUpdate from './util/HotUpdate';

export default class App extends Component {

  /*************************** 生命周期方法 start ***************************/
  // 构造函数，初始化注册应用
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  // 视图加载完成->viewDidLoad
  componentDidMount() {
    // 隐藏启动屏
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      SplashScreen.hide();
    }
    // hot update
    HotUpdate.initCodePush();
  }

  // 视图即将从主页面移除
  componentWillUnmount() {

  }

  /*************************** 生命周期方法 end ***************************/

  /************************* 自定义方法 start *************************/
  // 跳转深度链接
  jumpEvent() {
    // call navigate for AppNavigator here:
    this.navigator &&
    this.navigator.dispatch(
        // NavigationActions.navigate({ routeName: someRouteName })
    );
  }

  /*************************** 自定义方法 end *************************/


  render() {
    return (
        <AppContainer/>
    );
  }
}

