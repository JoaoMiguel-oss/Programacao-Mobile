import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  StyleSheet
} from 'react-native';

import { cadastrarAluno, editarAluno } from './api';

export default function InsercaoScreen({ route, onSalvarSucesso, onVoltar }) {
  // Verifica se recebeu dados de um aluno para editar
  const alunoEdicao = route?.params?.aluno || null;

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');

  const [mensagemStatus, setMensagemStatus] = useState('');
  const [tipoStatus, setTipoStatus] = useState('');

  // Preenche os campos se for modo de edição
  useEffect(() => {
    if (alunoEdicao) {
      setNome(alunoEdicao.nome || '');
      setCpf(alunoEdicao.cpf || '');
      setDataNascimento(alunoEdicao.data_nascimento || '');
      setEmail(alunoEdicao.email || '');
    }
  }, [alunoEdicao]);

  const salvarNoBanco = async () => {
    if (!nome || !cpf || !dataNascimento) {
      setMensagemStatus('Preencha os campos obrigatórios (*)');
      setTipoStatus('erro');
      return;
    }

    setMensagemStatus('A guardar...');

    const dadosAluno = {
      nome,
      cpf,
      data_nascimento: dataNascimento,
      email,
    };

    let resultado;
    if (alunoEdicao) {
      resultado = await editarAluno({ ...dadosAluno, id_aluno: alunoEdicao.id_aluno });
    } else {
      resultado = await cadastrarAluno(dadosAluno);
    }

    if (resultado.error || resultado.erro) {
      setMensagemStatus(resultado.error || 'Erro ao salvar.');
      setTipoStatus('erro');
    } else {
      setMensagemStatus(alunoEdicao ? 'Aluno atualizado com sucesso!' : 'Aluno cadastrado com sucesso!');
      setTipoStatus('sucesso');

      setNome('');
      setCpf('');
      setDataNascimento('');
      setEmail('');

      setTimeout(() => {
        if (onSalvarSucesso) onSalvarSucesso();
      }, 1500);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        {alunoEdicao ? 'Editar Aluno' : 'Cadastrar Aluno'}
      </Text>

      {mensagemStatus !== '' && (
        <View
          style={[
            styles.boxMensagem,
            tipoStatus === 'sucesso' ? styles.msgSucesso : styles.msgErro,
          ]}
        >
          <Text style={styles.txtMensagem}>{mensagemStatus}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nome Completo *"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF *"
        placeholderTextColor="#94A3B8"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento (AAAA-MM-DD) *"
        placeholderTextColor="#94A3B8"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#94A3B8"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableHighlight
        style={styles.btnSalvar}
        underlayColor="#0F172A"
        onPress={salvarNoBanco}
      >
        <Text style={styles.txtBotao}>
          {alunoEdicao ? 'ATUALIZAR REGISTRO' : 'SALVAR REGISTRO'}
        </Text>
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
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#0F172A', textAlign: 'center' },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginBottom: 12, color: '#0F172A' },
  btnSalvar: { backgroundColor: '#0F172A', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnVoltar: { backgroundColor: '#64748B', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  txtBotao: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  boxMensagem: { padding: 10, borderRadius: 8, marginBottom: 15, alignItems: 'center' },
  msgSucesso: { backgroundColor: '#DCFCE7', borderWidth: 1, borderColor: '#22C55E' },
  msgErro: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#EF4444' },
  txtMensagem: { fontWeight: 'bold', color: '#0F172A', textAlign: 'center' },
});

