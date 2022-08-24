import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import {KeyRoutes} from '../utils/routes';

export type RootStackParamList = {
	Home: undefined;
	Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
	return (
		<NavigationContainer>
			<RootStack.Navigator
				screenOptions={{
					headerShown: false,
				}}>
				<RootStack.Screen name={KeyRoutes.home} component={Home} />
				<RootStack.Screen name={KeyRoutes.profile} component={Profile} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
}
