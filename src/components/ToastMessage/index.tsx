import React from 'react';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Toast from 'react-native-toast-message';

interface ToastProps {
	config: Config;
}

export type Config = {
	type: string;
	text1: string;
	text2: string;
};

export default function ToastMessage({config}: ToastProps) {
	Toast.show({
		type: config.type,
		text1: config.text1,
		text2: config.text2,
		topOffset: getStatusBarHeight() + 15,
		autoHide: true,
	});
	return <Toast />;
}
