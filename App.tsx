import {useState, useEffect} from 'react';

import StreetList from './screens/StreetList';
import GatvesVaizdas from './screens/GatvesVaizdas';
import Main from './screens/Main';
import Loading from './screens/Loading';
import ErrorConnecting from './screens/ErrorConnecting';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Header from './components/Header';

import { streetData } from './types/streetData';

import { getData } from './API/getData';

const Stack = createStackNavigator();

function App() {
  const [data, setData] = useState<streetData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [up, forceUpdate] = useState(0);
  
  const update = () => {
    forceUpdate(up + 1);
  }

  useEffect(() => {
    setLoading(true);
    getData()
    .then((data) => {
      if (data) setData(data)
      setLoading(false);
    });
  }, [up])

  if (loading) return <Loading />;
  if (!data) return <ErrorConnecting forceUpdate={update} />;

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
                return (<Header navigation={props.navigation} data={data} text={'Mažeikių miesto gatvės'} />);
              },
            }}
            name="StreetList"
            children={(props) => <StreetList navigation={props.navigation} data={data} />}
          />
          <Stack.Screen name="Gatve" component={GatvesVaizdas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
