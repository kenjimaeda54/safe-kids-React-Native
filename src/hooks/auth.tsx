import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import {KeyFireStore} from '../utils/constants';

interface ProviderProps {
	children: ReactNode;
}

interface UserProps {
	dataUser: DataUser;
	isAnonymous?: boolean;
	getDataUser: (data: DataUser) => void;
}

type DataUser = {
	uid: string;
	name: string;
	password: string;
	historyDevices?: HistoryDevices;
	email: string;
};

type HistoryDevices = {
	history: string;
	status: false;
};

const AuthProvider = createContext({} as UserProps);

function Provider({children}: ProviderProps) {
	const [isAnonymous, setIsAnonymous] = useState<boolean>();
	const [dataUser, setDataUser] = useState({} as DataUser);

	const getDataUser = (data: DataUser) => setDataUser(data);

	useEffect(() => {
		//listener para garantir sempre logado
		auth().onAuthStateChanged((userState) => {
			//reautenticar usuário
			const emailCredential = auth.EmailAuthProvider.credential(
				dataUser.email,
				dataUser.password
			);
			auth().currentUser?.reauthenticateWithCredential(emailCredential);
			//listener para garantir atualização da coleção no banco
			fireStore()
				.collection(KeyFireStore.users)
				.doc(userState?.uid)
				.onSnapshot(async (querySnapshot) => {
					setDataUser({
						email: querySnapshot.data()?.email,
						name: querySnapshot.data()?.name,
						password: querySnapshot.data()?.password,
						uid: querySnapshot.data()?.uid,
					});
				});
			setIsAnonymous(userState?.isAnonymous);
		});
	}, []);

	return (
		<AuthProvider.Provider
			value={{
				getDataUser,
				dataUser,
				isAnonymous,
			}}>
			{children}
		</AuthProvider.Provider>
	);
}

function useAth() {
	const context = useContext(AuthProvider);
	return context;
}

export {useAth, Provider};
