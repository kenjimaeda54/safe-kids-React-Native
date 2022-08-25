import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import {KeyRoutesApp} from '../utils/routes';
import History from '../screens/History';
import {RootStackParamList} from '../types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<RootStack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<RootStack.Screen name={KeyRoutesApp.home} component={Home} />
			<RootStack.Screen name={KeyRoutesApp.profile} component={Profile} />
			<RootStack.Screen name={KeyRoutesApp.history} component={History} />
		</RootStack.Navigator>
	);
}
