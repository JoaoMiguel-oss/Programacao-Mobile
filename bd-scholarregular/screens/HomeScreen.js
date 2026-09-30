import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../styles/theme';

export default function HomeScreen({ onNavigate }) {
  const modulos = [
    { nome: 'Alunos', icon: 'account-group-outline' },
    { nome: 'Professores', icon: 'account-tie-outline' },
    { nome: 'Turmas', icon: 'google-classroom' },
    { nome: 'Cursos', icon: 'school-outline' },
    { nome: 'Disciplinas', icon: 'book-open-page-variant-outline' },
    { nome: 'Matrículas', icon: 'card-text-outline' },
    { nome: 'Responsáveis', icon: 'account-child-outline' },
    { nome: 'Avaliações', icon: 'star-outline' },
    { nome: 'Coordenadores', icon: 'account-supervisor-outline' },
    { nome: 'Boletins', icon: 'file-document-outline' },
  ];

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <View style={styles.bannerContainer}>
        <MaterialCommunityIcons name="school" size={60} color={COLORS.primary} />
        <Text style={styles.appTitle}>APP_SCHOLAR</Text>
        <Text style={styles.appSubtitle}>Sistema Acadêmico Escolar</Text>
        
        <View style={styles.welcomeBox}>
          <Text style={styles.welcomeTitle}>Bem-vindo!</Text>
          <Text style={styles.welcomeSub}>Selecione uma opção para gerenciar os dados acadêmicos</Text>
        </View>
      </View>

      <View style={styles.gridContainer}>
        {modulos.map((item, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card}
            onPress={() => onNavigate('CONSULTA', item.nome)}
          >
            <MaterialCommunityIcons name={item.icon} size={32} color={COLORS.primary} />
            <Text style={styles.cardTitle}>{item.nome}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 5,
  },
  appSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  welcomeBox: {
    alignItems: 'center',
    marginTop: 15,
  },
  welcomeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  welcomeSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 15,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    width: '48%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
});