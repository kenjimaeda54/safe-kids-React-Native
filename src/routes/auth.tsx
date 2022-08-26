import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../screens/Login';
import SigIn from '../screens/SigIn';
import {RootStackParamList} from '../types';
import {KeyRoutesApp} from '../utils/routes';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Auth() {
	return (
		<RootStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<RootStack.Screen name={KeyRoutesApp.login} component={Login} />
			<RootStack.Screen name={KeyRoutesApp.sigIn} component={SigIn} />
		</RootStack.Navigator>
	);
}
