import { View, Text, StyleSheet } from 'react-native';

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
      <Text>Users who mutually liked you will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 }
});
