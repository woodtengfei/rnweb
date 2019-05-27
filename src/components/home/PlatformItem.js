/**
 * @Name PlatformItem
 * @Description 首页平台项
 * @author wood
 * @date 2019/3/14
 */
import React, {Component} from 'react';
import {StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import colors from '../../config/colors';
import device from '../../config/layout';

const imageMap = {
  'goodsZy': require('../../../assets/images/platform/goodsZy.png'),
  '1688': require('../../../assets/images/platform/1688.png'),
  'airTicket': require('../../../assets/images/platform/airTicket.png'),
  'business': require('../../../assets/images/platform/business.png'),
  'dgWebGoods': require('../../../assets/images/platform/dgWebGoods.png'),
  'dgNativeGoods': require('../../../assets/images/platform/dgNativeGoods.png'),
  'errorHint': require('../../../assets/images/platform/errorHint.png'),
  'errorPage': require('../../../assets/images/platform/errorPage.png'),
  'expert': require('../../../assets/images/platform/expert.png'),
  'feeEstimate': require('../../../assets/images/platform/feeEstimate.png'),
  'law': require('../../../assets/images/platform/law.png'),
  'mall': require('../../../assets/images/platform/mall.png'),
  'noJump': require('../../../assets/images/platform/noJump.png'),
  'more': require('../../../assets/images/platform/more.png'),
  'partner': require('../../../assets/images/platform/partner.png'),
  'pkgZy': require('../../../assets/images/platform/pkgZy.png'),
  'prime': require('../../../assets/images/platform/prime.png'),
  'rebate': require('../../../assets/images/platform/rebate.png'),
  'selected': require('../../../assets/images/platform/selected.png'),
  'selectedMall': require('../../../assets/images/platform/selectedMall.png'),
  'shopList': require('../../../assets/images/platform/shopList.png'),
  'topicList': require('../../../assets/images/platform/topicList.png'),
  'tourism': require('../../../assets/images/platform/tourism.png'),
  'virtual': require('../../../assets/images/platform/virtual.png'),
  'webView': require('../../../assets/images/platform/webView.png'),
  'zyHome': require('../../../assets/images/platform/zyHome.png'),
  'dgService': require('../../../assets/images/platform/webView.png'),
};

export default class PlatformItem extends Component {

  render() {
    return (
        <TouchableOpacity style={styles.container} {...this.props} activeOpacity={0.8}>
          <Image
              style={styles.imageStyle}
              source={imageMap[this.props.model.event] || imageMap['webView']}/>
          <Text style={styles.textStyle} numberOfLines={2} >{this.props.model.routeName}</Text>
        </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: device.width * 0.25,
    height: 70,
    alignItems: 'center',
    marginTop: 10,
  },
  imageStyle: {
    width: 40,
    height: 40,
  },
  textStyle: {
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    fontSize: 12,
    color: colors.c333,
  },
});
