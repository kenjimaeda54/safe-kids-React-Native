import React, {useRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
	NativeModules,
	NativeEventEmitter,
	TouchableOpacity,
	View,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {forwardRef} from 'react';
import {useTheme} from 'styled-components';
import {Modalize} from 'react-native-modalize';
import {PeripheralProps} from '../../types';
import {StatesBluetoothProps} from '../../pages/home';
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
	const BleManagerModule = NativeModules.BleManager;
	const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
	const [peripheral, setPeripheral] = useState<PeripheralProps[]>([]);
	const [isConnected, setIsConnected] = useState(false);
	const [tryConnect, setTryConnect] = useState(false);
	const [listId, setListId] = useState<string[]>([]);
	const {colors} = useTheme();

	const handleConnectPeripheral = (peripheral: string) => {
		//	BleManager.createBond(peripheral.id)
		//		.then(() => console.log('Create bond with sucess'))
		//		.catch((err) => err);
		console.log('entrou aqui', peripheral);
	};

	const handlePeripheralSelect = async (peripheral: PeripheralProps) => {
		try {
			setTryConnect(true);
			const {
				advertising: {serviceUUIDs, serviceData},
			} = peripheral;
			const services = serviceUUIDs.map((item) => item)[0];
			await BleManager.connect(peripheral.id);
			const reponse = await BleManager.retrieveServices(peripheral.id);
			const {characteristics} = reponse;
			const dataCharacteristics = characteristics?.map((it) => {
				return {
					characteristic: it.characteristic,
					service: it.service,
				};
			});
			const data = dataCharacteristics
				? dataCharacteristics[dataCharacteristics.length - 1]
				: [];
			console.log('data', data);
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
				setListId((previous) => [...previous, peripheral.id]);
				setPeripheral((previous) => [...previous, peripheral]);
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
