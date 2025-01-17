

import React, {useState, useEffect} from 'react';
import{ Feather } from '@expo/vector-icons';
import{ useNavigation, useRoute} from '@react-navigation/native';
import { View, FlatList,  Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    function navigateToDetails(incident){
      navigation.navigate('Detail',{ incident });
    }

    async function loadIncidents(){

      if (loading){
        return;
      }

      if (total >0 && incidents.length === total){
        return;
      }

      setLoading(true);

      const response = await api.get('incidents', {
        params: { page }
      });      
            
      setIncidents([...incidents, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page + 1);
      setLoading(false);

    }

    useEffect(() => {
      loadIncidents();
    },[]);

     return(
       <View style={styles.container}>
         <View style={styles.header}>
           <Image source ={logoImg}/>
           <Text stye={styles.headerText}>
     Total de <Text style={styles.headerTextBold}>{total} casos</Text>
           </Text>
         </View>

         <Text style={styles.title}>Bem Vindo!</Text>
         <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>
         
        <FlatList 
          data={incidents}
          style={styles.incidentList}
          keyExtractor ={incident => String(incident.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem ={({item})=>(
          
          <View key style={styles.incident}>
              <Text style={styles.incidentProperty}>Ong</Text>
          <Text style={styles.incidentValue}>{item.name}</Text>

              <Text style={styles.incidentProperty}>Caso</Text>
          <Text style={styles.incidentValue}>{item.title}</Text>

              <Text style={styles.incidentProperty}>Valor</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('en-US',{
              style:'currency',
              currency:'USD'                                  
            }).format( item.Value)}</Text>

              <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={()=>navigateToDetails(item)}
              >  
              <Text style={styles.detailsButtonText}>Ver mais deatlhes</Text>
              <Feather name='arrow-right' size={16} color='#E02041'></Feather>
              </TouchableOpacity>
           </View>
         
          )}
        />
        
      </View>
     )
}

