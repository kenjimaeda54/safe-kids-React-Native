import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: ${getStatusBarHeight() + 27}px 13px;
	align-items: center;
	background-color: ${({theme}) => theme.colors.primary};
`;

export const ButtonBack = styled.TouchableOpacity`
	align-self: flex-start;
`;

export const Title = styled.Text`
	margin-top: 51px;
	font-size: ${RFValue(25)}px;
	line-height: ${RFValue(30)}px;
	font-family: ${({theme}) => theme.fonts.interBlack};
	color: ${({theme}) => theme.colors.white};
	text-align: center;
`;

export const TitleHistory = styled.Text`
	font-size: ${RFValue(20)}px;
	line-height: ${RFValue(24)}px;
	font-family: ${({theme}) => theme.fonts.interMedium};
	color: ${({theme}) => theme.colors.white};
	text-align: left;
	width: 100%;
	margin-top: 48px;
	margin-bottom: 34px;
`;

export const WrapDevices = styled.View`
	flex-direction: row;
	align-items: center;
	width: 100%;
	justify-content: flex-start;
`;

export const Highlighter = styled.View`
	height: 4px;
	width: 4px;
	border-radius: 2px;
	background-color: ${({theme}) => theme.colors.white};
	margin-right: 10px;
`;

export const Devices = styled.Text`
	margin: 7px 0px;
	font-size: ${RFValue(17)}px;
	line-height: ${RFValue(20)}px;
	font-family: ${({theme}) => theme.fonts.interMedium};
	color: ${({theme}) => theme.colors.white};
`;
