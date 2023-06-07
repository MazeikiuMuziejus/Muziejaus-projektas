import { View, Text, Linking, SafeAreaView, Pressable, ScrollView } from 'react-native'

import { Button, InformationText } from '../components'

import { useDataContext } from '../contexts/dataContext'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function About() {
  const context = useDataContext()
  const { updateData } = context; // get the function to update data

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#C3D3A4',
      }}
    >
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#C3D3A4',
        }}
      >
        <View
          style={{
            width: '100%',
            paddingHorizontal: 40,
            paddingVertical: 20,
            justifyContent: 'flex-start',
          }}
        >
          <InformationText 
            headerText='Šaltiniai:'
            text={[]}
          />
          <InformationText
            headerText='Nuotraukos:'
            text={['Tadas Dabulskis (MMRG mokinys)', 'Gintarė Jonaitytė (MMRG mokinė)']}
          />
          <InformationText
            headerText='Dizainas:'
            text={['Oksana Iščenko (MMRG mokinė)']}
          />
          <InformationText
            headerText='Programavimas:'
            text={['Redas Domkus (MMRG mokinys)']}
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 40,
            paddingBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: '#574031',
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => updateData()}
          >
            <Text  
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#574031',
                textAlign: 'center',
              }}
            >
              Gauti naujausius duomenis
            </Text>
            <Icon 
              name='refresh'
              size={25}
              color='#574031'
            />
          </Pressable>
          <Button
            left
            text='Įvertinti programėlę'
            onPress={() => {Linking.openURL('https://play.google.com/store/apps/details?id=com.mazekiu_muziejus')}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
