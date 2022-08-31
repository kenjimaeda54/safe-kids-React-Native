export type RootStackParamList = {
	Home: undefined;
	Profile: undefined;
	History: undefined;
	Login: undefined;
	SigIn: undefined;
};

export type DataDevices = {
	id: string;
	name: string;
	status: string;
};

export interface PeripheralProps {
	advertising: Advertising;
	id: string;
	name: string;
	rssi: number;
}

export interface PeripheralAvailableProps {
	name: string;
	id: string;
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

export interface DataUser {
	email: string;
	metadata: MetaData;
	isAnonymous: boolean;
}

type MetaData = {
	uid: string;
};
