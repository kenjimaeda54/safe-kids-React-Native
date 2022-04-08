import React, {useRef} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity, View} from 'react-native';
import {forwardRef} from 'react';
import {useTheme} from 'styled-components';
import {Modalize} from 'react-native-modalize';
import {PeripheralAvailableProps} from '../../types';
import {
	Container,
	Title,
	Subtitle,
	Body,
	ButtonConnectBluetooth,
	ContainerStatus,
	ColorSubtitle,
} from './styles';

const ListBluetooth: React.ForwardRefRenderFunction<
	Modalize,
	PeripheralAvailableProps
> = ({name, id, ...rest}, ref) => {
	const {colors} = useTheme();
	return (
    <Modalize 
      handleStyle={{
        display: 'none'
      }}
      adjustToContentHeight ref={ref} {...rest}>
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
					<ButtonConnectBluetooth
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
				</View>
			</Container>
		</Modalize>
	);
};
export default forwardRef(ListBluetooth);
