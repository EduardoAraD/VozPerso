import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Response } from '../models/Response';

interface Props {
    response: Response
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: '100%',
        backgroundColor: '#ccccff',
        justifyContent: 'center',
        marginVertical: 2,
        borderRadius: 5
    },
    text: {
        color: '#002222',
        padding: 5,
        fontSize: 15,
    }
})

export default function ItemResponse({ response }: Props): JSX.Element {
    const navigation = useNavigation()

    function handlenavigateRespostaPage(){
        navigation.navigate('RespostaPage', {
            response
        });
    }

    return (
        <TouchableOpacity
            onPress={handlenavigateRespostaPage}
            style={styles.container}
        >
            <Text style={styles.text}>{response.ouvir}</Text>
        </TouchableOpacity>
    )
}