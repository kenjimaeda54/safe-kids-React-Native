import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {Button} from './styles';

export default function ButtonBack() {
	const {goBack} = useNavigation();

	const handleBackNavigation = () => goBack();

	return (
		<Button onPress={handleBackNavigation}>
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
