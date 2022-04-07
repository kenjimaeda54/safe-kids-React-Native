import styled from 'styled-components/native';

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
	margin-top: 12px;
	font-family: ${({theme}) => theme.fonts.interMedium};
	font-size: 14px;
	color: ${({theme}) => theme.colors.textColor};
	line-height: 26px;
	text-align: left;
	width: 100%;
`;

export const TextDecoration = styled(Title)`
	text-decoration: underline;
	font-family: ${({theme}) => theme.fonts.interBlack};
`;

export const TextButton = styled.Text`
	font-family: ${({theme}) => theme.fonts.interBlack};
	font-size: 17px;
	color: ${({theme}) => theme.colors.textColor};
	line-height: 20px;
	text-decoration: underline;
`;
