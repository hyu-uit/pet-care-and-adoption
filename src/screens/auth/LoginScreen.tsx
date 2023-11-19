import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FONTS } from '../../config';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LoginScreen</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...FONTS.h1,
  },
});
