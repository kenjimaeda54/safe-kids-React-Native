import {TextInput} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	width: 100%;
`;

export const Label = styled.Text`
	font-family: ${({theme}) => theme.fonts.interMedium};
	font-size: ${RFValue(20)}px;
	color: ${({theme}) => theme.colors.white};
	line-height: ${RFValue(24)}px;
	margin-bottom: 6px;
`;

export const Input = styled(TextInput)`
	background-color: ${({theme}) => theme.colors.white};
	width: 100%;
	padding: 12px 25px;
	border-radius: 10px;
	font-family: ${({theme}) => theme.fonts.interThin};
	font-size: ${RFValue(18)}px;
	color: ${({theme}) => theme.colors.black};
	line-height: ${RFValue(20)}px;
`;
