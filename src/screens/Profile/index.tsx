import React, {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components';
import CustomButton from '../../components/Button';
import {
	Container,
	ButtonBack,
	Content,
	Title,
	Perfil,
	ContentForm,
	MyData,
	WrapContent,
	Label,
	Input,
	InputView,
	ImageIconInput,
	LabelButton,
} from './styles';

export default function Profile() {
	const {colors} = useTheme();
	const [isSecureEntry, setIsSecureEntry] = useState(true);

	const handleImgInput = () => setIsSecureEntry((previous) => !previous);

	return (
		<Container>
			<ButtonBack>
				<Image
					source={require('../../assets/back-icon.png')}
					style={{
						width: 32,
						height: 32,
					}}
				/>
			</ButtonBack>
			<Content>
				<TouchableWithoutFeedback>
					<Image
						source={require('../../assets/profile.png')}
						style={{
							width: 60,
							height: 60,
						}}
					/>
				</TouchableWithoutFeedback>
				<Title>Clique na foto para alterar o perfil</Title>
			</Content>
			<Perfil>Perfil</Perfil>
			<ContentForm>
				<MyData>Meus dados</MyData>
				<WrapContent>
					<Label>Password</Label>
					<InputView>
						<Input
							secureTextEntry={isSecureEntry}
							value='sfsfsfsfsfss'
							style={{
								borderBottomColor: colors.white,
								borderBottomWidth: 2,
							}}
						/>
						<ImageIconInput onPress={handleImgInput}>
							{isSecureEntry ? (
								<Image
									source={require('../../assets/eye-close-icon.png')}
									style={{
										width: 22,
										height: 19,
									}}
								/>
							) : (
								<Image
									source={require('../../assets/eye-open-icon.png')}
									style={{
										width: 22,
										height: 15,
									}}
								/>
							)}
						</ImageIconInput>
					</InputView>
					<TouchableOpacity activeOpacity={0.7}>
						<LabelButton
							style={{
								textDecorationColor: colors.white,
							}}>
							Histórico
						</LabelButton>
					</TouchableOpacity>
				</WrapContent>
			</ContentForm>
			<CustomButton title='Editar' />
		</Container>
	);
}
