import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import InsercaoScreen from './screens/InsercaoScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('home');
  const [alunoParaEditar, setAlunoParaEditar] = useState(null);

  const irParaEditar = (aluno) => {
    setAlunoParaEditar(aluno);
    setTelaAtual('editar');
  };

  const irParaInserir = () => {
    setAlunoParaEditar(null);
    setTelaAtual('inserir');
  };

  return (
    <SafeAreaView style={styles.container}>
      {telaAtual === 'home' && (
        <HomeScreen
          onNavegarConsulta={() => setTelaAtual('consulta')}
          onNavegarInserir={irParaInserir}
        />
      )}

      {telaAtual === 'consulta' && (
        <ConsultaScreen
          onNavegarInserir={irParaInserir}
          onEditarAluno={irParaEditar}
          onVoltar={() => setTelaAtual('home')}
        />
      )}

      {(telaAtual === 'inserir' || telaAtual === 'editar') && (
        <InsercaoScreen
          route={{ params: { aluno: alunoParaEditar } }}
          onSalvarSucesso={() => setTelaAtual('consulta')}
          onVoltar={() => setTelaAtual('consulta')}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
});

