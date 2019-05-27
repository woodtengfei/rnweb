/**
 * @Name FloatHeader
 * @Description 浮动的导航栏头部
 * @author wood
 * @date 2019/3/14
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import colors from '../../config/colors';
import device from '../../config/layout';
import util from '../../util/util';

export default class FloatHeader extends Component {

  render() {
    const { type, msgNum, title } = this.props;
    if (type === 'personal') {
      return (
          <View style={styles.container}>
            <View style={{width: 40}}/>
            {
              title && <Text style={styles.title}>{title}</Text>
            }
            <View style={{flexDirection: 'row'}}>
              <Image
                  overlayContainerStyle={styles.overlayContainerStyle}
                  containerStyle={styles.avatarContainerStyle}
                  onPress={() => console.log('click customer')}
                  source={require('../../../assets/images/personal/personal_setting.png')}
              />
              <Image
                  overlayContainerStyle={styles.overlayContainerStyle}
                  containerStyle={styles.avatarContainerStyle}
                  onPress={() => console.log('click news message')}
                  source={require('../../../assets/images/home/new_message.png')}
              />
            </View>
          </View>
      );
    } else {
      return (
          <View style={styles.container}>
            <Image
                overlayContainerStyle={styles.overlayContainerStyle}
                containerStyle={[styles.avatarContainerStyle, {marginLeft: 10}]}
                onPress={() => console.log('click language setting')}
                source={require('../../../assets/images/home/language_setting.png')}
            />
            <View style={{flexDirection: 'row'}}>
              <Image
                  overlayContainerStyle={styles.overlayContainerStyle}
                  containerStyle={styles.avatarContainerStyle}
                  onPress={() => console.log('click customer')}
                  source={require('../../../assets/images/home/icon_customer.png')}
              />
              <Image
                  overlayContainerStyle={styles.overlayContainerStyle}
                  containerStyle={styles.avatarContainerStyle}
                  onPress={() => console.log('click news message')}
                  source={require('../../../assets/images/home/new_message.png')}
              />
            </View>
          </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: util.isIPhoneX() ? 38 : 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overlayContainerStyle: {
    backgroundColor: colors.clear,
  },
  avatarContainerStyle: {
    marginRight: device.inset,
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  }
});
