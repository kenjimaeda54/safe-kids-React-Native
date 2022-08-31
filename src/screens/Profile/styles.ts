import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {RFValue} from 'react-native-responsive-fontsize';

export const Container = styled.View`
	flex: 1;
	padding: ${getStatusBarHeight() + 27}px 13px;
	align-items: center;
	background-color: ${({theme}) => theme.colors.primary};
	padding: 15px 0px;
`;

export const Content = styled.View`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 10%;
`;

export const Title = styled.Text`
	text-align: center;
	margin-top: ${RFValue(18)}px;
	line-height: ${RFValue(22)}px;
	font-family: ${({theme}) => theme.fonts.interBlack};
	color: ${({theme}) => theme.colors.white};
`;

export const Perfil = styled.Text`
	margin-top: 20%;
	margin-bottom: 5%;
	text-align: center;
	font-size: ${RFValue(25)}px;
	line-height: ${RFValue(30)}px;
	font-family: ${({theme}) => theme.fonts.interBlack};
	color: ${({theme}) => theme.colors.white};
`;

export const ContentForm = styled.View`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	width: 100%;
`;

export const MyData = styled.Text`
	font-family: ${({theme}) => theme.fonts.interBlack};
	font-size: ${RFValue(18)}px;
	line-height: ${RFValue(21)}px;
	color: ${({theme}) => theme.colors.white};
`;

export const WrapContent = styled.View`
	padding: 0px 13px;
	margin-top: 8%;
	margin-bottom: 20%;
`;

export const Label = styled.Text`
	font-family: ${({theme}) => theme.fonts.interMedium};
	font-size: ${RFValue(16)}px;
	line-height: ${RFValue(20)}px;
	color: ${({theme}) => theme.colors.white};
	margin-bottom: 10%;
`;

export const InputView = styled.View`
	position: relative;
`;

export const ImageIconInput = styled.TouchableOpacity`
	position: absolute;
	right: 10px;
`;

export const Input = styled.TextInput`
	font-family: ${({theme}) => theme.fonts.interBlack};
	font-size: ${RFValue(16)}px;
	line-height: ${RFValue(20)}px;
	color: ${({theme}) => theme.colors.white};
	margin-bottom: 10%;
`;

export const LabelButton = styled.Text`
	font-family: ${({theme}) => theme.fonts.interBlack};
	font-size: ${RFValue(16)}px;
	line-height: ${RFValue(19)}px;
	text-decoration: underline;
	color: ${({theme}) => theme.colors.white};
`;

export const ToastAlert = styled.View`
	flex-direction: row;
	width: 80%;
	background-color: ${({theme}) => theme.colors.white};
	padding: 20px;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
`;

export const ButtonToast = styled.TouchableOpacity`
	padding: 10px 7px;
	text-align: center;
	background-color: ${({theme}) => theme.colors.grayThree};
	margin: 0px 20px;
	border-radius: 7px;
`;

export const LabelToast = styled.Text`
	font-family: ${({theme}) => theme.fonts.interMedium};
	font-size: ${RFValue(20)}px;
	line-height: ${RFValue(22)}px;
	color: ${({theme}) => theme.colors.white};
`;
