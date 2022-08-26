import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View} from 'react-native';
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

export default function Login() {
	const {navigate} = useNavigation();

	const handleNavigation = () => navigate(KeyRoutesApp.sigIn);

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
					<InputCommon label='E-mail' placeholder='E-mail' />
					<InputCommon label='Senha' placeholder='Senha' />
				</ContainerInput>
				<ContainerConnected>
					<TouchableOpacity>
						<Connected />
					</TouchableOpacity>
					<LabelConnected>Mantenha-me conectado</LabelConnected>
				</ContainerConnected>
				<CustomButton title='Entrar' />
			</View>
			<Footer>
				<TitleFooter>Não possui conta?</TitleFooter>
				<TouchableOpacity activeOpacity={0.7} onPress={handleNavigation}>
					<LabelButtonSigIn>Cadastrar</LabelButtonSigIn>
				</TouchableOpacity>
			</Footer>
		</Container>
	);
}
