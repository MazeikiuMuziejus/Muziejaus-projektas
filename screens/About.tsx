import {View, Text, SafeAreaView, Pressable, ScrollView} from 'react-native';

import {InformationText} from '../components';

import {useDataContext} from '../contexts/dataContext';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// About screen

export default function About() {
  const context = useDataContext();
  const {updateData} = context; // get the function to update data

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#C3D3A4',
      }}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: '#C3D3A4',
        }}>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            justifyContent: 'flex-start',
          }}>
          <InformationText
            headerText="Šaltiniai:"
            text={['Mažeikių muziejaus archyvai']}
            img={[]}
          />
          <InformationText
            headerText="Nuotraukos:"
            text={[
              'Jonas Glodenis',
              'Vytautas Ramanauskas',
              'Tadas Dabulskis',
              'Gintarė Jonaitytė',
              'Redas Domkus',
            ]}
            img={[
              require('../assets/VizijaOptika.png'),
              require('../assets/MuziejausLogo.png'),
              require('../assets/MMRG.png'),
              require('../assets/MMRG.png'),
              require('../assets/MMRG.png'),
            ]}
          />
          <InformationText
            headerText="Dizainas:"
            text={['Oksana Iščenko']}
            img={[require('../assets/MMRG.png')]}
          />
          <InformationText
            headerText="Programavimas:"
            text={['Redas Domkus']}
            img={[require('../assets/MMRG.png')]}
          />
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 40,
            paddingBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Pressable
            style={{
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
            onPress={() => updateData()}>
            <Text
              allowFontScaling={false}
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#574031',
                textAlign: 'center',
                marginRight: 10,
              }}>
              Gauti naujausius duomenis
            </Text>
            <Icon name="refresh" size={25} color="#574031" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
