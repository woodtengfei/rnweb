/**
 * @Name Personal
 * @Description 个人中心
 * @author wood
 * @date 2019/3/12
 */
import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../../config/colors';
import util from '../../util/util';
import layout from '../../config/layout';
import FloatHeader from '../../components/home/FloatHeader';
import I18n from '../../i18n/i18n';
import ApiUtil from '../../api/ApiUtil';
import SaleNewsItem from '../../components/personal/SaleNewsItem';

const orderList = [
  {name: '待付款', value: 26},
  {name: '等待入库中', value: 102},
  {name: '在库待寄送', value: 13},
  {name: '待收货/晒单', value: 110},
];

const optionsList = [
  {name: '收藏', source: require('../../../assets/images/personal/user_icon_collection.png')},
  {name: '用户服务', source: require('../../../assets/images/personal/user_icon_userservice.png')},
  {name: '运费估算', source: require('../../../assets/images/personal/personal_icon_post_query.png')},
  {name: '地址管理', source: require('../../../assets/images/personal/personal_icon_address.png')},
];

export default class Personal extends Component {

  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      value: 0.5,
      unConfirm: null,
      shoppingItems: [],
      refreshing: false,
    };

  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this._fetchData();
  };

  _fetchData = () => {
    ApiUtil.fetch("order/site/unconfirm-sort", (result) => {
      if (result.isSuccess) {
        this.setState({unConfirm: result.data});
      }
    });
    ApiUtil.fetch("shoppingguide/recommand-list?currPage=1&pageSize=30", (result) => {
      if (result.isSuccess) {
        let state = {shoppingItems: result.data.productList};
        if (this.state.refreshing) {
          Object.assign(state, {refreshing: false});
        }
        this.setState(state);
      }
    });
    ApiUtil.fetch("activity/privilege/get-user-privilege", {}, (result) => {
      if (result.isSuccess) {

      }
    }, {method: ApiUtil.method.post});
    ApiUtil.fetch("activity/privilege/user-receive-status", {}, (result) => {
      if (result.isSuccess) {

      }
    }, {method: ApiUtil.method.post});
    ApiUtil.fetch("activity/share-activity-lottery/un-finished-lottery-list", {}, (result) => {
      if (result.isSuccess) {

      }
    }, {method: ApiUtil.method.post});
  };

  componentDidMount() {
    // 如果未登录跳转登录注册页面
    if (!util.isLogin()) {
      const {navigation} = this.props;
      navigation.push('Login');
      return;
    }
    this._fetchData();
  }

  render() {
    const {navigation} = this.props;
    const buttons = ['Button1', 'Button2'];
    const {selectedIndex} = this.state;

    return (
        <ScrollView refreshControl={
          <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
          />
        }>
          <ImageBackground style={{width: layout.width, height: 160}} source={require('../../../assets/images/personal/personal_header_normal.png')}>
            <FloatHeader type="personal"/>
            <View style={{flexDirection: 'row', marginTop: 20}}>
              {/*<Avatar*/}
                  {/*rounded*/}
                  {/*overlayContainerStyle={{backgroundColor: colors.clear}}*/}
                  {/*containerStyle={styles.avatarContainerStyle}*/}
                  {/*onPress={() => console.log('click avatar')}*/}
                  {/*source={require('../../../assets/images/personal/icon_avatar_default.png')}*/}
              {/*/>*/}
              <View style={{marginLeft: layout.inset}}>
                <Text style={styles.headerTitle}>小伍</Text>
                <Text style={styles.headerPrimeDetail} numberOfLines={2}>{I18n.t('personal.primeDetail')}</Text>
                <TouchableOpacity style={styles.primeNow}>
                  <Text style={{fontSize: 14, color: colors.c333}}>{I18n.t('personal.openPrimeNow')}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.checkIn}>
                <Image style={{width: 12, height: 12}} source={require('../../../assets/images/personal/icon_user_check_in.png')}/>
                <Text style={{fontSize: 10, color: colors.white}}>{I18n.t('personal.checkSign')}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: layout.width, height: 60}}>
            <View style={{width: layout.width / 3.0, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: colors.price, fontSize: 16}}>0.00</Text>
                <Text style={{color: colors.c999, fontSize: 10, paddingTop: 5}}> CN ￥</Text>
              </View>
              <Text style={{color: colors.c666, fontSize: 12}}>当前余额</Text>
            </View>
            <View style={{width: layout.width / 3.0, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: colors.price, fontSize: 16}}>0</Text>
                <Text style={{color: colors.c999, fontSize: 10, paddingTop: 5}}> 张</Text>
              </View>
              <Text style={{color: colors.c666, fontSize: 12}}>优惠券</Text>
            </View>
            <View style={{width: layout.width / 3.0, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: colors.price, fontSize: 16}}>0</Text>
                <Text style={{color: colors.c999, fontSize: 10}}></Text>
              </View>
              <Text style={{color: colors.c666, fontSize: 12}}>积分</Text>
            </View>
          </View>
          <View style={{width: layout.width, height: layout.inset, backgroundColor: colors.eee}}/>
          <View style={{width: layout.width, height: 48, flexDirection: 'row', alignItems: 'center', paddingLeft: 14, paddingRight: 14}}>
            <Image source={require('../../../assets/images/personal/personal_consultIcon.png')} style={{width: 16, height: 16}}/>
            <Text style={{color: colors.c142341, fontSize: 12, fontWeight: 'bold', marginLeft: 5}}>我的咨询</Text>
            <Text style={{color: colors.price, fontSize: 12, fontWeight: 'bold', marginLeft: 15}}>10条未读</Text>
          </View>
          <View style={{width: layout.width, height: layout.inset, backgroundColor: colors.eee}}/>
          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginLeft: 15, marginRight: 15, alignItems: 'center', height: 40}}>
            <Text style={{color: colors.c142341, fontSize: 15, fontWeight: 'bold'}}>我的订单</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: colors.c142341, fontSize: 14, marginRight: 5}}>全部</Text>
              <Image source={require('../../../assets/images/common/indicator_gray.png')} style={{width: 6, height: 12}}/>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', flex: 1}}>
            {
              I18n.isChinese() ?
                  <Image source={require('../../../assets/images/personal/user_pic_step_cn.png')} style={{width: 98, height: 224, marginLeft: 15}}/> :
                  <Image source={require('../../../assets/images/personal/user_pic_step_en.png')} style={{width: 125, height: 224, marginLeft: 15}}/>
            }
            <View style={{flex: 1}}>
              {
                orderList.map((item, index) => {
                  return renderOrderItem(item, index)
                })
              }
            </View>
          </View>
          <View style={{flex: 1, height: 20, flexDirection: 'row'}}>
            <View style={{width: 100, backgroundColor: colors.blue}}/>
            <View style={{flex: 1, backgroundColor: colors.red}}/>
          </View>
          <View style={{width: layout.width, height: layout.inset, backgroundColor: colors.eee}}/>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', height: 66}}>
            {
              optionsList.map((item, index) => {
                return renderOptionsItem(item, index)
              })
            }
          </View>
          {
            renderSectionHeader('为您推荐')
          }
          <View style={styles.saleNewsContainer}>
            {
              this.state.shoppingItems.length > 0 && this.state.shoppingItems.map((obj, index) => {
                return <SaleNewsItem model={obj} key={index}/>
              })
            }
          </View>
        </ScrollView>
    );
  }
}

