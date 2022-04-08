import React from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {ThemeProvider} from 'styled-components';
import themes from './src/global/theme';
import Home from './src/pages/home';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export function App() {
	return (
		<ThemeProvider theme={themes}>
			<Home />
		</ThemeProvider>
	);
}

export default App;
