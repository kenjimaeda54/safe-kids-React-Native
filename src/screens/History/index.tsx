import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, Image, FlatList} from 'react-native';
import {
	Container,
	Title,
	TitleHistory,
	WrapDevices,
	Highlighter,
	Devices,
} from './styles';
import {data} from './data';
import ButtonBack from '../../components/ButtonBack';

export default function History() {
	return (
		<Container>
			<ButtonBack />
			<Image
				source={require('../../assets/devices.png')}
				style={{
					height: 216,
					width: 267,
					marginTop: 61,
				}}
			/>
			<Title>Dispositivos recentes</Title>
			<TitleHistory>Histórico</TitleHistory>
			<FlatList
				data={data}
				style={{
					width: '100%',
				}}
				showsVerticalScrollIndicator={false}
				keyExtractor={(it) => it.id}
				renderItem={({item}) => (
					<WrapDevices>
						<Highlighter />
						<Devices>{item.name}</Devices>
					</WrapDevices>
				)}
			/>
		</Container>
	);
}
