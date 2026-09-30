import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { api } from './api';

export default function InsercaoScreen({ onSalvarSucesso, onVoltar }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  
  const [mensagemStatus, setMensagemStatus] = useState('');
  const [tipoStatus, setTipoStatus] = useState('');
  const [salvando, setSalvando] = useState(false);

  const validarCampos = () => {
    if (!nome.trim()) return 'Nome é obrigatório.';
    if (!cpf.trim()) return 'CPF é obrigatório.';
    if (!dataNascimento.trim()) return 'Data de nascimento é obrigatória.';
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dataNascimento)) return 'Data deve ser no formato AAAA-MM-DD.';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail inválido.';
    return null;
  };

  const salvarNoBanco = async () => {
    const erroValidacao = validarCampos();
    if (erroValidacao) {
      setMensagemStatus(erroValidacao);
      setTipoStatus('erro');
      return;
    }

    setSalvando(true);
    setMensagemStatus('Enviando dados...');
    setTipoStatus('');

    try {
      const resultado = await api.cadastrarAluno({
        nome: nome.trim(),
        cpf: cpf.trim(),
        data_nascimento: dataNascimento.trim(),
        email: email.trim(),
      });

      setMensagemStatus(resultado.mensagem || 'Aluno cadastrado com sucesso!');
      setTipoStatus('sucesso');
      
      setNome('');
      setCpf('');
      setDataNascimento('');
      setEmail('');

      setTimeout(() => {
        if (onSalvarSucesso) onSalvarSucesso();
      }, 2000);
    } catch (erro) {
      setMensagemStatus(erro.message);
      setTipoStatus('erro');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Aluno</Text>

      {mensagemStatus !== '' && (
        <View style={[styles.boxMensagem, tipoStatus === 'sucesso' ? styles.msgSucesso : styles.msgErro]}>
          <Text style={styles.txtMensagem}>{mensagemStatus}</Text>
        </View>
      )}

      <TextInput 
        style={styles.input} 
        placeholder="Nome Completo *" 
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
        autoCapitalize="words"
        disabled={salvando}
      />

      <TextInput 
        style={styles.input} 
        placeholder="CPF *" 
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
        maxLength={14}
        disabled={salvando}
      />

      <TextInput 
        style={styles.input} 
        placeholder="Data de Nascimento (AAAA-MM-DD) *" 
        placeholderTextColor="#94A3B8"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        disabled={salvando}
      />

      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        placeholderTextColor="#94A3B8"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        disabled={salvando}
      />

      <TouchableHighlight 
        style={[styles.btnSalvar, salvando && styles.btnDisabled]} 
        underlayColor="#0F172A"
        onPress={salvarNoBanco}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.txtBotao}>SALVAR REGISTRO</Text>
        )}
      </TouchableHighlight>

      {onVoltar && (
        <TouchableHighlight 
          style={styles.btnVoltar} 
          underlayColor="#475569"
          onPress={onVoltar}
        >
          <Text style={styles.txtBotao}>VOLTAR</Text>
        </TouchableHighlight>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1E293B', textAlign: 'center' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginBottom: 12, color: '#0F172A' },
  btnSalvar: { backgroundColor: '#1E293B', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnDisabled: { backgroundColor: '#64748B' },
  btnVoltar: { backgroundColor: '#64748B', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  txtBotao: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  boxMensagem: { padding: 12, borderRadius: 6, marginBottom: 15, alignItems: 'center' },
  msgSucesso: { backgroundColor: '#DCFCE7', borderWidth: 1, borderColor: '#86EFAC' },
  msgErro: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5' },
  txtMensagem: { fontWeight: 'bold', color: '#0F172A', textAlign: 'center' },
});