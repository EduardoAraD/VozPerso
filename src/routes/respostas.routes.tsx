import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Respostas from '../pages/Respostas';
import RespostaPage from '../pages/RespostaPage';

const Stack = createStackNavigator();

export default function ResponseRoute(): JSX.Element {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Respostas' component={Respostas}
                options={{ headerShown: false }}
            />
            <Stack.Screen name='RespostaPage' component={RespostaPage} />
        </Stack.Navigator>
    )
}