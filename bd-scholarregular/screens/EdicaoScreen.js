import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, globalStyles } from '../styles/theme';

export default function EdicaoScreen({ modulo, onAtualizar, onVoltar }) {
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [observacoes, setObservacoes] = useState('');

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { padding: 20 }]}>
      <Text style={styles.formTitle}>Editar Dados do {modulo.slice(0, -1)}</Text>
      
      <Text style={styles.label}>Nome Completo / Descrição *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Altere o nome..." 
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Código / Documento *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Altere o código..." 
        value={codigo}
        onChangeText={setCodigo}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput 
        style={[styles.input, { height: 80 }]} 
        multiline 
        placeholder="Altere as observações..." 
        value={observacoes}
        onChangeText={setObservacoes}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnCancel} onPress={onVoltar}>
          <Text style={styles.txtCancel}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btnSave} onPress={onAtualizar}>
          <Text style={styles.txtSave}>Salvar Alterações</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 5,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnCancel: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnSave: {
    flex: 0.48,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  txtCancel: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  txtSave: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});