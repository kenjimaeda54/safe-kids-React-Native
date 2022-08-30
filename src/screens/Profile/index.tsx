import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import app from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import Storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import {
	Image,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
	ImageLibraryOptions,
	launchImageLibrary,
} from 'react-native-image-picker';
import {useTheme} from 'styled-components';
import CustomButton from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import {KeyFireStore, KeyRoutesApp} from '../../utils/constants';
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
import ToastMessage, {Config} from '../../components/ToastMessage';
import {useAth} from '../../hooks/auth';

export default function Profile() {
	const {colors} = useTheme();
	const {goBack, navigate} = useNavigation();
	const {dataUser, getDataUser} = useAth();
	const [isSecureEntry, setIsSecureEntry] = useState(true);
	const [toastConfig, setToastConfig] = useState({} as Config);
	const [uriUser, setUriUser] = useState<string>();
	const [passwordUser, setPasswordUser] = useState('sfd');
	const [isLoading, setIsLoading] = useState(false);
	const [transferred, setTransferred] = useState<number>();
	const [uploading, setUploading] = useState(false);
	const disable = passwordUser.length < 6 || dataUser.password === passwordUser;
	let options = {
		mediaType: 'photo',
	} as ImageLibraryOptions;
	const handleImgInput = () => setIsSecureEntry((previous) => !previous);

	useEffect(() => {
		setPasswordUser(dataUser.password);
	}, []);

	async function handleImgProfile() {
		await launchImageLibrary(options, (response) => {
			if (response.assets) {
				const uri = response.assets.map((it) => it.uri)[0];
				const filename = uri?.substring(uri.lastIndexOf('/') + 1);
				const uploadUri =
					Platform.OS === 'ios' ? uri?.replace('file://', '') : uri;
				if (uploadUri) {
					setUploading(true);
					setUriUser(undefined);
					const storage = Storage();
					const reference = storage.ref(filename);
					const task = reference.putFile(uploadUri);
					task.on('state_changed', (snapshot) => {
						setTransferred(
							Math.round(snapshot.bytesTransferred / snapshot.totalBytes) *
								10000
						);
					});
					task.then(async () => {
						const mDownloadUrl = await Storage().ref(filename).getDownloadURL();
						setUploading(false);
						setUriUser(mDownloadUrl);
						setTransferred(undefined);
					});
					task.catch((error) => console.log(error.message));
				}
			}
		}).catch((e) => console.log(e.message));
	}

	function handleEdit() {
		setIsLoading(true);
		auth()
			.currentUser?.updatePassword(passwordUser)
			.then(async () => {
				await fireStore()
					.collection(KeyFireStore.users)
					.doc(dataUser.uid)
					.update({
						name: dataUser.name,
						email: dataUser.email,
						uid: dataUser.uid,
						password: passwordUser,
					});
				setToastConfig({
					type: 'success',
					text1: 'Sucesso',
					text2: 'Senha alterada com sucesso',
				});
				getDataUser({
					name: dataUser.name,
					email: dataUser.email,
					password: passwordUser,
					uid: dataUser.uid,
				});
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}

	const handleNavigation = () => navigate(KeyRoutesApp.history);

	const handleLogOut = () => {
		auth().signOut();
	};

	return (
		<Container>
			<ButtonBack />
			<Content>
				<TouchableWithoutFeedback onPress={handleImgProfile}>
					{uriUser ? (
						<Image
							source={{uri: uriUser}}
							style={{
								width: 80,
								height: 80,
								borderRadius: 40,
							}}
						/>
					) : uploading ? (
						<Progress.Pie
							progress={transferred}
							size={60}
							color={colors.grayThree}
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
							value={passwordUser}
							style={{
								borderBottomColor: colors.white,
								borderBottomWidth: 2,
							}}
							returnKeyType='done'
							onChangeText={setPasswordUser}
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
					<TouchableOpacity
						style={{
							marginTop: 20,
						}}
						onPress={handleLogOut}
						activeOpacity={0.7}>
						<LabelButton
							style={{
								textDecorationColor: colors.white,
							}}>
							Sair
						</LabelButton>
					</TouchableOpacity>
				</WrapContent>
			</ContentForm>
			<CustomButton
				title='Editar'
				isLoading={isLoading}
				disabled={disable}
				onPress={handleEdit}
				opacityDisable={disable}
			/>
			{toastConfig.type && <ToastMessage config={toastConfig} />}
		</Container>
	);
}
