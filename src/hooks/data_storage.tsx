import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';


import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageContext = createContext({} as IStorageContextdataStorage);

interface StorageProviderProps {
	children : ReactNode;
}
interface Data {
	id: string;
	title: string;
	email: string;
	password: string;
}

interface IStorageContextdataStorage {
	data: Data[];
	emptyDataStorage(): Promise<void>,
	saveDataStorage(dataSave: Data): Promise<void>,
	dataStorageLoading: boolean;
}

function StorageProvider({ children, ...rest } : StorageProviderProps) {

	const [data, setData] = useState<Data[]>([] as Data[]);
	const [ dataStorageLoading, setDataStorageLoading ] = useState(true);
	const dataKey = '@passmanager:logins';


	async function emptyDataStorage(){
		setData([] as Data[]);
		await AsyncStorage.removeItem(dataKey);
	}
	async function saveDataStorage(dataSave : Data){
		const newData = [...data, dataSave];
		await AsyncStorage.setItem(dataKey, JSON.stringify(newData));
		setData(newData);
	}
	useEffect(() => {
		async function getDataAsync() {
			const dataStoraged =  await AsyncStorage.getItem(dataKey);
			if(dataStoraged){
				const currentData = JSON.parse(dataStoraged) as Data[];
				setData(currentData);
			}
			setDataStorageLoading(false);
		}
		getDataAsync();
	},[]);
	return(
		<StorageContext.Provider value={{
			data,
			emptyDataStorage,
			dataStorageLoading,
			saveDataStorage
			}} >
			{ children }
		</StorageContext.Provider>
	)
}


function useStorage() {
	const context = useContext(StorageContext);

	return context;
}

export { StorageProvider , useStorage}
