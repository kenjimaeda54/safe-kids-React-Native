import React, {useRef} from 'react';
import {forwardRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {PeripheralAvailableProps} from '../../types';
import {Container, Title, Subtitle, Body} from './styles';

const ListBluetooth: React.ForwardRefRenderFunction<
	Modalize,
	PeripheralAvailableProps
> = ({name, id, ...rest}, ref) => {
	return (
		<Modalize adjustToContentHeight ref={ref} {...rest}>
			<Container>
				<Title>Lista de dispositivos</Title>
				<Body>
					<Subtitle>{name}</Subtitle>
				</Body>
			</Container>
		</Modalize>
	);
};
export default forwardRef(ListBluetooth);
