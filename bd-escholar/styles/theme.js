import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#1565C0',
  secondary: '#1976D2',
  dark: '#0D47A1',
  background: '#F5F5F5',
  cardBg: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  white: '#FFFFFF',
  border: '#CCCCCC',
};

export const globalStyles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: COLORS.background,
    flexGrow: 1,
  },
  logo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  subtitulo: {
    fontSize: 15,
    marginBottom: 20,
    color: COLORS.textSecondary,
  },
  btnVoltar: {
    marginTop: 15,
    padding: 10,
  },
  textoBtnVoltar: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
});

