import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Button } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaView>
        <Text>Hola mundo</Text>
        <Button icon="forward" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
      </SafeAreaView>
    </PaperProvider>
  );
}
export default App;
