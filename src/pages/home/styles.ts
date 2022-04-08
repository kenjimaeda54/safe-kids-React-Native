import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
	flex: 1;
	justify-content: space-evenly;
	align-items: center;
	background-color: ${({theme}) => theme.colors.primary};
`;

export const Body = styled.View`
	padding: 20px 13px;
	width: 100%;
	justify-content: center;
	align-items: center;
`;

export const Title = styled.Text`
	margin-top: ${RFValue(20)}px;
	font-family: ${({theme}) => theme.fonts.interMedium};
	font-size: ${RFValue(14)}px;
	color: ${({theme}) => theme.colors.textColor};
	line-height: ${RFValue(26)}px;
	text-align: left;
	width: 100%;
`;

export const TextDecoration = styled(Title)`
	text-decoration: underline;
	font-family: ${({theme}) => theme.fonts.interBlack};
`;

export const TextButton = styled.Text`
	font-family: ${({theme}) => theme.fonts.interBlack};
	font-size: ${RFValue(17)}px;
	color: ${({theme}) => theme.colors.textColor};
	line-height: ${RFValue(20)}px;
	text-decoration: underline;
`;
