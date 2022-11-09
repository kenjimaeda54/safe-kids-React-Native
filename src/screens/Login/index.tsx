import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput, TouchableOpacity, View} from 'react-native';
import fireStore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/Button';
import InputCommon from '../../components/Input';
import {
	Container,
	Title,
	Underline,
	ContainerInput,
	Footer,
	TitleFooter,
	LabelButtonSigIn,
} from './styles';
import {KeyFireStore, KeyRoutesApp, keyStorage} from '../../utils/constants';
import {useAth} from '../../hooks/auth';
import ToastMessage, {Config} from '../../components/ToastMessage';

export default function Login() {
	const {navigate} = useNavigation();
	const {getDataUser} = useAth();
	const passwordRef = useRef<TextInput>(null);
	const emailRef = useRef<TextInput>(null);
	const [isPassword, setIsPassword] = useState(true);
	const [formEmail, setFormEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [toastConfig, setToastConfig] = useState({} as Config);
	const [formPassword, setFormPassword] = useState('');
	const disable = isLoading || formPassword.length < 6 || formEmail.length < 5;

	const handleNavigation = () => navigate(KeyRoutesApp.sigIn);

	function handleLogin() {
		setIsLoading(true);
		auth()
			.signInWithEmailAndPassword(formEmail, formPassword)
			.then(async (credentials) => {
				await fireStore()
					.collection(KeyFireStore.users)
					.doc(credentials.user.uid)
					.get()
					.then(async (querySnapshot) => {
						getDataUser({
							email: querySnapshot.data()?.email,
							name: querySnapshot.data()?.name,
							password: querySnapshot.data()?.password,
							uid: querySnapshot.data()?.uid,
							photo: querySnapshot.data()?.photo,
						});
					});
			})
			.catch((error) => {
				setToastConfig({
					type: 'error',
					text1: 'Erro',
					text2: 'Confira seu email e password',
				});
				setIsLoading(false);
			});
	}

	const handleIcon = () => setIsPassword((previous) => !previous);

	return (
		<Container testID="register-screen">
			<View
				style={{
					width: '100%',
					alignItems: 'center',
				}}>
				<Title>Safe Kids</Title>
				<Underline />
				<ContainerInput>
					<InputCommon
						ref={emailRef}
						value={formEmail}
						label='E-mail'
						placeholder='E-mail'
						keyboardType='email-address'
						returnKeyType='next'
						onSubmitEditing={() => passwordRef.current?.focus()}
						onChangeText={setFormEmail}
					/>
					<InputCommon
						ref={passwordRef}
						value={formPassword}
						label='Senha'
						placeholder='Senha'
						returnKeyType='done'
						onChangeText={setFormPassword}
						onPress={handleIcon}
						isSecureEntry={isPassword}
						secureTextEntry={isPassword}
						haveIcon
					/>
				</ContainerInput>
				<CustomButton
					isLoading={isLoading}
					disabled={disable}
					onPress={handleLogin}
					title='Entrar'
					opacityDisable={disable}
				/>
			</View>
			<Footer>
				<TitleFooter>Não possui conta?</TitleFooter>
				<TouchableOpacity activeOpacity={0.7} onPress={handleNavigation}>
					<LabelButtonSigIn>Cadastrar</LabelButtonSigIn>
				</TouchableOpacity>
			</Footer>
			{toastConfig.type && <ToastMessage config={toastConfig} />}
		</Container>
	);
}
