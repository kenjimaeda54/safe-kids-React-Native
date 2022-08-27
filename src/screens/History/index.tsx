import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, Image, FlatList} from 'react-native';
import fireStore from '@react-native-firebase/firestore';
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
import {useAth} from '../../hooks/auth';
import {KeyFireStore} from '../../utils/constants';

export default function History() {
	const {dataUser} = useAth();
	const [loading, setIsLoading] = useState(true);

	useEffect(() => {
		(async () => {
			await fireStore()
				.collection(KeyFireStore.historyDevices)
				.doc(dataUser.uid)
				.get()
				.then((snapshot) => {
					console.log(snapshot);
					setIsLoading(false);
				});
		})();
	}, []);

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
			{!loading && dataUser.historyDevices ? (
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
			) : (
				<Devices>Não possui conexão recentes</Devices>
			)}
		</Container>
	);
}
