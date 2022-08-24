import React from 'react';
import {TouchableOpacityComponent, TouchableOpacityProps} from 'react-native';
import {Container, Label} from './styles';

type CustomButtonProps = TouchableOpacityProps & {
	title: string;
};

export default function CustomButton({title, ...rest}: CustomButtonProps) {
	return (
		<Container {...rest} activeOpacity={0.7}>
			<Label>{title}</Label>
		</Container>
	);
}
