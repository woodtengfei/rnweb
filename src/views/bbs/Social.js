/**
 * @Name Social
 * @Description 社区BBS
 * @author wood
 * @date 2019/3/21
 */
import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Social extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.container}>
          <Text>社区BBS</Text>
        </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
