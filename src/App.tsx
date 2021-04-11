import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import {StoreProvider} from './hooks/store';
import Routes from './routes';

export default function App(): JSX.Element {
    return (
        <NavigationContainer>
            <StoreProvider>
                <StatusBar backgroundColor='#f2f2f2' barStyle='dark-content' />
                <Routes />
            </StoreProvider>
        </NavigationContainer>
    );
}