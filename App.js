import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { ThemeProvider } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as AdProvider } from './src/context/AdContext';
import { Provider as MessageProvider } from './src/context/MessageContext';
import { Provider as SystemMessageProvider } from './src/context/SystemMessageContext';
import AppContainer from './src/routes/Routes';
import { navigationRef } from './src/routes/RootNavigation';
import { styles } from './src/styles/styles';

const fetchFonts = () => {
  return Font.loadAsync({
    dosis: require('./assets/fonts/Dosis-Medium.otf'),
    'dosis-bold': require('./assets/fonts/Dosis-Bold.otf'),
    'dosis-regular': require('./assets/fonts/Dosis-Regular.otf'),
    patrick: require('./assets/fonts/PatrickHandSC-Regular.ttf'),
    quicksand: require('./assets/fonts/Quicksand-Regular.ttf'),
    'quicksand-bold': require('./assets/fonts/Quicksand-Bold.ttf')
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
      />
    );
  }
  try {
    return (
      <ThemeProvider theme={styles}>
        <SafeAreaView style={styles.container}>
          <AuthProvider>
            <SystemMessageProvider>
              <AdProvider>
                <MessageProvider>
                  <NavigationContainer ref={navigationRef}>
                    <AppContainer />
                  </NavigationContainer>
                </MessageProvider>
              </AdProvider>
            </SystemMessageProvider>
          </AuthProvider>
        </SafeAreaView>
      </ThemeProvider>
    );
  } catch (err) {
    return (
      <View>
        <Text>{err}</Text>
      </View>
    );
  }
};
export default App;
