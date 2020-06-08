import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Select from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUF {
  sigla: string;
}
interface IBGECity {
  nome: string;
}

const Home = () => {

  const [uf, setUf] = useState<[]>([]);
  const [cities, setCities] = useState<[]>([]);
  const navigation = useNavigation();
  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(res => {
        const ufs = res.data.map((item: any) => {
          return {
            label: item.sigla,
            value: item.sigla
          }
        })
        setUf(ufs);

      })
  }, [])

  useEffect(() => {
    if (selectedUf === '') {
      return
    }

    axios
      .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(res => {

        const cities = res.data.map((item: any) => {
          return {
            label: item.nome,
            value: item.nome
          }
        })


        setCities(cities);
      });



  }, [selectedUf])

  function handleNavigationToPoints() {
    if (selectedUf !== '' && selectedCity !== '') {
      navigation.navigate('Points', {
        uf: selectedUf,
        city: selectedCity
      });
    } else {
      Alert.alert('Campos vazios', 'Opss...! Possui campos vazios')
    }


  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground source={require('../../assets/home-background.png')} imageStyle={{ width: 274, height: 368 }} style={styles.container}>

        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
          </View>
        </View>

        <View style={styles.footer}>

          <View style={styles.input}>
            <Select placeholder={{
              label: 'Selecione a UF',
              value: null,
            }} style={pickerSelectStyles} onValueChange={value => setSelectedUf(value)} items={uf}></Select>
          </View>
          <View style={styles.input}>
            <Select placeholder={{
              label: 'Selecione a cidade',
              value: null,
            }} style={pickerSelectStyles} onValueChange={value => setSelectedCity(value)} items={cities}></Select>
          </View>
          {/* <TextInput style={styles.input} placeholder="Digite a UF" maxLength={2} autoCapitalize="characters" autoCorrect={false} onChangeText={text => setUf(text)}/>
          <TextInput style={styles.input} autoCorrect={false} placeholder="Digite a Cidade" onChangeText={setCity}/> */}
          <RectButton style={styles.button} onPress={handleNavigationToPoints}>
            <View style={styles.buttonIcon}>
              <Text> <Icon name="arrow-right" color="#FFF" size={24} /> </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}


const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16, // to ensure the text is never behind the icon
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},


  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }


});

export default Home;