import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Tts from 'react-native-tts';
import { RouteProp, useRoute } from '@react-navigation/native';
Icon.loadFont();

import { Response } from '../models/Response';

type Params = {
    Resp: {
        response: Response
    }
}

export default function RespostaPage(): JSX.Element {
    const route = useRoute<RouteProp<Params, 'Resp'>>();
    const { response } = route.params;

    const readText = (value: string): void => {
        Tts.speak(value);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{response.id}° Resposta cadastrada</Text>
            <Text style={styles.subtitle}>OUVE</Text>
            <Text style={styles.textPrincipal}>{response.ouvir}</Text>
            <Text style={styles.subtitle}>RESPOSTA</Text>
            <Text style={styles.textPrincipal}>{response.resposta}</Text>
            <TouchableOpacity onPress={() => readText(response.resposta)}
                style={styles.button}
            >
                <Icon name='mic' color='#bbbbff' size={50} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        color: '#222222',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
    },
    subtitle: {
        fontSize: 17,
        color: '#222222'
    },
    textPrincipal: {
        width: '100%',
        height: 30,
        backgroundColor: '#ddddff',
        borderRadius: 4,
        margin: 10,
        color: '#222222',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    button: {
        margin: 20,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 35,
        borderColor: '#cccccc',
        borderWidth: 2
    }
})