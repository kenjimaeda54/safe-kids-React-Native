import React from 'react';
import {TextInputProps} from 'react-native';
import {useTheme} from 'styled-components';
import {Container, Label, Input} from './styles';

type InputCommonProps = TextInputProps & {
	label: string;
};

export default function InputCommon({label, ...rest}: InputCommonProps) {
	const {colors} = useTheme();

	return (
		<Container>
			<Label>{label}</Label>
			<Input
				{...rest}
				style={{
					borderWidth: 2,
					borderColor: colors.primarySecond,
				}}
			/>
		</Container>
	);
}
