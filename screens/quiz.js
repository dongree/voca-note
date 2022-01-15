import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Quiz = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Random Quiz</Text>
      </View>

      <ScrollView contentContainerStyle={styles.folders}>
        <View style={styles.folder}>
          <Text style={styles.folderText}>Goodplace1</Text>
        </View>
        <View style={styles.folder}>
          <Text style={styles.folderText}>Goodplace2</Text>
        </View>
        <View style={styles.folder}>
          <Text style={styles.folderText}>Goodplace3</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ff8e47',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  folders: {
    backgroundColor: 'white',
    borderRadius: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexGrow: 1,
  },

  folder: {
    backgroundColor: '#ffcb70',
    width: '48%',
    margin: 3,
    paddingHorizontal: 7,
    paddingVertical: 18,
    borderRadius: 10,
  },

  folderText: {
    fontSize: 18,
  },
});
