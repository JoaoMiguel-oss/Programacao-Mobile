
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, globalStyles } from '../styles/theme';

export default function HomeScreen({ onNavigate }) {
  const modulos = [
    'Alunos', 'Professores', 'Cursos', 'Disciplinas', 'Responsáveis',
    'Matrículas', 'Turmas', 'Avaliações', 'Coordenadores', 'Boletins'
  ];

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <Image source={require('../assets/logo.png')} style={globalStyles.logo} />
      <Text style={globalStyles.titulo}>APP Scholar</Text>
      <Text style={globalStyles.subtitulo}>Sistema Acadêmico Mobile</Text>

      <View style={styles.grid}>
        {modulos.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitulo}>{item}</Text>
            <View style={styles.buttonGroup}>
              {/* Botão para Tela de Inserção / Cadastro */}
              <TouchableOpacity 
                style={styles.btnCard} 
                onPress={() => {
                  console.log("Navegando para INSERCAO:", item);
                  onNavigate('INSERCAO', item);
                }}
              >
                <Text style={styles.textoBtnCard}>+ Inserir</Text>
              </TouchableOpacity>

              {/* Botão para Tela de Consulta / Listagem */}
              <TouchableOpacity 
                style={[styles.btnCard, styles.btnConsulta]} 
                onPress={() => {
                  console.log("Navegando para CONSULTA:", item);
                  onNavigate('CONSULTA', item);
                }}
              >
                <Text style={styles.textoBtnCard}> Consultar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  grid: {
    width: '90%',
  },
  card: {
    backgroundColor: COLORS.cardBg,
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnCard: {
    flex: 0.48,
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnConsulta: {
    backgroundColor: COLORS.dark,
  },
  textoBtnCard: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 13,
  },
});


