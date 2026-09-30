import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { COLORS, globalStyles } from '../styles/theme';
import { api } from './api';

export default function EdicaoScreen({ aluno, onAtualizar, onVoltar }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (aluno?.id_aluno) {
      carregarAluno(aluno.id_aluno);
    } else if (aluno) {
      preencherCampos(aluno);
    }
  }, [aluno]);

  const carregarAluno = async (id) => {
    try {
      const resultado = await api.buscarAluno(id);
      preencherCampos(resultado);
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
  };

  const preencherCampos = (dados) => {
    setNome(dados.nome || '');
    setCpf(dados.cpf || '');
    setDataNascimento(dados.data_nascimento || '');
    setEmail(dados.email || '');
    setCarregando(false);
  };

  const validarCampos = () => {
    if (!nome.trim()) return 'Nome é obrigatório.';
    if (!cpf.trim()) return 'CPF é obrigatório.';
    if (!dataNascimento.trim()) return 'Data de nascimento é obrigatória.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) return 'Data deve ser no formato AAAA-MM-DD.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail inválido.';
    return null;
  };

  const handleSalvar = async () => {
    const erroValidacao = validarCampos();
    if (erroValidacao) {
      Alert.alert('Erro', erroValidacao);
      return;
    }

    if (!aluno?.id_aluno) {
      Alert.alert('Erro', 'ID do aluno não encontrado.');
      return;
    }

    setSalvando(true);

    try {
      await api.atualizarAluno(aluno.id_aluno, {
        nome: nome.trim(),
        cpf: cpf.trim(),
        data_nascimento: dataNascimento.trim(),
        email: email.trim(),
      });

      Alert.alert('Sucesso', 'Aluno atualizado com sucesso!');
      if (onAtualizar) onAtualizar();
    } catch (erro) {
      Alert.alert('Erro', erro.message);
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <ScrollView contentContainerStyle={[globalStyles.container, { padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={{ marginTop: 10, color: COLORS.textSecondary }}>Carregando dados...</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { padding: 20 }]}>
      <Text style={styles.formTitle}>Editar Aluno</Text>
      
      <Text style={styles.label}>Nome Completo *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Nome do aluno" 
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
        disabled={salvando}
      />

      <Text style={styles.label}>CPF *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="CPF" 
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        maxLength={14}
        disabled={salvando}
      />

      <Text style={styles.label}>Data de Nascimento *</Text>
      <TextInput 
        style={styles.input} 
        placeholder="AAAA-MM-DD" 
        value={dataNascimento}
        onChangeText={setDataNascimento}
        disabled={salvando}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        disabled={salvando}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnCancel} onPress={onVoltar} disabled={salvando}>
          <Text style={styles.txtCancel}>Cancelar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.btnSave, salvando && styles.btnDisabled]} onPress={handleSalvar} disabled={salvando}>
          {salvando ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.txtSave}>Salvar Alterações</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: COLORS.textPrimary,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  btnCancel: {
    flex: 0.48,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.cardBg,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnSave: {
    flex: 0.48,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  txtCancel: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  txtSave: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});