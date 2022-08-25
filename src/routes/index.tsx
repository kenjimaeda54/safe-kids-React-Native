import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import App from './app';
import Auth from './auth';

export default function Routes() {
	return (
		<NavigationContainer>
			<Auth />
		</NavigationContainer>
	);
}
