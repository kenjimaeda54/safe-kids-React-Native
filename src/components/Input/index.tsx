import React from 'react';
import {Image, TextInputProps, TouchableOpacityProps} from 'react-native';
import {useTheme} from 'styled-components';
import {Container, Label, Input, ViewIcon, ImageIconInput} from './styles';

type InputCommonProps = TextInputProps &
	TouchableOpacityProps & {
		label: string;
		haveIcon?: boolean;
		isSecureEntry?: boolean;
	};

export default function InputCommon({
	label,
	haveIcon = false,
	isSecureEntry = false,
	...rest
}: InputCommonProps) {
	const {colors} = useTheme();

	return (
		<Container>
			<Label>{label}</Label>
			{!haveIcon ? (
				<Input
					{...rest}
					style={{
						borderWidth: 2,
						borderColor: colors.primarySecond,
					}}
				/>
			) : (
				<ViewIcon>
					<Input
						{...rest}
						style={{
							borderWidth: 2,
							borderColor: colors.primarySecond,
						}}
					/>
					<ImageIconInput {...rest}>
						{!isSecureEntry ? (
							<Image
								source={require('../../assets/eye-open-icon.png')}
								style={{
									width: 22,
									height: 15,
								}}
							/>
						) : (
							<Image
								source={require('../../assets/eye-close-icon.png')}
								style={{
									width: 22,
									height: 19,
								}}
							/>
						)}
					</ImageIconInput>
				</ViewIcon>
			)}
		</Container>
	);
}
