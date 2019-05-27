/**
 * @Name BannerItem
 * @Description 首页banner
 * @author wood
 * @date 2019/3/18
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import layout from '../../config/layout';
// import {CachedImage} from 'react-native-cached-image';
import {ImageDefaultRecSource} from '../ImagePlaceholder';

export default class BannerItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ds: [{
        "id": 22233,
        "alt": "",
        "title": "吃货福利清单  爆款美食1元起",
        "subTitle": "吃货福利清单  爆款美食1元起",
        "img": "https://img1.superbuy.com/images/daigou-admin/2019/03/15/8030b169-1be8-465b-8474-824b7a650e82.jpg",
        "href": "https://m.superbuy.com/cn/topic/detail/?cat=20717",
        "jumpType": 1,
        "jumpTypeInfo": "",
        "name": "吃货福利清单  爆款美食1元起"
      },{
        "id": 22233,
        "alt": "",
        "title": "吃货福利清单  爆款美食1元起",
        "subTitle": "吃货福利清单  爆款美食1元起",
        "img": "https://img1.superbuy.com/images/daigou-admin/2019/03/15/8030b169-1be8-465b-8474-824b7a650e82.jpg",
        "href": "https://m.superbuy.com/cn/topic/detail/?cat=20717",
        "jumpType": 1,
        "jumpTypeInfo": "",
        "name": "吃货福利清单  爆款美食1元起"
      },{
        "id": 22233,
        "alt": "",
        "title": "吃货福利清单  爆款美食1元起",
        "subTitle": "吃货福利清单  爆款美食1元起",
        "img": "https://img1.superbuy.com/images/daigou-admin/2019/03/15/8030b169-1be8-465b-8474-824b7a650e82.jpg",
        "href": "https://m.superbuy.com/cn/topic/detail/?cat=20717",
        "jumpType": 1,
        "jumpTypeInfo": "",
        "name": "吃货福利清单  爆款美食1元起"
      }]
    };
  }

  /**
   [{
			"id": 22233,
			"alt": "",
			"title": "吃货福利清单  爆款美食1元起",
			"subTitle": "吃货福利清单  爆款美食1元起",
			"img": "https://img1.superbuy.com/images/daigou-admin/2019/03/15/8030b169-1be8-465b-8474-824b7a650e82.jpg",
			"href": "https://m.superbuy.com/cn/topic/detail/?cat=20717",
			"jumpType": 1,
			"jumpTypeInfo": "",
			"name": "吃货福利清单  爆款美食1元起"
		}]
   * */
  render() {
    return (
        <View style={styles.container}>
          <Swiper autoplay={true} autoplayTimeout={8}>
            {
              this.state.ds.map((obj, index) => {
                return <Image
                    style={styles.imageStyle}
                    source={{uri: obj.img}}
                    key={obj.id}
                    defaultSource={ImageDefaultRecSource}/>;
              })
            }
          </Swiper>
        </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    width: layout.width * 0.5 - 12,
    height: 95,
    borderRadius: 8,
  },
  imageStyle: {
    width: layout.width * 0.5 - 12,
    height: 95,
  }
});
