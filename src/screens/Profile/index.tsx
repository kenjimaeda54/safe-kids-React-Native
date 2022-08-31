import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
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
import {KeyFireStore, KeyRoutesApp, keyStorage} from '../../utils/constants';
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
import {data} from '../History/data';

export default function Profile() {
	const {colors} = useTheme();
	const {navigate} = useNavigation();
	const {dataUser, getDataUser} = useAth();
	const [isSecureEntry, setIsSecureEntry] = useState(true);
	const [toastConfig, setToastConfig] = useState({} as Config);
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
			console.log('esta entrando aqui');
			if (response.assets) {
				const uri = response.assets.map((it) => it.uri)[0];
				//filename pode ser qualquer nome,e o nome do arquivo salvo
				const filename = uri?.substring(uri.lastIndexOf('/') + 1);
				//uplad precisa ser o caminho correto da imagem
				const uploadUri =
					Platform.OS === 'ios' ? uri?.replace('file://', '') : uri;
				if (uploadUri) {
					setUploading(true);
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
						const downLoadUrl = await Storage().ref(filename).getDownloadURL();
						fireStore()
							.collection(KeyFireStore.users)
							.doc(dataUser.uid)
							.set({
								...dataUser,
								photo: downLoadUrl,
							});
						setUploading(false);
						setTransferred(undefined);
						getDataUser({
							...dataUser,
							photo: downLoadUrl,
						});
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
						...dataUser,
						password: passwordUser,
					});
				setToastConfig({
					type: 'success',
					text1: 'Sucesso',
					text2: 'Senha alterada com sucesso',
				});
				getDataUser({
					...dataUser,
					password: passwordUser,
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
			<ButtonBack disabled={uploading} />
			<Content>
				<TouchableOpacity activeOpacity={0.7} onPress={handleImgProfile}>
					{dataUser.photo && !uploading ? (
						<Image
							source={{uri: dataUser.photo}}
							defaultSource={require('../../assets/loading_photo.png')}
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
				</TouchableOpacity>
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
					<TouchableOpacity
						disabled={uploading}
						onPress={handleNavigation}
						activeOpacity={0.7}>
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
						disabled={uploading}
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
