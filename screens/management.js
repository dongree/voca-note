import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

const Management = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('file');
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');

  const createSomething = () => {};
  const onChangeWord = () => {};
  const onChangeMeaning = () => {};
  const onChangeExample = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Card management</Text>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackBtnText}>Go back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Apple</Text>
          <View style={styles.cardBtns}>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Banana</Text>
          <View style={styles.cardBtns}>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Melon</Text>
          <View style={styles.cardBtns}>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus" size={30} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create card or folder</Text>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedType(itemValue)
              }
            >
              <Picker.Item label="file" value="file" />
              <Picker.Item label="folder" value="folder" />
            </Picker>
            {selectedType === 'file' ? (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeWord}
                  value={word}
                  placeholder="word"
                ></TextInput>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeMeaning}
                  value={meaning}
                  placeholder="meaning"
                ></TextInput>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeExample}
                  value={example}
                  placeholder="example"
                ></TextInput>
              </View>
            ) : (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeWord}
                  value={word}
                  placeholder="name"
                ></TextInput>
              </View>
            )}

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => createSomething()}
              >
                <Text style={styles.modalBtnText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Management;

const styles = StyleSheet.create({
  // management screen
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

  cards: {
    backgroundColor: 'white',
    borderRadius: 10,
  },

  card: {
    backgroundColor: 'tomato',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 3,
    padding: 7,
    borderRadius: 10,
  },

  cardText: {
    fontSize: 20,
  },

  cardBtns: {
    flexDirection: 'row',
  },

  cardBtn: {
    marginRight: 5,
  },

  addBtn: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    right: 40,
    bottom: 40,
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: 300,
    height: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  modalBtns: {
    flexDirection: 'row',
  },
  modalBtn: {
    borderRadius: 20,
    marginRight: 3,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },

  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 9,
    marginBottom: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#4f4f4f',
    borderStyle: 'solid',
  },
});
