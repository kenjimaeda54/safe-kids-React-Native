import {RFValue} from 'react-native-responsive-fontsize';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

interface ContainerProps {
	disable?: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
	padding: 10px 36px;
	background-color: ${({theme}) => theme.colors.grayThree};
	border-radius: 17px;
	width: 140px;
	opacity: ${({disable}) => (disable ? 0.3 : 1)};
`;

export const Label = styled.Text`
	font-size: ${RFValue(20)}px;
	line-height: ${RFValue(25)}px;
	text-align: center;
	font-family: ${({theme}) => theme.fonts.interMedium};
	color: ${({theme}) => theme.colors.white};
`;
