/**
 * React Native CLI Entry Point
 * 
 * Registers the root application component with AppRegistry.
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';

const appName = 'MyNakshAI';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('main', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  if (rootTag) {
    AppRegistry.runApplication('main', { rootTag });
  }
}

export default App;
