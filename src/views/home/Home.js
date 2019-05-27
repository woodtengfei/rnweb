/**
 * @Name Home
 * @Description 首页
 * @author wood
 * @date 2019/3/12
 */
import React, {Component} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  RefreshControl,
  Button,
  Image,
} from 'react-native';
import colors from '../../config/colors';
import I18n from '../../i18n/i18n';
import device from '../../config/layout';
import FloatHeader from '../../components/home/FloatHeader';
import SearchView from '../../components/home/SearchView';
import ApiUtil from '../../api/ApiUtil';
import PlatformItem from '../../components/home/PlatformItem';
import BannerItem from '../../components/home/BannerItem';
import RebateItem from '../../components/home/RebateItem';
import SaleNewsItem from '../../components/home/SaleNewsItem';
import util from '../../util/util';

class HeaderButton extends Component {
  render() {
    return (
        <TouchableOpacity {...this.props} style={{padding: 3}}>
          <Text style={styles.headerBtnTitle}>{this.props.title}</Text>
        </TouchableOpacity>
    );
  }
}

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      value: 0.5,
      platform: [],
      allPlatform: [],
      rebateItems: [],
      saleNews: [],
      refreshing: false,
    };

    this.onClick = (event) => {
      console.log('click' + event);
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._fetchData();
  };


  componentDidMount() {
    this._fetchData();
  }

  _fetchData = () => {
    ApiUtil.fetch("advert/vert", (result) => {
      if (result.isSuccess) {

      }
    });
    ApiUtil.fetch("app/query-navigation-list", (result) => {
      if (result.isSuccess) {
        let array = result.data.filter((obj, index) => { return index < 8 });
        let more = array.pop();
        more['event'] = 'more';
        more['routeName'] = 'More';
        array.push(more);
        this.setState({allPlatform: result.data, platform: array});
      }
    });
    ApiUtil.fetch("app/category-list", (result) => {
      if (result.isSuccess) {
        this.setState({rebateItems: result.data});
      }
    });
    ApiUtil.fetch("shoppingguide/sale-daily-new?count=50", (result) => {
      if (result.isSuccess) {
        let state = {saleNews: result.data};
        if (this.state.refreshing) {
          Object.assign(state, {refreshing: false});
        }
        this.setState(state);
      }
    });
  };

  render() {
    const {navigation} = this.props;
    const buttons = ['Button1', 'Button2'];
    const {selectedIndex} = this.state;

    return (
        <ScrollView
            refreshControl={
              <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
              />
            }>
          <ImageBackground
              style={styles.headerContainer}
              source={I18n.isChinese() ?
                  require('../../../assets/images/header/header_bg_new.png') :
                  require('../../../assets/images/header/header_bg_new_en.png')}>
            <FloatHeader />
            <View style={{flexDirection: 'row', height: 20, marginTop: 8}}>
              <Image
                  style={styles.headerLogo}
                  source={require('../../../assets/images/home/home_superbuy_logo.png')}/>
              <HeaderButton title={I18n.t('home.learnMore')} onPress={this.onClick('about')}/>
            </View>
            <Text style={styles.headerLogoText}>{I18n.t('home.headerTitle')}</Text>
            <SearchView style={{marginTop: 8}} />
            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
              <HeaderButton title={I18n.t('home.dgGuideMore')} onPress={this.onClick('guide-dg')}/>
              <HeaderButton title="|"/>
              <HeaderButton title={I18n.t('home.firstUseGuide')} onPress={this.onClick('guide-use')}/>
            </View>
            <View style={styles.platformContainer}>
              {
                this.state.platform.map((obj) => {
                  return (<PlatformItem model={obj} key={obj.id}/>);
                })
              }
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{flexDirection: 'row', backgroundColor: colors.eee}}
                onPress={console.log('click feeEstimate')}>
              <Image style={{width: device.width * 0.7, height: 40}} source={I18n.isChinese() ?
                  require('../../../assets/images/header/header_content_left_bg.png') :
                  require('../../../assets/images/header/header_content_left_bg_en.png')
              }/>
              <Image style={{width: device.width * 0.3, height: 40}} source={I18n.isChinese() ?
                  require('../../../assets/images/header/header_content_right_bg.png') :
                  require('../../../assets/images/header/header_content_right_bg_en.png')
              }/>
            </TouchableOpacity>
          </ImageBackground>
          <View style={styles.bannerBg}>
            <BannerItem />
            <BannerItem />
            <BannerItem />
            <BannerItem />
          </View>
          <View style={{justifyContent: 'center', backgroundColor: colors.white}}>
            <Button title={I18n.t('home.dgRebate')} icon={
              <Image style={{width: 32, height: 32}} source={require('../../../assets/images/home/home_dg_rebate.png')}/>
            } type="clear" titleStyle={{color: colors.cf48e2b, fontSize: 20, fontWeight: 'bold', marginLeft: 8}} onPress={this.onClick('rebate')}
            />
            <Text style={{textAlign: 'center'}}>{I18n.t('home.rebateDetail')}</Text>
            <Button title={I18n.t('home.rebateTip')} icon={
              <Image style={{width: 12, height: 12}} source={require('../../../assets/images/home/rebate_detail.png')}/>
            } type="clear" titleStyle={{color: colors.c333, fontSize: 12, marginLeft: 5}} onPress={this.onClick('rebate-tip')}
            />
          </View>
          {
            this.state.rebateItems.length > 0 && <RebateItem model={this.state.rebateItems}/>
          }
          <View style={styles.saleNewsHeaderView}>
            <Image style={{width: 22, height: 22}} source={require('../../../assets/images/home/sale_news.png')}/>
            <Text style={styles.saleNewsHeaderTitle}>{I18n.t('home.saleNews')}</Text>
          </View>
          <View style={styles.saleNewsContainer}>
            {
              this.state.saleNews.length > 0 && this.state.saleNews.map((obj, index) => {
                return <SaleNewsItem model={obj} key={index}/>
              })
            }
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: device.width,
    height: util.isIPhoneX() ? 388 : 375,
  },
  headerLogo: {
    width: 100,
    height: 20,
    marginLeft: device.inset,
  },
  headerLogoText: {
    marginLeft: device.inset,
    marginRight: device.inset,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.ccc,
  },
  headerBtnTitle: {
    fontSize: 12,
    color: colors.c0073e2,
  },
  platformContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: device.width,
    height: 165,
    marginTop: 10,
  },
  bannerBg: {
    top: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    // alignItems单行，alignContent多行
    // alignContent: 'space-around',
    width: device.width,
    height: 232,
    backgroundColor: colors.eee,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  saleNewsHeaderView: {
    flexDirection: 'row',
    backgroundColor: colors.eee,
    height: 48,
    justifyContent: 'center',
    paddingTop: 18,
  },
  saleNewsHeaderTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.price,
    marginLeft: 8,
  },
  saleNewsContainer: {
    backgroundColor: colors.eee,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
});