renderOrderItem = (item, index) => {
  return (
      <TouchableOpacity key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 15, paddingRight: 15, height: 48, borderTopColor: colors.ddd, borderTopWidth: 0.5}}>
        <Text style={{color: colors.c333, fontSize: 14}}>{item.name}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{backgroundColor: colors.cedf2f6, marginRight: 5, borderRadius: 10, paddingLeft: 5, paddingRight: 5, paddingTop: 1, paddingBottom: 1}}>
            <Text style={{color: colors.c333, fontSize: 12}}>{item.value}</Text>
          </View>
          <Image source={require('../../../assets/images/common/indicator_gray.png')} style={{width: 6, height: 12}}/>
        </View>
      </TouchableOpacity>
  );
};

renderOptionsItem = (item, index) => {
  return (
      <TouchableOpacity key={index} style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={item.source} style={{width: 20, height: 20}}/>
        <Text style={{color: colors.c666, fontSize: 12, marginTop: 6}}>{item.name}</Text>
      </TouchableOpacity>
  );
};

renderSectionHeader = (text) => {
  return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: colors.eee}}>
        <View style={{backgroundColor: colors.c142341, width: 20, height: 1}}/>
        <Text style={{color: colors.c142341, fontSize: 15, fontWeight: '500', marginLeft: 10, marginRight: 10}}>{text}</Text>
        <View style={{backgroundColor: colors.c142341, width: 20, height: 0.5}}/>
      </View>
  );
};

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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FD6B78',
  },
  avatarContainerStyle: {
    marginLeft: 15,
    width: 60,
    height: 60,
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  primeNow: {
    backgroundColor: '#ccb69f',
    marginTop: 8,
    paddingLeft: 14,
    paddingRight: 14,
    maxWidth: 100,
    height: 26,
    borderRadius: 12,
    justifyContent: 'center',
  },
  checkIn: {
    backgroundColor: colors.c5ba0ff,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 3,
  },
  headerPrimeDetail: {
    color: '#ccb69f',
    fontSize: 12,
    maxWidth: layout.width - 160,
  },
  saleNewsContainer: {
    backgroundColor: colors.eee,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },
});
