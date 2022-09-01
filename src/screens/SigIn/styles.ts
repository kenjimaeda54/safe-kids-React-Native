import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: ${getStatusBarHeight() + 37}px 35px;
	align-items: center;
	background-color: ${({theme}) => theme.colors.primary};
	justify-content: space-between;
`;

export const Title = styled.Text`
	font-size: ${RFValue(34)}px;
	line-height: ${RFValue(41)}px;
	font-family: ${({theme}) => theme.fonts.interBlack};
	color: ${({theme}) => theme.colors.white};
	margin-top: 10%;
`;

export const Underline = styled.View`
	width: 100%;
	height: 2px;
	background-color: ${({theme}) => theme.colors.white};
	margin-top: 20%;
`;

export const ContainerInput = styled.View`
	justify-content: space-between;
	min-height: 280px;
	width: 100%;
	margin: 6% 0px;
`;
