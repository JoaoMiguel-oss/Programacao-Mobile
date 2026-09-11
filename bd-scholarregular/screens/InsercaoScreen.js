import React, { useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';

const IP_COMPUTADOR = '172.28.176.1';

export default function InsercaoScreen({ onSalvarSucesso, onVoltar }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  
  // Estados para feedbacks de mensagens na tela
  const [mensagemStatus, setMensagemStatus] = useState('');
  const [tipoStatus, setTipoStatus] = useState(''); // 'sucesso' ou 'erro'

  const salvarNoBanco = async () => {
    setMensagemStatus('Enviando dados...');
    setTipoStatus('');

    if (!nome.trim() || !cpf.trim() || !dataNascimento.trim()) {
      setMensagemStatus('Preencha Nome, CPF e Data de Nascimento.');
      setTipoStatus('erro');
      return;
    }

    try {
      const resposta = await fetch(`http://${IP_COMPUTADOR}/app_scholar_api/cadastrar_aluno.php`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          data_nascimento: dataNascimento,
          email: email,
        }),
      });

      const textoPuro = await resposta.text();

      try {
        const resultado = JSON.parse(textoPuro);
        if (resultado.status === 'sucesso') {
          setMensagemStatus(resultado.mensagem || 'Aluno cadastrado com sucesso!');
          setTipoStatus('sucesso');
          
          // Limpa os campos
          setNome('');
          setCpf('');
          setDataNascimento('');
          setEmail('');

          // Redireciona após 2 segundos
          setTimeout(() => {
            if (onSalvarSucesso) onSalvarSucesso();
          }, 2000);
        } else {
          setMensagemStatus(resultado.mensagem || 'Erro ao cadastrar.');
          setTipoStatus('erro');
        }
      } catch (e) {
        setMensagemStatus('Resposta inválida do PHP: ' + textoPuro.substring(0, 100));
        setTipoStatus('erro');
      }
    } catch (erro) {
      setMensagemStatus('Erro de Conexão. Verifique o XAMPP/IP.');
      setTipoStatus('erro');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Aluno</Text>

      {/* Caixa de mensagem de status/sucesso na tela */}
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
        <Text style={styles.txtBotao}>SALVAR REGISTRO</Text>
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
  btnVoltar: { backgroundColor: '#64748B', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  txtBotao: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  boxMensagem: { padding: 12, borderRadius: 6, marginBottom: 15, alignItems: 'center' },
  msgSucesso: { backgroundColor: '#DCFCE7', borderWidth: 1, borderColor: '#86EFAC' },
  msgErro: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5' },
  txtMensagem: { fontWeight: 'bold', color: '#0F172A', textAlign: 'center' },
});