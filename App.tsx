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

import { useDataContext } from './contexts/dataContext';

const Stack = createStackNavigator();

function App() {
  const {updateData, loading, error} = useDataContext();

  if (loading) return <Loading />;  // If the data is loading, show the loading screen
  if (error) return <ErrorConnecting forceUpdate={updateData} />;   // If the data is not loaded, show the error screen

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
            children={(props) => <StreetList navigation={props.navigation}/>}
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
