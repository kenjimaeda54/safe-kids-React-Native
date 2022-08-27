import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {TextInput, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../components/Button';
import InputCommon from '../../components/Input';
import {
	Container,
	Title,
	Underline,
	ContainerInput,
	ContainerConnected,
	Connected,
	LabelConnected,
	Footer,
	TitleFooter,
	LabelButtonSigIn,
} from './styles';
import {KeyRoutesApp} from '../../utils/routes';
import {useAth} from '../../hooks/auth';
import ToastMessage, {Config} from '../../components/ToastMessage';

export default function Login() {
	const {navigate} = useNavigation();
	const {getName, getUid} = useAth();
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
			.then((credentials) => {
				setToastConfig({
					type: 'success',
					text1: 'Sucesso',
					text2: 'Seja bem vindo ao Safe kids',
				});
				//implementar o firestore para pegar o name
				getName('desconhecido');
				getUid(credentials.user.uid);
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
		<Container>
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
				<ContainerConnected>
					<TouchableOpacity>
						<Connected />
					</TouchableOpacity>
					<LabelConnected>Mantenha-me conectado</LabelConnected>
				</ContainerConnected>
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
