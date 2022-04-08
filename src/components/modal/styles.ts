import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
	padding: 35px 15px 170px;
	flex-direction: column;
`;

export const Title = styled.Text`
	font-family: ${({theme}) => theme.fonts.interMedium};
	font-size: ${RFValue(14)}px;
	line-height: ${RFValue(20)}px;
`;

export const ButtonConnectBluetooth = styled.TouchableOpacity`
	padding: 10px 15px;
	border-radius: 7px;
	border-color: ${({theme}) => theme.colors.gray};
	border-style: solid;
	border-width: 0.5px;
	margin: 10px 0px;
`;

export const Body = styled.View`
	display: flex;
	width: 100%;
`;

export const ContainerStatus = styled.View`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
`;

export const Subtitle = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: ${({theme}) => theme.fonts.interThin};
	line-height: ${RFValue(16)}px;
	margin-bottom: 5px;
	color: ${({theme}) => theme.colors.black};
`;

export const ColorSubtitle = styled.Text`
	font-size: ${RFValue(15)}px;
	line-height: ${RFValue(20)}px;
	color: ${({theme}) => theme.colors.red};
`;
