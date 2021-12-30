import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const Quiz = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Random Quiz</Text>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackBtnText}>Go back</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  goBackBtn: {
    backgroundColor: '#f5b342',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  goBackBtnText: {
    fontSize: 15,
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
