import React from 'react';
import {ThemeProvider} from 'styled-components';
import themes from './src/global/theme';
import Home from './src/pages/home';

export function App() {
	return (
		<ThemeProvider theme={themes}>
			<Home />
		</ThemeProvider>
	);
}

export default App;
