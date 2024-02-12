import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';
import * as Location from 'expo-location'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Map from './screens/Map';
import Settings from './screens/Settings';

const settings = {
  backgroundColor: '#00a484'
};

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
};


export default function App() {
  const Stack = createNativeStackNavigator();

  const [icon, setIcon] = useState(icons.location_not_known);
  const [mapType, setMapType] = useState('standard');
  const [location, setLocation] = useState({
    latitude: 60.0000,
    longitude: 20.0000,
    latitudeDelta: 0.1000,
    longitudeDelta: 0.0000
  });

  const getUserPosition = async () => {
    setIcon(icons.location_searching);
    let { status } = await Location.requestForegroundPermissionsAsync();

    try {
      if (status !== 'granted') {
        console.log('Geolocation failed');
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });

      setLocation({
        ...location,
        "latitude": position.coords.latitude,
        "longitude": position.coords.longitude
      });

      setIcon(icons.location_found);
    }
    catch (error) {
      console.log(error);
      setIcon(icons.location_not_known);
    }
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Map'
          screenOptions={{
            header: (props) =>
              <MainAppBar {...props}
                title="Map"
                backgroundColor={settings.backgroundColor}
                icon={icon}
                getUserPosition={getUserPosition}
              />
          }}
        >
          <Stack.Screen name='Map'>
            {() =>
              <Map
                location={location}
                mapType={mapType}
              />
            }
          </Stack.Screen>
          <Stack.Screen name='Settings'>
            {() =>
              <Settings
                backgroundColor={settings.backgroundColor}
                mapType={mapType}
                setMapType={setMapType}
              />
            }
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0
  },
});
