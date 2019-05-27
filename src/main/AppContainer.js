/**
 * @Name AppContainer
 * @Description AppContainer
 * @author wood
 * @date 2019/3/7
 */
import React from 'react';
import {createAppContainer, createBottomTabNavigator} from 'react-navigation';
import {Image} from 'react-native';
import colors from '../config/colors';
import HomeStack from './HomeStack';
import PersonalStack from './PersonalStack';
import CartStack from './CartStack';
import SocialStack from './SocialStack';
import DiscoveryStack from './DiscoveryStack';

const TabNavigator = createBottomTabNavigator(
    {
      Home: HomeStack,
      Discovery: DiscoveryStack,
      Social: SocialStack,
      Cart: CartStack,
      Personal: PersonalStack,
    },
    {
      tabBarOptions: {
        // 当前选中的tab bar的文本颜色和图标颜色
        activeTintColor: colors.c142341,
        // 当前未选中的tab bar的文本颜色和图标颜色
        inactiveTintColor: colors.c999,
        // 是否显示tab bar的图标，默认是false
        showIcon: true,
        // 否显示tab bar的文本，默认是true
        showLabel: true,
        // 是否将文本转换为大小，默认是true
        upperCaseLabel: false,
        // 按下tab bar时的不透明度(仅支持iOS和Android < 5.0)
        pressOpacity: 0.8,
        // tab bar的样式
        style: {
          backgroundColor: colors.white,
          paddingBottom: 1,
          borderTopWidth: 0.2,
          paddingTop: 1,
          borderTopColor: colors.ccc,
        },
        // tab bar的文本样式
        labelStyle: {
          fontSize: 12,
        },
      },
      // tab bar的位置,可选值:'top' or 'bottom'
      tabBarPosition: 'bottom',
      // 是否允许滑动切换tab页
      swipeEnabled: false,
      // 是否在切换tab页时使用动画
      animationEnabled: true,
      // 是否懒加载
      lazy: true,
      // 返回按钮是否会导致tab切换到初始tab页？是：initialRoute,否：none
      backBehavior: 'initialRoute',
      initialRouteName: 'Home',
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let source;
          switch (routeName) {
            case 'Home':
              source = focused ?
                  require('../../assets/images/tabbar/tab_main_select.png') :
                  require('../../assets/images/tabbar/tab_main_normal.png');
              break;
            case 'Discovery':
              source = focused ?
                  require('../../assets/images/tabbar/tab_discovery_select.png') :
                  require('../../assets/images/tabbar/tab_discovery_normal.png');
              break;
            case 'Social':
              source = focused ?
                  require('../../assets/images/tabbar/tab_bbs_select.png') :
                  require('../../assets/images/tabbar/tab_bbs_normal.png');
              break;
            case 'Cart':
              source = focused ?
                  require('../../assets/images/tabbar/tab_cart_select.png') :
                  require('../../assets/images/tabbar/tab_cart_normal.png');
              break;
            case 'Personal':
              source = focused ?
                  require('../../assets/images/tabbar/tab_personal_select.png') :
                  require('../../assets/images/tabbar/tab_personal_normal.png');
              break;
          }
          return <Image style={{width: 22, height: 22}} source={source}/>
        },
      }),
    },
);

export default AppContainer = createAppContainer(TabNavigator);
