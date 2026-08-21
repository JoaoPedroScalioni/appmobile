import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { Container } from '../../../src/factories/Container';
import { Observation } from '../../../src/domain/entities/observation';

export default function List() {
  const [observations, setObservations] = useState<Observation[]>([]);

  // useFocusEffect faz com que a lista seja atualizada toda vez que o usuário abre a aba
  useFocusEffect(
    useCallback(() => {
      async function fetchObservations() {
        const container = Container.getInstance();
        const data = await container.listObservations.execute();
        setObservations(data);
      }
      fetchObservations();
    }, [])
  );

  const renderItem = ({ item }: { item: Observation }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>ID: {item.id.substring(0, 8)}</Text>
        <Text style={styles.coord}>Lat: {item.coordinates.latitude.toFixed(4)}</Text>
        <Text style={styles.coord}>Lng: {item.coordinates.longitude.toFixed(4)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={observations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma observação salva ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  coord: {
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  }
});
