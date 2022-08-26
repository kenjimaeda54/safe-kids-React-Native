import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, TouchableOpacity} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
	ImageLibraryOptions,
	launchImageLibrary,
} from 'react-native-image-picker';
import {useTheme} from 'styled-components';
import CustomButton from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import {KeyRoutesApp} from '../../utils/routes';
import {
	Container,
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
	const {goBack, navigate} = useNavigation();
	const [isSecureEntry, setIsSecureEntry] = useState(true);
	const [uriUser, setUriUser] = useState<string>();
	let options = {
		mediaType: 'photo',
	} as ImageLibraryOptions;
	const handleImgInput = () => setIsSecureEntry((previous) => !previous);

	async function handleImgProfile() {
		await launchImageLibrary(options, (response) => {
			if (response.assets) {
				const uri = response.assets.map((it) => it.uri)[0];
				setUriUser(uri);
			}
		});
	}

	const handleNavigation = () => navigate(KeyRoutesApp.history);

	return (
		<Container>
			<ButtonBack />
			<Content>
				<TouchableWithoutFeedback onPress={handleImgProfile}>
					{uriUser ? (
						<Image
							source={{uri: uriUser}}
							style={{
								width: 100,
								height: 100,
								borderRadius: 50,
							}}
							resizeMode='cover'
						/>
					) : (
						<Image
							source={require('../../assets/profile.png')}
							style={{
								width: 60,
								height: 60,
							}}
						/>
					)}
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
					<TouchableOpacity onPress={handleNavigation} activeOpacity={0.7}>
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
