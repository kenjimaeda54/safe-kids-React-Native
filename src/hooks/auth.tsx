import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {DataUser} from '../types';

interface ProviderProps {
	children: ReactNode;
}

interface UserProps {
	uid: string;
	name: string;
	getName: (name: string) => void;
	getUid: (uid: string) => void;
	isAnonymous?: boolean;
}

const AuthProvider = createContext({} as UserProps);

function Provider({children}: ProviderProps) {
	const [uid, setUid] = useState('');
	const [name, setName] = useState('');
	const [isAnonymous, setIsAnonymous] = useState<boolean>();

	const getUid = (uid: string) => setUid(uid);

	const getName = (name: string) => setName(name);

	useEffect(() => {
		auth().onAuthStateChanged((userState) => {
			setIsAnonymous(userState?.isAnonymous);
		});
	}, []);
	return (
		<AuthProvider.Provider value={{isAnonymous, uid, name, getName, getUid}}>
			{children}
		</AuthProvider.Provider>
	);
}

function useAth() {
	const context = useContext(AuthProvider);
	return context;
}

export {useAth, Provider};
