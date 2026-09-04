import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { COLORS, globalStyles } from '../styles/theme';

export default function ConsultaScreen({ modulo, onNavigate, onVoltarHome }) {
  const registrosExemplo = [
    { id: '1', titulo: `${modulo} - Registro 01`, sub: 'Código: exmplo1 | Status: Ativo' },
    { id: '2', titulo: `${modulo} - Registro 02`, sub: 'Código: exemplo2 | Status: Pendente' },
  ];

  return (
    <View style={[globalStyles.container, { paddingHorizontal: 20 }]}>
      <Text style={globalStyles.titulo}>Consultar {modulo}</Text>
      <Text style={globalStyles.subtitulo}>Listagem de registros</Text>

      <TextInput 
        style={styles.inputBusca} 
        placeholder={`Buscar em ${modulo}...`} 
      />

      <TouchableOpacity style={styles.btnNovo} onPress={() => onNavigate('INSERCAO', modulo)}>
        <Text style={styles.textoBtnNovo}>+ Cadastrar Novo</Text>
      </TouchableOpacity>

      <FlatList 
        data={registrosExemplo}
        keyExtractor={(item) => item.id}
        style={{ width: '100%', marginVertical: 15 }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemNome}>{item.titulo}</Text>
              <Text style={styles.itemSub}>{item.sub}</Text>
            </View>
            <TouchableOpacity 
              style={styles.btnEditar} 
              onPress={() => onNavigate('EDICAO', modulo)}
            >
              <Text style={styles.textoBtnEditar}> Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={globalStyles.btnVoltar} onPress={onVoltarHome}>
        <Text style={globalStyles.textoBtnVoltar}> Voltar para a Homepage</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBusca: {
    width: '100%',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  btnNovo: {
    backgroundColor: COLORS.secondary,
    width: '100%',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBtnNovo: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  itemCard: {
    backgroundColor: COLORS.cardBg,
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
  },
  itemNome: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  itemSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  btnEditar: {
    backgroundColor: COLORS.primary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  textoBtnEditar: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

