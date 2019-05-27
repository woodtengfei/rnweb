import React from 'react';
import colors from '../config/colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? colors.tabIconSelected : colors.tabIconDefault}
      />
    );
  }
}
