import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#002B66',       // Azul Marinho (Cabeçalhos e botões principais)
  secondary: '#0056B3',     // Azul Intermediário
  background: '#F4F6F9',    // Fundo Cinza Claro[cite: 7]
  cardBg: '#FFFFFF',        // Fundo Branco dos Cards[cite: 7]
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E0E0E0',
  white: '#FFFFFF',
  danger: '#D9534F',
};

export const globalStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});