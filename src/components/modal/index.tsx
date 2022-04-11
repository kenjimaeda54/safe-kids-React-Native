import React, {useRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity, View} from 'react-native';
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
}

const ListBluetooth: React.ForwardRefRenderFunction<
	Modalize,
	ListBluetoothProps
> = ({peripherals, statesBluetooth, ...rest}, ref) => {
	const [namePeripheral, setNamePeripheral] = useState(['']);
	const {colors} = useTheme();

	useEffect(() => {
		const availablePeripheral = peripherals.filter((peripheral) => {
			if (peripheral.advertising.isConnectable === true) {
				return peripheral;
			}
		});
		const available = availablePeripheral.map((peripheral) => peripheral.name);
		setNamePeripheral([...new Set(available)]);
	}, [setNamePeripheral, peripherals]);

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
					) : namePeripheral.length >= 1 ? (
						namePeripheral.map((name, index) => (
							<ButtonConnectBluetooth
								key={index}
								onPress={() => console.log('ola')}
								activeOpacity={0.7}>
								<Body>
									<Subtitle>
										Nome: <ColorSubtitle>{name}</ColorSubtitle>
									</Subtitle>
									<ContainerStatus>
										<Subtitle>
											Status: <ColorSubtitle>Desconectado</ColorSubtitle>
										</Subtitle>
										<Icon name='bluetooth' size={15} color={colors.red} />
									</ContainerStatus>
								</Body>
							</ButtonConnectBluetooth>
						))
					) : (
						<Subtitle>Carregando</Subtitle>
					)}
				</View>
			</Container>
		</Modalize>
	);
};
export default forwardRef(ListBluetooth);
