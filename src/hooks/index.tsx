import React, {ReactNode} from 'react';
import {Provider} from './auth';

interface ContextProviderProps {
	children: ReactNode;
}

export default function ContextProvider({children}: ContextProviderProps) {
	return <Provider>{children}</Provider>;
}
