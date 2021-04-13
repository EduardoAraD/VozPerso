import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useStore } from '../hooks/store';
import TabNavigation from './app.routes';

export default function Routes(): JSX.Element{
    const { loading } = useStore();

    if(loading){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='blue' />
            </View>
        )
    }

    return <TabNavigation />
}
