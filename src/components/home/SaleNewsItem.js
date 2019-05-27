/**
 * @Name SaleNewsItem
 * @Description 购物时报item
 * @author wood
 * @date 2019/3/18
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import layout from '../../config/layout';
// import {CachedImage} from 'react-native-cached-image';
import {ImageDefaultSource, ImageAvatarSource} from '../../components/ImagePlaceholder';
import colors from '../../config/colors';
import util from '../../util/util';

export default class SaleNewsItem extends Component {

  constructor() {
    super();
    this.onClick = () => {

    };
  }

  /**
   [{
		"id": 3490500,
		"goodsId": "583718809668",
		"goodsPicUrl": "http://gd1.alicdn.com/imgextra/i2/1862027877/O1CN01Qdxiol283iIItbnKE_!!1862027877.jpg",
		"goodsTitle": "km男装开衫毛衣-K078J53015",
		"goodsLink": "http://item.taobao.com/item.htm?id=583718809668",
		"goodsPrice": "149.00",
		"buyerId": 1469177,
		"buyerName": "51056217400001",
		"orderState": "US",
		"goodsOrderTime": 1552988117,
		"status": 1,
		"createTime": 1552987986,
		"updateTime": 1552987986,
		"buyerAvatar": "http://static.test.com/images/avatar_normal.png",
		"userLevel": 1,
		"userLevelType": "VIP1",
		"currencySymbol": "CN ￥",
		"userName": "n***",
		"timeName": "2小时前",
		"countryCode": "US",
		"statePicUrl": "http://static.test.com/images/countryFlag/USA.png"
		}]
   * */
  render() {
    let model = this.props.model;
    return (
        <TouchableOpacity style={styles.container} onPress={this.onClick()} activeOpacity={1}>
          <Image
              style={styles.imageStyle}
              source={{uri: model.goodsPicUrl}}
              defaultSource={ImageDefaultSource}/>
          <Text numberOfLines={1} style={[styles.text, {color: colors.c333, paddingTop: layout.inset}]}>{util.formatPrice(model.goodsTitle)}</Text>
          <Text style={[styles.text, {color: colors.price, lineHeight: 20}]}>{model.currencySymbol + util.formatPrice(model.goodsPrice)}</Text>
          <View style={{backgroundColor: colors.eee, height: 1, left: 10, right: 10, marginTop: 8, marginBottom: 8}}/>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.avatar} rounded source={{uri: model.buyerAvatar}}/>
            <View>
              <Text style={styles.detailText}>{model.buyerName || model.userName}</Text>
              <View style={{flexDirection: 'row', marginTop: 3}}>
                <Image
                    style={{width: 17, height: 11, marginRight: 3}}
                    source={{uri: model.statePicUrl}}
                    defaultSource={ImageAvatarSource}/>
                <Text style={styles.detailText}>{model.countryCode + '·' + model.timeName}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: layout.width * 0.5 - 3,
    height: layout.width * 0.5 + 100,
    backgroundColor: colors.white,
    marginBottom: 6,
  },
  imageStyle: {
    width: layout.width * 0.5 - 3,
    height: layout.width * 0.5 - 3,
  },
  text: {
    fontSize: 14,
    paddingLeft: layout.inset,
    paddingRight: layout.inset,
  },
  detailText: {
    fontSize: 10,
    color: colors.c999,
  },
  avatar: {
    width: 20,
    height: 20,
    marginTop: 5,
    marginLeft: layout.inset,
    marginRight: 8,
  }
});
