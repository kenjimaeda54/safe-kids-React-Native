import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components';

export default function Loading() {
	const {colors} = useTheme();
	return <ActivityIndicator animating size='small' color={colors.white} />;
}
