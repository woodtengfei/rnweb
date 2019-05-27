/**
 * @Name PersonalStack
 * @Description 个人中心导航栈
 * @author wood
 * @date 2019/3/12
 */
import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import PersonalScreen from '../views/personal/Personal';
import LoginRegister from '../views/login/LoginRegister';
import colors from '../config/colors';
import I18n from '../i18n/i18n';

const PersonalStack = createStackNavigator(
    {
      Personal: PersonalScreen,
      Login: LoginRegister,
    }, {
      /**
       * headerStyle：整个标题栏样式，backgroundColor是标题栏背景颜色
       * headerTintColor：返回按钮和标题的颜色
       * headerTitleStyle：为标题定制fontFamily，fontWeight和其他Text样式属性
       * */
      defaultNavigationOptions: {
        header: null,
        title: I18n.t('tabBar.personal'),
        headerStyle: {
          backgroundColor: colors.c142341,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
);

export default PersonalStack;
