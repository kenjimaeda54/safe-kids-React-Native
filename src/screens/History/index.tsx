import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, Image, FlatList, View} from 'react-native';
import fireStore from '@react-native-firebase/firestore';
import {
	Container,
	Title,
	TitleHistory,
	WrapDevices,
	Highlighter,
	Devices,
	LabelDevices,
} from './styles';
import {data} from './data';
import ButtonBack from '../../components/ButtonBack';
import {useAth} from '../../hooks/auth';
import {KeyFireStore} from '../../utils/constants';
import {DataDevices} from '../../types';

export default function History() {
	const {dataUser} = useAth();
	const [loading, setIsLoading] = useState(true);
	const [dataDevices, setDataDevices] = useState<DataDevices | null>();

	useEffect(() => {
		(async () => {
			await fireStore()
				.collection(KeyFireStore.users)
				.doc(dataUser.uid)
				.get()
				.then((snapshot) => {
					if (snapshot.exists) {
						setDataDevices(snapshot.data()?.historyDevices);
					}
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
			{!loading && dataDevices ? (
				<FlatList
					data={data}
					style={{
						width: '100%',
					}}
					showsVerticalScrollIndicator={false}
					keyExtractor={(it) => it.id}
					renderItem={({item}) => (
						<WrapDevices>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
								}}>
								<Highlighter />
								<Devices>{item.name}</Devices>
							</View>
							<LabelDevices>
								{item.status ? 'conectado' : 'desconectado'}
							</LabelDevices>
						</WrapDevices>
					)}
				/>
			) : (
				<Devices>Não possui conexão recentes</Devices>
			)}
		</Container>
	);
}
