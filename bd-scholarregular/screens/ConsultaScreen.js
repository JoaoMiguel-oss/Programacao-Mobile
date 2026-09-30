import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator, RefreshControl } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../styles/theme';
import { api } from './api';

export default function ConsultaScreen({ modulo, onNavigate }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const buscarDados = useCallback(async () => {
    try {
      const resultado = await api.listarAlunos();
      if (Array.isArray(resultado)) {
        setDados(resultado);
      } else {
        Alert.alert('Erro', resultado.erro || 'Falha ao carregar registros.');
      }
    } catch (erro) {
      Alert.alert('Erro de Conexão', erro.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    buscarDados();
  }, [modulo, buscarDados]);

  const handleRefresh = () => {
    setRefreshing(true);
    buscarDados();
  };

  if (loading && dados.length === 0) {
    return (
      <ScrollView contentContainerStyle={[globalStyles.container, { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.textSecondary }}>Carregando...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={[globalStyles.container, { padding: 20 }]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={[COLORS.primary]} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Gerenciamento de {modulo}</Text>
      </View>

      <View style={styles.acoesBox}>
        <TouchableOpacity 
          style={styles.btnAcao} 
          onPress={() => onNavigate('INSERCAO', modulo)}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={20} color={COLORS.white} />
          <Text style={styles.txtAcao}>Cadastrar Novo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnAcao, { backgroundColor: COLORS.secondary }]} onPress={handleRefresh} disabled={refreshing}>
          <MaterialCommunityIcons name="refresh" size={20} color={COLORS.white} />
          <Text style={styles.txtAcao}>Atualizar Lista</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Alunos no Banco de Dados:</Text>

      {dados.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="account-off-outline" size={48} color={COLORS.textSecondary} />
          <Text style={styles.textoVazio}>Nenhum aluno encontrado.</Text>
          <Text style={styles.textoVazioSub}>Toque em "Cadastrar Novo" para adicionar.</Text>
        </View>
      ) : (
        dados.map((item) => (
          <View key={item.id_aluno} style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.campoText}><Text style={styles.label}>ID:</Text> {item.id_aluno}</Text>
              <Text style={styles.campoText}><Text style={styles.label}>Nome:</Text> {item.nome}</Text>
              <Text style={styles.campoText}><Text style={styles.label}>CPF:</Text> {item.cpf}</Text>
              <Text style={styles.campoText}><Text style={styles.label}>Nascimento:</Text> {item.data_nascimento}</Text>
              <Text style={styles.campoText}><Text style={styles.label}>E-mail:</Text> {item.email || 'N/A'}</Text>
            </View>

            <View style={styles.cardActions}>
              <TouchableOpacity 
                style={styles.btnEditar} 
                onPress={() => onNavigate('EDICAO', { ...item, modulo })}
              >
                <MaterialCommunityIcons name="pencil-outline" size={20} color={COLORS.primary} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.btnExcluir} 
                onPress={() => confirmarExclusao(item.id_aluno, item.nome)}
              >
                <MaterialCommunityIcons name="delete-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );

  function confirmarExclusao(id, nome) {
    Alert.alert(
      'Confirmar Exclusão',
      `Excluir aluno "${nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => excluirAluno(id)
        }
      ]
    );
  }

  async function excluirAluno(id) {
    try {
      await api.deletarAluno(id);
      Alert.alert('Sucesso', 'Aluno excluído com sucesso!');
      buscarDados();
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    }
  }
}

const styles = StyleSheet.create({
  header: { marginBottom: 15 },
  titulo: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginBottom: 15, textAlign: 'center' },
  subtitulo: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 10 },
  acoesBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  btnAcao: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, padding: 12, borderRadius: 8, width: '48%', justifyContent: 'center' },
  txtAcao: { color: COLORS.white, fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  textoVazio: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 10, fontSize: 16 },
  textoVazioSub: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 4, fontSize: 13 },
  card: { backgroundColor: COLORS.cardBg, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardInfo: { flex: 1 },
  cardActions: { flexDirection: 'row', gap: 8, marginLeft: 10 },
  campoText: { fontSize: 14, color: COLORS.textPrimary, marginBottom: 4 },
  label: { fontWeight: 'bold', color: COLORS.primary },
  btnEditar: { padding: 8, borderWidth: 1, borderColor: COLORS.border, borderRadius: 6 },
  btnExcluir: { padding: 8, borderWidth: 1, borderColor: COLORS.error, borderRadius: 6 },
});