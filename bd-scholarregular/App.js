import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import InsercaoScreen from './screens/InsercaoScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('HOME');
  const [moduloAtual, setModuloAtual] = useState('Alunos');

  const navegarPara = (tela, modulo = 'Alunos') => {
    setModuloAtual(modulo);
    setTelaAtual(tela);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scholar App</Text>
        {telaAtual !== 'HOME' && (
          <TouchableOpacity 
            style={styles.btnVoltar} 
            onPress={() => setTelaAtual('HOME')}
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
            onSalvarSucesso={() => navegarPara('CONSULTA', moduloAtual)} 
            onVoltar={() => navegarPara('CONSULTA', moduloAtual)} 
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