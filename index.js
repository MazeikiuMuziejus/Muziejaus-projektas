import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DataProvider} from './contexts/dataContext';

const AppWithGestureHandler = () => (
  <GestureHandlerRootView
    style={{
      flex: 1,
    }}>
    <DataProvider>
      <App />
    </DataProvider>
  </GestureHandlerRootView>
);

AppRegistry.registerComponent(appName, () => AppWithGestureHandler);
