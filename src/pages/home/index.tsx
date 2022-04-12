import React, {Context, useEffect, useRef, useState} from 'react';
import {useTheme} from 'styled-components';
import {Modalize} from 'react-native-modalize';
import {
	NativeEventEmitter,
	NativeModules,
	Platform,
	PermissionsAndroid,
	Pressable,
	Image,
	TouchableWithoutFeedback,
} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {Container, Title, Body, TextDecoration, TextButton} from './styles';
import {PeripheralProps} from '../../types';
import ListBluetooth from '../../components/modal';

export type StatesBluetoothProps = {
	state: string;
};

export default function Home() {
	const enableBluetooth = {
		state: 'off',
	};
	const {colors} = useTheme();
	const BleManagerModule = NativeModules.BleManager;
	const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
	const refModal = useRef<Modalize>(null);
	const [isScanning, setIsScanning] = useState(false);
	const [allPeripherals, setalPeripherals] = useState<PeripheralProps[]>([]);
	const [isPress, setIsPress] = useState(false);
	const [statesBluetooth, setStatesBluetooth] =
		useState<StatesBluetoothProps>(enableBluetooth);
  const [searchingBluetooth,setSearchingBluetooth] = useState(false)

	const handleScan = () => {
    setSearchingBluetooth(true);
		refModal.current?.open();
		const {state} = statesBluetooth;
		if (state === 'off') return;
		if (!isScanning) {
			BleManager.scan([], 15, true)
				.then(() => {
					setIsScanning(true);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const handleUpdateStatus = (state: StatesBluetoothProps) => {
		setStatesBluetooth(state);
	};

	const handleStopScan = () => 	setSearchingBluetooth(false);

	const handleModal = () => refModal.current?.close();

	const handleDiscoverPeripheral = (peripheral: PeripheralProps) => {
		if (!peripheral.name) {
			peripheral.name = 'NO NAME';
		}
		setalPeripherals((prevState) => [...prevState, peripheral]);
	};

	useEffect(() => {
		const {state} = statesBluetooth;
		if (state === 'off') {
			BleManager.checkState();
		}
	}, [statesBluetooth]);

	useEffect(() => {
		BleManager.start({showAlert: false});
		bleManagerEmitter.addListener(
			'BleManagerDidUpdateState',
			handleUpdateStatus
		);
		bleManagerEmitter.addListener(
			'BleManagerDiscoverPeripheral',
			handleDiscoverPeripheral
		);
		bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan);

		if (Platform.OS === 'android' && Platform.Version >= 23) {
			PermissionsAndroid.check(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
			).then((responseOk) => {
				if (responseOk) {
					console.log('Permission is OK');
				} else {
					PermissionsAndroid.request(
						PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
					).then((result) => {
						if (result) {
							console.log('User accept');
						} else {
							console.log('User refuse');
						}
					});
				}
			});
		}
		return () => {
			bleManagerEmitter.removeAllListeners('BleManagerDiscoverPeripheral');
			bleManagerEmitter.removeAllListeners('BleManagerStopScan');
			bleManagerEmitter.removeAllListeners('BleManagerDidUpdateState');
		};
	});

	return (
		<TouchableWithoutFeedback onPress={handleModal}>
			<Container>
				<Body>
					<Image
						resizeMode='contain'
						style={{
							width: 300,
							height: 300,
						}}
						source={require('../../assets/welcome.png')}
					/>
					<Title>
						Clique em <TextDecoration>Conectar</TextDecoration> para
						encontrarmos sua pulseira,fique tranquilo,nos notificaremos quando
						estiver pronto para uso ou ser desconectada
					</Title>
				</Body>
				<Pressable
					style={{
						paddingHorizontal: 5,
						paddingVertical: 10,
						opacity: isPress ? 0.5 : 1,
					}}
					onPressOut={() => setIsPress(false)}
					onPressIn={() => setIsPress(true)}
					hitSlop={{
						bottom: 50,
						left: 10,
						right: 10,
						top: 50,
					}}
					onPress={handleScan}>
					<TextButton>Conectar</TextButton>
				</Pressable>
				<ListBluetooth
          searchingBluetooth={searchingBluetooth}
					statesBluetooth={statesBluetooth}
					peripherals={allPeripherals}
					ref={refModal}
				/>
			</Container>
		</TouchableWithoutFeedback>
	);
}
