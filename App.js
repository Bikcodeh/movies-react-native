import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './src/navigation/Navigation';



const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
}
export default App;
