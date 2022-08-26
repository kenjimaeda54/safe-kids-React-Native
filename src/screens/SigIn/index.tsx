import React, {useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import CustomButton from '../../components/Button';
import ButtonBack from '../../components/ButtonBack';
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
	UnderlineFooter,
	FooterImg,
	LabelFooter,
	FooterUnderline,
} from './styles';

export default function SigIn() {
	return (
		<Container>
			<ButtonBack />
			<Title>Safe Kids</Title>
			<Underline />
			<ContainerInput>
				<InputCommon label='Nome' placeholder='Nome' />
				<InputCommon label='E-mail' placeholder='Email' />
				<InputCommon label='Senha' haveIcon isSecureEntry placeholder='Senha' />
			</ContainerInput>
			<ContainerConnected>
				<TouchableOpacity>
					<Connected />
				</TouchableOpacity>
				<LabelConnected>Mantenha-me conectado</LabelConnected>
			</ContainerConnected>
			<CustomButton title='Entrar' />
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
		</Container>
	);
}
