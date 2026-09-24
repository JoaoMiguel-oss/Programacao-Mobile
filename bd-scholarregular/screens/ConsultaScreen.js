import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { buscarAlunos } from './api';

export default function ConsultaScreen({ onEditarAluno }) {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarDados = async () => {
    setCarregando(true);
    const dados = await buscarAlunos();
    setAlunos(dados);
    setCarregando(false);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alunos no Banco de Dados</Text>

      <TouchableOpacity style={styles.btnAtualizar} onPress={carregarDados}>
        <Text style={styles.txtBotao}>ATUALIZAR LISTA</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color="#0F172A" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={alunos}
          keyExtractor={(item) => String(item.id_aluno)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.id}>ID: {item.id_aluno}</Text>
              <Text style={styles.nome}>Nome: {item.nome}</Text>
              <Text style={styles.info}>CPF: {item.cpf}</Text>
              <Text style={styles.info}>E-mail: {item.email || 'Não informado'}</Text>

              {onEditarAluno && (
                <TouchableOpacity
                  style={styles.btnEditar}
                  onPress={() => onEditarAluno(item)}
                >
                  <Text style={styles.txtEditar}>EDITAR</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum aluno encontrado no banco de dados.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: '#0F172A', marginBottom: 15, textAlign: 'center' },
  btnAtualizar: { backgroundColor: '#64748B', padding: 10, borderRadius: 6, alignItems: 'center', marginBottom: 15 },
  txtBotao: { color: '#FFF', fontWeight: 'bold' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#CBD5E1' },
  id: { fontWeight: 'bold', color: '#64748B', fontSize: 12 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#0F172A', marginVertical: 2 },
  info: { color: '#334155', fontSize: 14 },
  btnEditar: { marginTop: 10, backgroundColor: '#0F172A', padding: 8, borderRadius: 4, alignItems: 'center' },
  txtEditar: { color: '#FFF', fontWeight: 'bold', fontSize: 12 },
  vazio: { textAlign: 'center', color: '#64748B', marginTop: 30 },
});

