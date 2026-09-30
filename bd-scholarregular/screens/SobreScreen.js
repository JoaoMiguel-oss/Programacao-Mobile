import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../styles/theme';

export default function SobreScreen() {
  return (
    <ScrollView contentContainerStyle={[globalStyles.container, { padding: 20 }]}>
      {/* Banner Principal com Logo */}
      <View style={styles.logoBox}>
        <View style={styles.iconBackground}>
          <MaterialCommunityIcons name="school" size={50} color={COLORS.primary} />
        </View>
        <Text style={styles.appTitle}>APP_SCHOLAR</Text>
        <Text style={styles.appSubtitle}>Sistema Acadêmico Escolar</Text>
        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </View>

      {/* Seção: Sobre o App */}
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="information-outline" size={22} color={COLORS.primary} />
          <Text style={styles.cardHeaderTitle}>Sobre o App</Text>
        </View>
        <Text style={styles.cardDescription}>
          O App Scholar é um sistema acadêmico desenvolvido para auxiliar escolas na gestão
          de alunos, professores, turmas, cursos, avaliações e muito mais.
        </Text>
      </View>

      {/* Seção: Objetivo */}
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="target" size={22} color={COLORS.primary} />
          <Text style={styles.cardHeaderTitle}>Objetivo</Text>
        </View>
        <Text style={styles.cardDescription}>
          Facilitar o gerenciamento das informações acadêmicas, promovendo organização,
          agilidade e segurança.
        </Text>
      </View>

      {/* Seção: Tecnologias */}
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <MaterialCommunityIcons name="shield-check-outline" size={22} color={COLORS.primary} />
          <Text style={styles.cardHeaderTitle}>Tecnologias</Text>
        </View>
        <Text style={styles.cardDescription}>
          Desenvolvido com React Native (Expo) e integração com banco de dados MySQL.
        </Text>
      </View>

      {/* Rodapé / Instituição */}
      <View style={styles.footer}>
        <MaterialCommunityIcons name="bank-outline" size={20} color={COLORS.primary} />
        <Text style={styles.footerTextBold}> ETEC</Text>
        <Text style={styles.footerText}> - Educação, Tecnologia e Futuro</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoBox: {
    alignItems: 'center',
    marginVertical: 15,
  },
  iconBackground: {
    backgroundColor: '#E6EEF8',
    padding: 15,
    borderRadius: 16,
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  appSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardHeaderTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginLeft: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    paddingVertical: 10,
  },
  footerTextBold: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});