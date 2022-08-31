import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: ${getStatusBarHeight() + 57}px 35px;
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
	margin-top: 20%;
`;

export const ContainerInput = styled.View`
	justify-content: space-between;
	min-height: 280px;
	width: 100%;
	margin: 6% 0px;
`;

export const Footer = styled.View`
	width: 100%;
	margin-top: 8%;
`;

export const FooterUnderline = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const UnderlineFooter = styled.View`
	width: 110px;
	height: 2px;
	background-color: ${({theme}) => theme.colors.white};
`;

export const LabelFooter = styled.Text`
	font-size: ${RFValue(20)}px;
	line-height: ${RFValue(24)}px;
	font-family: ${({theme}) => theme.fonts.interMedium};
	text-transform: uppercase;
	color: ${({theme}) => theme.colors.white};
`;

export const FooterImg = styled.View`
	margin-top: 10%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;
