import React, {forwardRef, ForwardRefRenderFunction, Ref} from 'react';
import {
	Image,
	TextInput,
	TextInputProps,
	TouchableOpacityProps,
} from 'react-native';
import {useTheme} from 'styled-components';
import {Container, Label, Input, ViewIcon, ImageIconInput} from './styles';

type InputCommonProps = TextInputProps &
	TouchableOpacityProps & {
		label: string;
		haveIcon?: boolean;
		isSecureEntry?: boolean;
	};

const InputCommon: ForwardRefRenderFunction<TextInput, InputCommonProps> = (
	{label, haveIcon = false, isSecureEntry = false, ...rest},
	ref
) => {
	const {colors} = useTheme();

	return (
		<Container>
			<Label>{label}</Label>
			{!haveIcon ? (
				<Input
					ref={ref}
					{...rest}
					style={{
						borderWidth: 2,
						borderColor: colors.primarySecond,
					}}
				/>
			) : (
				<ViewIcon>
					<Input
						ref={ref}
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
};

export default forwardRef(InputCommon);
