import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();
import { useStore } from './hooks/store';

import MakeVoice from './pages/MakeVoice';
import CadastrarResponse from './pages/CadastrarResponse';
import Respostas from './pages/Respostas';

const Tab = createBottomTabNavigator();

interface PropsTabBarIcon {
    color: string;
    size: number;
}

const CustomIcon = (name: string, color: string, size: number) => <Icon name={name} color={color} size={size} />

function TabNavigation(): JSX.Element {
    return (
        <Tab.Navigator
            initialRouteName='Falar'
        >
            <Tab.Screen
                name="Home"
                component={MakeVoice}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }: PropsTabBarIcon) => CustomIcon('home', color, size),
                }}
            />
            <Tab.Screen
                name='Create'
                component={CadastrarResponse}
                options={{
                    tabBarLabel: 'Criar Resposta',
                    tabBarIcon: ({ color, size }: PropsTabBarIcon) => CustomIcon('mic', color, size),
                }}
            />
            <Tab.Screen
                name='Respostas'
                component={Respostas}
                options={{
                    tabBarLabel: 'Respostas',
                    tabBarIcon: ({ color, size}: PropsTabBarIcon) => CustomIcon('file-text', color, size),
                }}
            />
        </Tab.Navigator>
    )
}

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
