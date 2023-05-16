import {useState, useEffect} from 'react';

import {
  StreetList,
  StreetView,
  Main,
  Loading,
  ErrorConnecting,
  About,
} from './screens';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import { Header } from './components';

import { appData } from './types';

import { getData } from './API/getData';

const Stack = createStackNavigator();

function App() {
  const [data, setData] = useState<appData | null>(null);  // Data from the API
  const [loading, setLoading] = useState<boolean>(true);  // Whether the data is loading

  const [up, forceUpdate] = useState(0); // Used to force the component to rerender
  
  const update = () => {  // Forces the component to rerender and update the data
    forceUpdate(up + 1);
  }

  useEffect(() => {
    setLoading(true);
    getData() // Gets the data from the API
    .then((data) => {
      if (data)
        setData(data)
      setLoading(false);
    })
  }, [up])

  if (loading) return <Loading />;  // If the data is loading, show the loading screen
  if (!data) return <ErrorConnecting forceUpdate={update} />;   // If the data is not loaded, show the error screen

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          animationEnabled: true,
          headerShown: false,
        }}>
          <Stack.Screen
            name="Main"
            component={Main}
          />
          <Stack.Screen
            options={{
              headerShown: true, 
              header(props) {
                return (<Header navigation={props.navigation} text={'Istorinės vietos'} />);
              },
            }}
            name="StreetList"
            children={(props) => <StreetList navigation={props.navigation} data={data} />}
          />
          <Stack.Screen 
            name="Gatve" 
            component={StreetView} 
          />
          <Stack.Screen 
            name="About" 
            component={About} 
            options={{
              headerShown: true, 
              header(props) {
                return (<Header navigation={props.navigation} text={'Apie'} />);
              },
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
