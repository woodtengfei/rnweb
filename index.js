/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
// import App from './src/DemoApp';
import App from './src/App';
import {name as appName} from './app.json';

// register the app
AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
  console.log('index.js');
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('react-app')
  });
}

