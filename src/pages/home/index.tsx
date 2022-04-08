import React, {useEffect, useRef, useState} from 'react';
import {Modalize} from 'react-native-modalize';
import {
	NativeEventEmitter,
	NativeModules,
	Platform,
	PermissionsAndroid,
	Image,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import {Container, Title, Body, TextDecoration, TextButton} from './styles';
import {PeripheralProps} from '../../types';
import ListBluetooth from '../../components/modal';

export default function Home() {
	const BleManagerModule = NativeModules.BleManager;
	const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
	const refModal = useRef<Modalize>(null);
	const [isScanning, setIsScanning] = useState(false);

	const handleScan = () => {
		refModal.current?.open();
		if (!isScanning) {
			BleManager.scan([], 3, true)
				.then(() => {
					console.log('Scanning...');
					setIsScanning(true);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};
	const handleStopScan = () => {
		console.log('Scan is stopped');
		setIsScanning(false);
	};

  const handleModal =  ()=> refModal.current?.close();

	const handleDiscoverPeripheral = (peripheral: PeripheralProps) => {
		if (!peripheral.name) {
			peripheral.name = 'NO NAME';
		}
		const {
			advertising: {isConnectable},
		} = peripheral;
		console.log('e conectavel', isConnectable);
	};

	useEffect(() => {
		BleManager.start({showAlert: false});
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
		};
	});
	return (
		<TouchableWithoutFeedback onPress={handleModal}  >
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
				<TouchableOpacity onPress={handleScan}>
					<TextButton>Conectar</TextButton>
				</TouchableOpacity>
				<ListBluetooth name='Tv Sansug' id='erere' ref={refModal} />
			</Container>
		</TouchableWithoutFeedback>
	);
}
