import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import fireStore from '@react-native-firebase/firestore';
import Storage from '@react-native-firebase/storage';
import {KeyFireStore, keyStorage} from '../utils/constants';

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
	photo?: string;
};

type HistoryDevices = {
	history: string;
	status: false;
}[];

const AuthProvider = createContext({} as UserProps);

function Provider({children}: ProviderProps) {
	const [isAnonymous, setIsAnonymous] = useState<boolean>();
	const [dataUser, setDataUser] = useState({} as DataUser);

	const getDataUser = (data: DataUser) => setDataUser(data);

	useEffect(() => {
		//listener para garantir sempre logado
		auth().onAuthStateChanged(async (userState) => {
			//para reautenticar e necessário verificar se realmente possui email e password
			fireStore()
				.collection(KeyFireStore.users)
				.doc(userState?.uid)
				.onSnapshot(async (querySnapshot) => {
					setDataUser({
						email: querySnapshot.data()?.email,
						name: querySnapshot.data()?.name,
						password: querySnapshot.data()?.password,
						uid: querySnapshot.data()?.uid,
						photo: querySnapshot.data()?.photo,
					});
					setIsAnonymous(userState?.isAnonymous);
				});
			if (dataUser.email && dataUser.password) {
				//reautenticar usuário
				const emailCredential = auth.EmailAuthProvider.credential(
					dataUser.email,
					dataUser.password
				);
				auth().currentUser?.reauthenticateWithCredential(emailCredential);
				//listener para garantir atualização da coleção no banco
			}
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
