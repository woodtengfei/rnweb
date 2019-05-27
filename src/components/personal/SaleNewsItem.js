/**
 * @Name SaleNewsItem
 * @Description 个人中心item
 * @author wood
 * @date 2019/3/18
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
// import {CachedImage} from 'react-native-cached-image';
import {ImageDefaultSource} from '../../components/ImagePlaceholder';
import layout from '../../config/layout';
import colors from '../../config/colors';
import util from '../../util/util';

export default class SaleNewsItem extends Component {

  constructor() {
    super();
    this.onClick = () => {

    };
  }

  /**
   title: "明星同款磨砂酒神包女单肩包斜挎包女包2018秋冬新款虎头包链条包",
   img: "",
   href: "",
   shopId: "15",
   shopName: "基本信息",
   price: 168,
   discountPrice: 44,
   goodsId: "218584172084",
   sellerPlatform: "Superbuy-Selected",
   businessType: 2,
   detailBusinessType: 1,
   productType: 1,
   goodsCode: "SUPERBUY218584172084",
   currencyCode: "CNY",
   currencySymbol: "CN ￥",
   rebateStatus: 0,
   rebatePercent: 0,
   rebatePrice: 0,
   productStock: 10,
   promotion: { }
   * */
  render() {
    let model = this.props.model;
    return (
        <TouchableOpacity style={styles.container} onPress={this.onClick()} activeOpacity={1}>
          <Image
              style={styles.imageStyle}
              source={{uri: model.img}}
              defaultSource={ImageDefaultSource}/>
          <Text numberOfLines={2} style={[styles.text, {color: colors.c333, paddingTop: layout.inset}]}>{model.title}</Text>
          <View style={styles.price}>
            <Text style={{color: colors.price, fontSize: 14}}>{model.currencySymbol + util.formatPrice(model.price)}</Text>
            <Text style={{color: colors.c999, fontSize: 12, textDecorationLine: 'line-through'}}>{model.currencySymbol + util.formatPrice(model.discountPrice)}</Text>
          </View>
        </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: layout.width * 0.5 - 3,
    height: layout.width * 0.5 + 82,
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
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginLeft: layout.inset,
    marginRight: layout.inset,
  },
});
