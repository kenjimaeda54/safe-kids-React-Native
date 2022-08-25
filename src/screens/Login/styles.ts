import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: ${getStatusBarHeight() + 59}px 35px;
	align-items: center;
	background-color: ${({theme}) => theme.colors.primary};
`;

export const Title = styled.Text`
	font-size: ${RFValue(34)}px;
	line-height: ${RFValue(41)}px;
	font-family: ${({theme}) => theme.fonts.interBlack};
	color: ${({theme}) => theme.colors.white};
`;

export const Underline = styled.View`
	width: 100%;
	height: 2px;
	background-color: ${({theme}) => theme.colors.white};
	margin-top: 95px;
`;

export const ContainerInput = styled.View`
	justify-content: space-between;
	height: 200px;
	width: 100%;
	margin-top: 22px;
`;
