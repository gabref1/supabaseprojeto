import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { supabase } from './conexao';

export default function App() {
  const [tituloDigitado, setTituloDigitado] = useState("");
  const [autorDigitado, setAutorDigitado] = useState("");
  const [quantidadeDigitada, setQuantidadeDigitada] = useState("");
  const [categoriaDigitada, setCategoriaDigitada] = useState("");
  const [dados, setDados] = useState([]);

  const consultarLivros = async () => {
    const { data, error } = await supabase.from("tb_livros").select("*");
    if (error) {
      alert("Falha ao consultar: " + error.message);
    } else {
      setDados(data);
    }
  };

  useEffect(() => {
    consultarLivros();
  }, []);

  const cadastrarLivro = async () => {
    const { error } = await supabase.from("tb_livros").insert([
      {
        coluna_titulo: tituloDigitado,
        coluna_autor: autorDigitado,
        coluna_quantidade: quantidadeDigitada,
        coluna_categoria: categoriaDigitada,
      },
    ]);
    if (error) {
      alert("Falha ao cadastrar: " + error.message);
    } else {
      alert("Cadastrado com sucesso!");
      consultarLivros();
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={{ fontSize: 20 }}>Cadastro de Livros</Text>
      <TextInput
        onChangeText={(texto) => setTituloDigitado(texto)}
        placeholder='Digite o título'
        style={estilos.caixaTexto} />
      <TextInput
        onChangeText={(texto) => setAutorDigitado(texto)}
        placeholder='Digite o autor'
        style={estilos.caixaTexto} />
      <TextInput
        onChangeText={(texto) => setQuantidadeDigitada(texto)}
        placeholder='Digite a quantidade'
        style={estilos.caixaTexto} />
      <TextInput
        onChangeText={(texto) => setCategoriaDigitada(texto)}
        placeholder='Digite a categoria'
        style={estilos.caixaTexto} />
      <Button
        title="Cadastrar"
        onPress={cadastrarLivro} />

      <ScrollView style={estilos.scrollview}>
        {dados.map((item, index) => (
          <View key={index} style={estilos.cxLivros}>
            <Text>TÍTULO: {item.coluna_titulo}</Text>
            <Text>AUTOR: {item.coluna_autor}</Text>
            <Text>QUANTIDADE: {item.coluna_quantidade}</Text>
            <Text>CATEGORIA: {item.coluna_categoria}</Text>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  caixaTexto: {
    borderWidth: 1,
    borderColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    width: '100%',
  },
  cxLivros: {
    borderWidth: 1,
    borderColor:" #fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  scrollview: {
    width: '100%',
    marginTop: 20,
  },
});


