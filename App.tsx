import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Poppins_400Regular, Poppins_500Medium } from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components';

import { AppRoutes } from './src/routes/app.routes';
import theme from './src/global/styles/theme';
import { StatusBar } from 'react-native';
import { StorageProvider } from './src/hooks/data_storage';



export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<StatusBar barStyle="light-content"/>
				<StorageProvider>
					<AppRoutes />
				</StorageProvider>
			</NavigationContainer>
		</ThemeProvider>
  );
}
