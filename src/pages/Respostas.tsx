import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { useStore } from '../hooks/store';
import ItemResponse from '../components/ItemResponse';

export default function Respostas(): JSX.Element {
    const { responses } = useStore()

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} numberOfLines={1}>Respostas Inseridas</Text>
            <FlatList
                data={responses}
                renderItem={({ item }) => <ItemResponse response={item} /> }
            />
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
    }
});
