import React, {useState} from 'react';
import {TouchableOpacityComponent, TouchableOpacityProps} from 'react-native';
import Loading from '../Load';
import {Container, Label} from './styles';

type CustomButtonProps = TouchableOpacityProps & {
	title: string;
	isLoading?: boolean;
	opacityDisable?: boolean;
};

export default function CustomButton({
	title,
	isLoading = false,
	opacityDisable = false,
	...rest
}: CustomButtonProps) {
	return (
		<Container disable={opacityDisable} {...rest} activeOpacity={0.7}>
			{isLoading ? <Loading /> : <Label>{title}</Label>}
		</Container>
	);
}
