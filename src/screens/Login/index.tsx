import React from 'react';
import InputCommon from '../../components/Input';
import {Container, Title, Underline, ContainerInput} from './styles';

export default function Login() {
	return (
		<Container>
			<Title>Safe Kids</Title>
			<Underline />
			<ContainerInput>
				<InputCommon label='E-mail' placeholder='E-mail' />
				<InputCommon label='Password' placeholder='Password' />
			</ContainerInput>
		</Container>
	);
}
