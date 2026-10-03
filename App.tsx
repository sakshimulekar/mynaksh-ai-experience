/**
 * MyNaksh AI Conversation Experience
 * 
 * Root Application Component
 */

import React from 'react';
import { StatusBar, StyleSheet, View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ConversationScreen } from './src/screens/ConversationScreen';
import { colors } from './src/theme/colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.appContainer}>
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="Conversation" component={ConversationScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
