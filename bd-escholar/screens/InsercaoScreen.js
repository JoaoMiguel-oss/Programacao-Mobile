import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { COLORS, globalStyles } from '../styles/theme';

export default function InsercaoScreen({ modulo, onSalvar, onVoltar }) {
  const handleSalvar = () => {
    Alert.alert("APP Scholar", `Registro salvo em ${modulo}!`);
    onSalvar();
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.titulo}>Cadastrar {modulo}</Text>
      <Text style={globalStyles.subtitulo}>Preencha o formulário de inserção</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nome / Descrição:</Text>
        <TextInput style={styles.input} placeholder="Digite aqui:" />

        <Text style={styles.label}>Código / Identificador:</Text>
        <TextInput style={styles.input} placeholder="Ex: 2026-001" />

        <Text style={styles.label}>Observações:</Text>
        <TextInput style={[styles.input, styles.multiline]} multiline placeholder="Informações adicionais..." />
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>Salvar Registro</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.btnVoltar} onPress={onVoltar}>
        <Text style={globalStyles.textoBtnVoltar}>Voltar para Consulta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    width: '90%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
    fontSize: 15,
  },
  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },
  botao: {
    width: '90%',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

