/**
 * @Name SocialStack
 * @Description 社区导航栈
 * @author wood
 * @date 2019/3/12
 */
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Social from '../views/bbs/Social';
import colors from '../config/colors';
import I18n from '../i18n/i18n';

const SocialScreen = ({ navigation }) => (
    <Social navigation={navigation} />
);

const SocialStack = createStackNavigator(
    {
      Social: SocialScreen,
    }, {
      /**
       * headerStyle：整个标题栏样式，backgroundColor是标题栏背景颜色
       * headerTintColor：返回按钮和标题的颜色
       * headerTitleStyle：为标题定制fontFamily，fontWeight和其他Text样式属性
       * */
      defaultNavigationOptions: {
        title: I18n.t('tabBar.bbs'),
        headerStyle: {
          backgroundColor: colors.white,
        },
        headerTintColor: colors.c5ba0ff,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
);

export default SocialStack;
