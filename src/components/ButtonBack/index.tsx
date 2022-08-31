import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ButtonProps, Image} from 'react-native';
import {Button} from './styles';

export default function ButtonBack({...rest}: Partial<ButtonProps>) {
	const {goBack} = useNavigation();

	const handleBackNavigation = () => goBack();

	return (
		<Button {...rest} onPress={handleBackNavigation}>
			<Image
				source={require('../../assets/back-icon.png')}
				style={{
					width: 32,
					height: 32,
				}}
			/>
		</Button>
	);
}
