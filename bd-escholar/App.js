import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import InsercaoScreen from './screens/InsercaoScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import EdicaoScreen from './screens/EdicaoScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('HOME');
  const [moduloAtual, setModuloAtual] = useState('Alunos');

  const navegarPara = (nomeTela, nomeModulo) => {
    if (nomeModulo) {
      setModuloAtual(nomeModulo);
    }
    setTelaAtual(nomeTela);
  };

 
  if (telaAtual === 'INSERCAO') {
    return (
      <InsercaoScreen 
        modulo={moduloAtual} 
        onSalvar={() => navegarPara('CONSULTA')} 
        onVoltar={() => navegarPara('HOME')} 
      />
    );
  }


  if (telaAtual === 'CONSULTA') {
    return (
      <ConsultaScreen 
        modulo={moduloAtual} 
        onNavigate={(proximaTela) => navegarPara(proximaTela)} 
        onVoltarHome={() => navegarPara('HOME')} 
      />
    );
  }


  if (telaAtual === 'EDICAO') {
    return (
      <EdicaoScreen 
        modulo={moduloAtual} 
        onAtualizar={() => navegarPara('CONSULTA')} 
        onVoltar={() => navegarPara('CONSULTA')} 
      />
    );
  }


  return (
    <HomeScreen 
      onNavigate={(nomeTela, nomeModulo) => navegarPara(nomeTela, nomeModulo)} 
    />
  );
}

