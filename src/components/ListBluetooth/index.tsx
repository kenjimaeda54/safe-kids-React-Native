import React, {useRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
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
import ToastMessage, {Config} from '../ToastMessage';

interface ListBluetoothProps {
	peripherals: PeripheralProps[];
	statesBluetooth: StatesBluetoothProps;
	searchingBluetooth: boolean;
}

//type BleDisconnectProps = {
//	peripheral: string;
//	status: number;
//};

const ListBluetooth: React.ForwardRefRenderFunction<
	Modalize,
	ListBluetoothProps
> = ({peripherals, searchingBluetooth, statesBluetooth, ...rest}, ref) => {
	const {colors} = useTheme();
	const {dataUser} = useAth();
	const [peripheral, setPeripheral] = useState<PeripheralProps[]>([]);
	const [isConnected, setIsConnected] = useState(false);
	const [tryConnect, setTryConnect] = useState(false);
	const [peripheralSelectedId, setPeripheralSelectedId] = useState('');
	const [toastConfig, setToastConfig] = useState({} as Config);

	const handlePeripheralSelect = async (peripheral: PeripheralProps) => {
		try {
			setPeripheralSelectedId(peripheral.id);
			setTryConnect(true);
			BleManager.connect(peripheral.id)
				.then(() => {
					FireStore()
						.collection(KeyFireStore.users)
						.doc(dataUser.uid)
						.get()
						.then((snapshot) => {
							if (snapshot.exists) {
								const newDevice = {
									id: peripheral.id,
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
									.then(() => {
										setIsConnected(true);
									})
									.catch((error) => {
										console.log(error.message);
									});
							}
						});
				})
				.catch((error) => {
					console.log('Connection error', error);
					setToastConfig({
						type: 'error',
						text1: 'Erro',
						text2: 'Não conseguimos conectar ao bluetooth',
					});
				})
				.finally(() => {
					setTryConnect(false);
					setToastConfig({} as Config);
				});
		} catch (err) {
			console.log('erro', err);
			console.log(err);
		}
	};

	useEffect(() => {
		const setPeripheralsAll = new Set();
		const peripheralsNotRepeated = peripherals.filter((peripheral) => {
			const peripheralDuplicate = setPeripheralsAll.has(peripheral.id);
			setPeripheralsAll.add(peripheral.id);
			return !peripheralDuplicate;
		});
		const allConnected = peripheralsNotRepeated.filter((it) => {
			if (it.advertising.isConnectable) {
				return it;
			}
		});
		setPeripheral(allConnected);
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
										{tryConnect && peripheralSelectedId === peripheral.id ? (
											<Subtitle>Conectando</Subtitle>
										) : (
											<Subtitle>
												Status:{' '}
												{isConnected &&
												peripheralSelectedId === peripheral.id ? (
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
				{Object.keys(toastConfig).length > 0 && (
					<ToastMessage config={toastConfig} />
				)}
			</Container>
		</Modalize>
	);
};
export default forwardRef(ListBluetooth);
