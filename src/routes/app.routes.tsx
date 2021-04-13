import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
Icon.loadFont();

import MakeVoice from '../pages/MakeVoice';
import CadastrarResponse from '../pages/CadastrarResponse';
import ResponseRoutes from './respostas.routes';

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
                component={ResponseRoutes}
                options={{
                    tabBarLabel: 'Respostas',
                    tabBarIcon: ({ color, size}: PropsTabBarIcon) => CustomIcon('file-text', color, size),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigation;