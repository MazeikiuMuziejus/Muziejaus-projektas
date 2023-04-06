import StreetList from './screens/StreetList';
import GatvesVaizdas from './screens/GatvesVaizdas';
import Main from './screens/Main';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          animationEnabled: false,
          headerShown: false,
        }}>
          <Stack.Screen
            name="Main"
            component={Main}
          />
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: 'Mažeikių miesto gatvės',
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            },
            headerStyle: {
              borderBottomColor: 'black',
              borderBottomWidth: 0.5,
            },
          }}
          name="StreetList"
          component={StreetList}
        />
        <Stack.Screen name="Gatve" component={GatvesVaizdas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
