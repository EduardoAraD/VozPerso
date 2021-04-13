import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { useStore } from '../hooks/store';
import { createResponse } from '../models/Response';

export default function CadastrarResponse(): JSX.Element {
    const { register } = useStore()
    const [ouvirText, setOuvirText] = useState('');
    const [respostaText, setRespostaText] = useState('');

    async function handleSubmit(): Promise<void> {
        console.log('cadastrar');
        const responseData = createResponse(ouvirText.trim(), respostaText.trim());
        await register(responseData);
        setOuvirText('')
        setRespostaText('')
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Cadastrar novas respostas</Text>
                <View style={styles.inputContainer}>    
                    <Text style={styles.label}>O que ouvir?</Text>
                    <TextInput
                        style={styles.input}
                        value={ouvirText}
                        onChangeText={setOuvirText}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>O que responder?</Text>
                    <TextInput
                        style={styles.input}
                        value={respostaText}
                        onChangeText={setRespostaText}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.textButton}>Cadastrar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        color: 'blue',
        fontSize: 23,
        textAlign: 'center',
        margin: 20,
        fontWeight: 'bold'
    },
    inputContainer: {
        padding: 5,
        marginVertical: 2,
        backgroundColor: '#ffffff',
        borderRadius: 5
    },
    label: {
        fontSize: 20,
        color: '#222222',
        marginBottom: 5
    },
    input: {
        backgroundColor: '#ccccff',
        borderRadius: 4,
        padding: 4,
        margin: 0
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: '#ffffff',
        fontSize: 25,
        fontWeight: 'bold'
    }
})
