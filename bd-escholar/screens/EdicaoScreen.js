import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { COLORS, globalStyles } from '../styles/theme';

export default function EdicaoScreen({ modulo, onAtualizar, onVoltar }) {
  const handleAtualizar = () => {
    Alert.alert("APP Scholar", `Alterações em ${modulo} salvas com sucesso!`);
    onAtualizar();
  };

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.titulo}>Editar {modulo}</Text>
      <Text style={globalStyles.subtitulo}>Altere as informações desejadas</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Editar Nome / Descrição:</Text>
        <TextInput style={styles.input} defaultValue={`${modulo} - Registro 01`} />

        <Text style={styles.label}>Editar Código / Identificador:</Text>
        <TextInput style={styles.input} defaultValue="101" />

        <Text style={styles.label}>Editar Observações:</Text>
        <TextInput style={[styles.input, styles.multiline]} multiline defaultValue="Dados anteriores de exemplo..." />
      </View>

      <TouchableOpacity style={styles.botao} onPress={handleAtualizar}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={globalStyles.btnVoltar} onPress={onVoltar}>
        <Text style={globalStyles.textoBtnVoltar}>Cancelar</Text>
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
    backgroundColor: COLORS.primary,
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

