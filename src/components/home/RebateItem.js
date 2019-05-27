/**
 * @Name RebateItem
 * @Description 返利item
 * @author wood
 * @date 2019/3/18
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import layout from '../../config/layout';
import colors from '../../config/colors';
// import {CachedImage} from 'react-native-cached-image';
import {ImageDefaultRecSource} from '../ImagePlaceholder';

export default class RebateItem extends Component {

  /**
   [{
		"keyword": "男装",
		"name": "男装",
		"img": "http://static.test.com/images/app-category-02-3x.png?time1552978900"
		}]
   * */
  render() {
    return (
        <View style={styles.container}>
          <Swiper>
            <View style={styles.swipeView}>
              {
                this.props.model.map((obj, index) => {
                  return (
                      <TouchableOpacity key={index} style={styles.itemStyle}>
                        <Image
                            style={styles.imageStyle}
                            source={{uri: obj.img}}
                            defaultSource={ImageDefaultRecSource}/>
                        <Text style={styles.textStyle}>{obj.name}</Text>
                      </TouchableOpacity>
                  );
                })
              }
            </View>
          </Swiper>
        </View>
    );
  };

  // render() {
  //   let array = [];
  //   return (
  //       <View style={styles.container}>
  //         <Swiper>
  //           {
  //             this.props.model.map((obj, index) => {
  //               if (array.push(obj) === 8) {
  //                 this.renderSwiper(array, index);
  //                 array = [];
  //               }
  //             })
  //           }
  //         </Swiper>
  //       </View>
  //   );
  // };

  renderSwiper = (items, index) => {
    return (
        <View style={[styles.container, styles.swiperView]} key={index}>
          {
            items.map((obj, index) => {
              return (
                  <TouchableOpacity key={index} style={styles.itemStyle}>
                    <Image
                        style={styles.imageStyle}
                        source={{uri: obj.img}}
                        PlaceholderContent={ImagePlaceholder}/>
                    <Text style={styles.textStyle}>{obj.name}</Text>
                  </TouchableOpacity>
              );
            })
          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: layout.width,
    height: 160,
  },
  swipeView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  imageStyle: {
    width: 40,
    height: 40,
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.c333,
  },
  itemStyle: {
    width: 80,
    height: 80,
    // justifyContent: 'center',
    alignItems: 'center',
  },
});
