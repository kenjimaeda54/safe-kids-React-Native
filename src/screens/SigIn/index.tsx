import React, {useEffect, useRef, useState} from 'react';
import {Image, TextInput, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import CustomButton from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
import InputCommon from '../../components/Input';
import {
	Container,
	Title,
	Underline,
	ContainerInput,
	Footer,
	UnderlineFooter,
	FooterImg,
	LabelFooter,
	FooterUnderline,
} from './styles';
import ToastMessage, {Config} from '../../components/ToastMessage';
import {useAth} from '../../hooks/auth';
import {KeyFireStore} from '../../utils/constants';

export default function SigIn() {
	const {getDataUser} = useAth();
	const nameRef = useRef<TextInput>(null);
	const passwordRef = useRef<TextInput>(null);
	const emailRef = useRef<TextInput>(null);
	const [formName, setFormName] = useState('');
	const [formPassword, setFormPassword] = useState('');
	const [formEmail, setFormEmail] = useState('');
	const [toastConfig, setToastConfig] = useState({} as Config);
	const [isPassword, setIsPassword] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const disable =
		isLoading ||
		formName.length < 4 ||
		formPassword.length < 6 ||
		formEmail.length < 5;

	function handleRegister() {
		setIsLoading(true);
		auth()
			.createUserWithEmailAndPassword(formEmail, formPassword)
			.then(async (credentials) => {
				await fireStore()
					.collection(KeyFireStore.users)
					.doc(credentials.user.uid)
					.set({
						email: formEmail,
						uid: credentials.user.uid,
						password: formPassword,
						name: formName,
					})
					.then(() => {
						getDataUser({
							email: formEmail,
							name: formName,
							password: formPassword,
							uid: credentials.user.uid,
						});
					});
			})
			.catch((error) => {
				if (error.code === 'auth/email-already-in-use') {
					setToastConfig({
						type: 'error',
						text1: 'Erro',
						text2: ' Este email ja esta em uso',
					});
				}

				if (error.code === 'auth/invalid-email') {
					setToastConfig({
						type: 'error',
						text1: 'Erro',
						text2: ' Este invalido',
					});
				}
				setIsLoading(false);
			});
	}

	const handleIcon = () => setIsPassword((previous) => !previous);

	return (
		<Container>
			<ButtonBack />
			<Title>Safe Kids</Title>
			<Underline />
			<ContainerInput>
				<InputCommon
					ref={nameRef}
					value={formName}
					label='Nome'
					maxLength={15}
					placeholder='Nome'
					onChangeText={setFormName}
					returnKeyType='next'
					onSubmitEditing={() => emailRef.current?.focus()}
				/>
				<InputCommon
					ref={emailRef}
					value={formEmail}
					onChangeText={setFormEmail}
					label='E-mail'
					keyboardType='email-address'
					placeholder='Email'
					returnKeyType='next'
					onSubmitEditing={() => passwordRef.current?.focus()}
				/>
				<InputCommon
					ref={passwordRef}
					value={formPassword}
					onChangeText={setFormPassword}
					label='Senha'
					haveIcon
					onPress={handleIcon}
					isSecureEntry={isPassword}
					secureTextEntry={isPassword}
					placeholder='Senha'
					returnKeyType='done'
				/>
			</ContainerInput>
			<CustomButton
				isLoading={isLoading}
				disabled={disable}
				onPress={handleRegister}
				title='Entrar'
				opacityDisable={disable}
			/>
			<Footer>
				<FooterUnderline>
					<UnderlineFooter />
					<LabelFooter>Ou</LabelFooter>
					<UnderlineFooter />
				</FooterUnderline>
				<FooterImg>
					<Image
						style={{
							marginRight: 95,
						}}
						source={require('../../assets/apple-icon.png')}
					/>
					<Image source={require('../../assets/gmail-icon.png')} />
				</FooterImg>
			</Footer>
			{toastConfig.type && <ToastMessage config={toastConfig} />}
		</Container>
	);
}
