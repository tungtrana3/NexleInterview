/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
console.disableYellowBox = true;
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
      <App />
    </SafeAreaProvider>
  </Provider>
));
