import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import InsercaoScreen from './screens/InsercaoScreen';
import EdicaoScreen from './screens/EdicaoScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('HOME');
  const [moduloAtual, setModuloAtual] = useState('Alunos');
  const [alunoEdicao, setAlunoEdicao] = useState(null);

  const navegarPara = useCallback((tela, modulo = 'Alunos') => {
    if (tela === 'EDICAO' && modulo?.id_aluno) {
      setAlunoEdicao(modulo);
      setModuloAtual(modulo.modulo || 'Alunos');
      setTelaAtual('EDICAO');
    } else {
      setModuloAtual(typeof modulo === 'string' ? modulo : 'Alunos');
      setTelaAtual(tela);
    }
  }, []);

  const voltarParaConsulta = useCallback(() => {
    setAlunoEdicao(null);
    setTelaAtual('CONSULTA');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scholar App</Text>
        {telaAtual !== 'HOME' && (
          <TouchableOpacity 
            style={styles.btnVoltar} 
            onPress={() => {
              setAlunoEdicao(null);
              setTelaAtual('HOME');
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Inicio</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1 }}>
        {telaAtual === 'HOME' && (
          <HomeScreen onNavigate={navegarPara} />
        )}

        {telaAtual === 'CONSULTA' && (
          <ConsultaScreen 
            modulo={moduloAtual} 
            onNavigate={navegarPara} 
          />
        )}

        {telaAtual === 'INSERCAO' && (
          <InsercaoScreen 
            modulo={moduloAtual} 
            onSalvarSucesso={voltarParaConsulta} 
            onVoltar={voltarParaConsulta} 
          />
        )}

        {telaAtual === 'EDICAO' && (
          <EdicaoScreen 
            aluno={alunoEdicao}
            onAtualizar={voltarParaConsulta}
            onVoltar={voltarParaConsulta}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  btnVoltar: { padding: 8, backgroundColor: '#334155', borderRadius: 5 },
});