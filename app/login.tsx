import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigation is handled by onAuthStateChanged in RootLayout
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Troomie</Text>
        <Text style={styles.subtitle}>Find your perfect housemate</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotBtn} onPress={() => Alert.alert("Reset Password", "Coming soon")}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  innerContainer: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 42, fontWeight: 'bold', color: '#FF5A5F', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 48 },
  input: { backgroundColor: '#F5F5F5', padding: 16, borderRadius: 8, marginBottom: 16, fontSize: 16 },
  forgotBtn: { alignItems: 'flex-end', marginBottom: 32 },
  forgotText: { color: '#FF5A5F', fontWeight: '600' },
  loginBtn: { backgroundColor: '#FF5A5F', padding: 16, borderRadius: 8, alignItems: 'center', marginBottom: 24 },
  loginText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { color: '#666', fontSize: 16 },
  signupLink: { color: '#FF5A5F', fontSize: 16, fontWeight: 'bold' },
});
