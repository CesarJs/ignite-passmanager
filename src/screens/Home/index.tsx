import React, { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import { useStorage } from '../../hooks/data_storage';

import { SearchBar } from '../../components/SearchBar';
import { LoginDataItem } from '../../components/LoginDataItem';

import {
  Container,
  LoginList,
  EmptyListContainer,
  EmptyListMessage
} from './styles';
import { TouchableOpacity, Text } from 'react-native';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

type LoginListDataProps = LoginDataProps[];

export function Home() {
	const dataKey = '@passmanager:logins';
  const [searchListData, setSearchListData] = useState<LoginListDataProps>([] as LoginDataProps[]);

	const { emptyDataStorage, data } = useStorage();
  async function loadData() {
		setSearchListData(data);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [data]));
	function formatSearch(seach: string){
		return seach.toLowerCase().trim();
	}
  function handleFilterLoginData(search: string) {

    const filteredData = data.filter((pass : LoginDataProps) => {
			let itemTrated = formatSearch(pass.title);
			let passTrated = formatSearch(search);

			return passTrated === itemTrated
		});
		setSearchListData(filteredData);
  }

  return (
    <Container>
      <SearchBar
        placeholder="Pesquise pelo nome do serviço"
        onChangeText={(value) => handleFilterLoginData(value)}
      />
			<TouchableOpacity onPress={emptyDataStorage}
				style={{
					marginTop: 10,
					width: '100%',
					padding:24,
					backgroundColor: 'white',
					justifyContent: 'center',
					alignContent: 'center',
					borderRadius: 5
				}}
				>
				<Text>
					Teste no botão
				</Text>
			</TouchableOpacity>
      <LoginList
        keyExtractor={(item) => item.id}
        data={searchListData}
        ListEmptyComponent={(
          <EmptyListContainer>
            <EmptyListMessage>Nenhum item a ser mostrado</EmptyListMessage>
          </EmptyListContainer>
        )}
        renderItem={({ item: loginData }) => {
          return <LoginDataItem
            title={loginData.title}
            email={loginData.email}
            password={loginData.password}
          />
        }}
      />
    </Container>
  )
}
