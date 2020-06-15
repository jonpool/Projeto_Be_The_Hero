import React from 'react';
import{ Feather } from '@expo/vector-icons';
import { View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';


import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail(){
  const navigation = useNavigation();
  const route = useRoute();

  const item = route.params.incident;
  const message = `Ola ${item.name}, Estou entrando em cantato pois gostaria de ajudar no caso ${item.title} com o valor de 
  ${Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format( item.Value)}`;

  //essa funcao cria uma funcao pra mandar o user para a tela anterior
  function navigateBack(){
    navigation.goBack();
  }
  //Esta funcao manda o cliente para o whats app
  function sendMail(){
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${item.title}`,
      recipients:[item.email],
      body :message,
    });
  }
  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${item.whatsApp}&text=${message}`)

  }



  return(
  <View style={styles.container}>
         <View style={styles.header}>
           <Image source ={logoImg}/>
           <TouchableOpacity onPress={navigateBack}>
           <Feather name='arrow-left' size={28} color='#E02041'></Feather>
           </TouchableOpacity>
         </View>

         <View key style={styles.incident}>
              <Text style={styles.incidentProperty,{marginTop: 0}}>Ong</Text>
              <Text style={styles.incidentValue}>{item.name} de {item.city} - {item.uf}</Text>

              <Text style={styles.incidentProperty}>Caso</Text>
          <Text style={styles.incidentValue}>{item.title}</Text>

              <Text style={styles.incidentProperty}>Valor</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('en-US',{
              style:'currency',
              currency:'USD'                                  
            }).format( item.Value)}</Text>
          </View>

          <View style={styles.contactBox}>
              <Text style={styles.heroTitle}>Salve o Dia!</Text>
              <Text style={styles.heroTitle}>Seja o heroi desse caso.</Text>

              <Text style={styles.heroDesctiption}>Entre em contato:</Text>
          
          <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>E-Mail</Text>
          </TouchableOpacity>
          </View>
          </View>

  </View>
  );
}

