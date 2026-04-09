import { useTarefas } from '@/hooks/useTarefas';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
    const { tarefas, novaTarefa, setNovaTarefa, adicionarTarefa, removerTarefa } = useTarefas();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Tarefas</Text>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Digite uma tarefa..."
                placeholderTextColor="#fff"
                value={novaTarefa}
                onChangeText={setNovaTarefa}
            />
            <Button title="Adicionar" onPress={adicionarTarefa} color="green" />
            </View>

        <FlatList
            data={tarefas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.tarefaContainer}>
                <Text style={styles.tarefaTexto}>{item.texto}</Text>
                <TouchableOpacity onPress={() => removerTarefa(item.id)}>
                    <Text style={styles.remover}>X</Text>
                </TouchableOpacity>
                </View>
            )}    
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#2C2F33' },
    titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#fff' },
    inputContainer: { flexDirection: 'row', marginBottom: 10},
    input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginRight: 10 },
    tarefaContainer: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15,
        marginBottom: 5, borderRadius: 5, shadowColor: '#fff', shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
    tarefaTexto: { fontSize: 16, color: '#000' },
    remover: { fontSize: 18, color: 'red' },
});
