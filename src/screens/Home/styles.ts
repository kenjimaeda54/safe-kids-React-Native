import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
	flex: 1;
	padding: ${getStatusBarHeight() + 27}px 13px;
	align-items: center;
	background-color: ${({theme}) => theme.colors.primary};
`;

export const Header = styled.View`
	width: 100%;
	align-items: flex-end;
`;

export const Body = styled.View`
	padding: 20px 0px;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export const Title = styled.Text`
	margin-top: ${RFValue(20)}px;
	font-family: ${({theme}) => theme.fonts.interMedium};
	font-size: ${RFValue(14)}px;
	color: ${({theme}) => theme.colors.white};
	line-height: ${RFValue(26)}px;
	text-align: left;
	width: 100%;
`;

export const TextDecoration = styled(Title)`
	text-decoration: underline;
	text-decoration-color: ${({theme}) => theme.colors.white};
	font-family: ${({theme}) => theme.fonts.interBlack};
`;

export const TextButton = styled.Text`
	font-family: ${({theme}) => theme.fonts.interBlack};
	font-size: ${RFValue(17)}px;
	color: ${({theme}) => theme.colors.white};
	line-height: ${RFValue(20)}px;
	text-decoration: underline;
`;

export const Content = styled.View`
	width: 100%;
	align-items: flex-start;
`;

export const Underline = styled.View`
	width: 95%;
	height: 3px;
	margin-top: 27px;
	background-color: ${({theme}) => theme.colors.white};
`;

export const Name = styled.Text`
	font-family: ${({theme}) => theme.fonts.interBlack};
	font-size: 25px;
	line-height: 30px;
	color: ${({theme}) => theme.colors.white};
`;

export const Welcome = styled.Text`
	font-family: ${({theme}) => theme.fonts.interBlack};
	color: ${({theme}) => theme.colors.white};
	font-size: 19px;
	line-height: 23px;
`;
