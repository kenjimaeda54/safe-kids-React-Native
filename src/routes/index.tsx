import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import App from './app';
import Auth from './auth';
import {useAth} from '../hooks/auth';

export default function Routes() {
	const {isAnonymous} = useAth();
	return (
		<NavigationContainer>
			{typeof isAnonymous === 'undefined' ? <Auth /> : <App />}
		</NavigationContainer>
	);
}
