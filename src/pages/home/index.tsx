import {useEffect, useState} from 'react';
import {
	Text,
	NativeEventEmitter,
	NativeModules,
	Platform,
	PermissionsAndroid,
	TouchableOpacity,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
interface PeripheralProps {
	advertising: Advertising;
	id: string;
	name: string;
	rssi: number;
}

type Advertising = {
	isConnectable: boolean;
	localName?: string;
	manufacturerData: ManufacturerData;
	serviceData: {};
	serviceUUIDs: string[];
	txPowerLevel: number;
};

type ManufacturerData = {
	CDVType: string;
	bytes: number[];
	data: string;
};

export default function Home() {
	const BleManagerModule = NativeModules.BleManager;
	const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
	const [isScanning, setIsScanning] = useState(false);

	const handleScan = () => {
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

	const handleDiscoverPeripheral = (peripheral: PeripheralProps) => {
		if (!peripheral.name) {
			peripheral.name = 'NO NAME';
		}
		console.log(peripheral);
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
		<TouchableOpacity onPress={handleScan}>
			<Text>Ola mundo</Text>
		</TouchableOpacity>
	);
}
