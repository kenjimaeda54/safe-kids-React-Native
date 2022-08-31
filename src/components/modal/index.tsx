import React, {useRef, useEffect, useState} from 'react';
import {Alert as Warning} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {NativeModules, NativeEventEmitter, View} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {forwardRef} from 'react';
import {useTheme} from 'styled-components';
import {Modalize} from 'react-native-modalize';
import FireStore from '@react-native-firebase/firestore';
import {PeripheralProps} from '../../types';
import {StatesBluetoothProps} from '../../screens/Home';
import {
	Container,
	Title,
	Subtitle,
	Body,
	ButtonConnectBluetooth,
	ContainerStatus,
	Alert,
	ColorSubtitle,
} from './styles';
import {useAth} from '../../hooks/auth';
import {KeyFireStore} from '../../utils/constants';

interface ListBluetoothProps {
	peripherals: PeripheralProps[];
	statesBluetooth: StatesBluetoothProps;
	searchingBluetooth: boolean;
}

//type BleDisconnectProps = {
//	peripheral: string;
//	status: number;
//};

type Blecharacteristic = {
	characteristic: string;
	service: string;
};

const ListBluetooth: React.ForwardRefRenderFunction<
	Modalize,
	ListBluetoothProps
> = ({peripherals, searchingBluetooth, statesBluetooth, ...rest}, ref) => {
	const BleManagerModule = NativeModules.BleManager;
	const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
	const {dataUser} = useAth();
	const [peripheral, setPeripheral] = useState<PeripheralProps[]>([]);
	const [isConnected, setIsConnected] = useState(false);
	const [tryConnect, setTryConnect] = useState(false);
	const [listId, setListId] = useState<string[]>([]);
	const {colors} = useTheme();

	const handleConnectPeripheral = (peripheral: string) => {
		//	BleManager.createBond(peripheral.id)
		//		.then(() => console.log('Create bond with sucess'))
		//		.catch((err) => err);
		'entrou aqui', peripheral;
	};

	const handlePeripheralSelect = async (peripheral: PeripheralProps) => {
		try {
			Warning.alert(
				'Warning',
				'This feature is development,moment is unavailable',
				[
					{
						text: 'Cancel',
						style: 'cancel',
					},
				]
			);
			return;
		} catch (err) {
			console.log('erro', err);
			console.log(err);
		}
	};

	useEffect(() => {
		peripherals.filter((peripheral) => {
			if (
				peripheral.advertising.isConnectable === true &&
				!listId.includes(peripheral.id)
			) {
				//aqui vai ficar conexão com firestore e pulseiras encontradas
				setListId((previous) => [...previous, peripheral.id]);
				setPeripheral((previous) => [...previous, peripheral]);
				FireStore()
					.collection(KeyFireStore.users)
					.doc(dataUser.uid)
					.get()
					.then((snapshot) => {
						if (snapshot.exists) {
							const uid = `${Math.random() * Number.MAX_VALUE}+${
								Math.random() * 1000
							}`;
							const newDevice = {
								id: uid,
								name: peripheral.name,
								status: true,
							};
							const data = snapshot.data()?.historyDevices
								? [...snapshot.data()?.historyDevices, newDevice]
								: [newDevice];
							FireStore()
								.collection(KeyFireStore.users)
								.doc(dataUser.uid)
								.set({
									email: dataUser.email,
									password: dataUser.password,
									uid: dataUser.uid,
									photo: dataUser.photo,
									name: dataUser.name,
									historyDevices: data,
								})
								.catch((error) => {
									console.log(error.message);
								});
						}
					});
				return peripheral;
			}
		});
	}, [setPeripheral, peripherals]);

	return (
		<Modalize
			handleStyle={{
				display: 'none',
			}}
			adjustToContentHeight
			ref={ref}
			{...rest}>
			<Container>
				<Title
					style={{
						borderBottomWidth: 1,
						borderBottomColor: colors.textColor,
						borderStyle: 'solid',
					}}>
					Dispositivos encontrados
				</Title>
				<View>
					{statesBluetooth.state === 'off' ? (
						<Alert>
							Observamos que esta com bluetooth desligado,por favor habilite
							para podermos localizar pulseira{' '}
						</Alert>
					) : peripheral.length >= 1 ? (
						peripheral.map((peripheral, index) => (
							<ButtonConnectBluetooth
								key={index}
								onPress={() => handlePeripheralSelect(peripheral)}
								activeOpacity={0.7}>
								<Body>
									<Subtitle>
										Nome: <ColorSubtitle>{peripheral.name}</ColorSubtitle>
									</Subtitle>
									<ContainerStatus>
										{tryConnect ? (
											<Subtitle>Conectando</Subtitle>
										) : (
											<Subtitle>
												Status:{' '}
												{isConnected ? (
													<ColorSubtitle>Conectado</ColorSubtitle>
												) : (
													<ColorSubtitle>Desconectado</ColorSubtitle>
												)}
											</Subtitle>
										)}
										<Icon name='bluetooth' size={15} color={colors.red} />
									</ContainerStatus>
								</Body>
							</ButtonConnectBluetooth>
						))
					) : searchingBluetooth ? (
						<Subtitle>Carregando</Subtitle>
					) : (
						<Subtitle>
							Infelizmente não encontramos nenhuma pulseira compatível
						</Subtitle>
					)}
				</View>
			</Container>
		</Modalize>
	);
};
export default forwardRef(ListBluetooth);
