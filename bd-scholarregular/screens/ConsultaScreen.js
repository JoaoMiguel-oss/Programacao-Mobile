import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../styles/theme';



export default function ConsultaScreen({ modulo, onNavigate }) {
  const [dados, setDados] = useState([]);

  const buscarDados = async () => {
    try {
      const resposta = await fetch(`http://${API_URL}/app_scholar_api/alunos.php`);
      const resultado = await resposta.json();
      if (Array.isArray(resultado)) {
        setDados(resultado);
      } else {
        Alert.alert('Erro', resultado.erro || 'Falha ao carregar registros.');
      }
    } catch (erro) {
      Alert.alert('Erro de Conexão', 'Não foi possível buscar dados do servidor.');
    }
  };

  useEffect(() => {
    buscarDados();
  }, [modulo]);

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { padding: 20 }]}>
      <Text style={styles.titulo}>Gerenciamento de {modulo}</Text>

      <View style={styles.acoesBox}>
        <TouchableOpacity 
          style={styles.btnAcao} 
          onPress={() => onNavigate('INSERCAO', modulo)}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={20} color={COLORS.white} />
          <Text style={styles.txtAcao}>Cadastrar Novo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnAcao, { backgroundColor: COLORS.secondary }]} onPress={buscarDados}>
          <MaterialCommunityIcons name="refresh" size={20} color={COLORS.white} />
          <Text style={styles.txtAcao}>Atualizar Lista</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitulo}>Alunos no Banco de Dados:</Text>

      {dados.length === 0 ? (
        <Text style={styles.textoVazio}>Nenhum aluno encontrado.</Text>
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

            <TouchableOpacity 
              style={styles.btnEditar} 
              onPress={() => onNavigate('EDICAO', modulo)}
            >
              <MaterialCommunityIcons name="pencil-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary, marginBottom: 15, textAlign: 'center' },
  subtitulo: { fontSize: 16, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 10 },
  acoesBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  btnAcao: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, padding: 12, borderRadius: 8, width: '48%', justifyContent: 'center' },
  txtAcao: { color: COLORS.white, fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
  textoVazio: { textAlign: 'center', color: COLORS.textSecondary, marginTop: 20 },
  card: { backgroundColor: COLORS.cardBg, padding: 15, marginBottom: 10, borderWidth: 1, borderColor: COLORS.border, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardInfo: { flex: 1 },
  campoText: { fontSize: 14, color: COLORS.textPrimary, marginBottom: 4 },
  label: { fontWeight: 'bold', color: COLORS.primary },
  btnEditar: { padding: 8, borderWidth: 1, borderColor: COLORS.border, borderRadius: 6, marginLeft: 10 },
});