import React from 'react';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import Toast, {
	BaseToast,
	BaseToastProps,
	ErrorToast,
} from 'react-native-toast-message';

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

	const toastConfig = {
		success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
			<BaseToast
				{...props}
				contentContainerStyle={{paddingHorizontal: 15}}
				text1Style={{
					fontSize: 20,
					fontWeight: '600',
				}}
				text2Style={{
					fontSize: 25,
					fontWeight: '400',
				}}
			/>
		),

		error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
			<ErrorToast
				{...props}
				contentContainerStyle={{paddingHorizontal: 15}}
				text1Style={{
					fontSize: 20,
					fontWeight: '600',
				}}
				text2Style={{
					fontSize: 25,
					fontWeight: '400',
				}}
			/>
		),
	};

	return <Toast config={toastConfig} />;
}
