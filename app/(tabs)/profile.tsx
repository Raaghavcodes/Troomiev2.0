import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (e) {
          console.log("Error fetching user data", e);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.log("Error signing out", e);
    }
  };

  if (loading) {
     return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#FF5A5F" />
        </View>
     );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {userData ? (
        <View style={styles.infoContainer}>
          <Text style={styles.userInfo}>Name: {userData.name}</Text>
          <Text style={styles.userInfo}>Email: {userData.email}</Text>
          <Text style={styles.userInfo}>City: {userData.city}</Text>
          <Text style={styles.userInfo}>Age: {userData.age}</Text>
        </View>
      ) : (
        <Text style={styles.userInfo}>Profile not found.</Text>
      )}
      
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  infoContainer: { marginBottom: 32, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 24, color: '#333' },
  userInfo: { fontSize: 18, color: '#666', marginBottom: 8 },
  logoutBtn: { backgroundColor: '#FF5A5F', padding: 16, borderRadius: 8, width: 200, alignItems: 'center' },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
