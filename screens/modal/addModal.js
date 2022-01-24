import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { theme } from '../../color';

const AddModal = ({ visible, changeVisible, createData }) => {
  const [selectedType, setSelectedType] = useState('file');
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');

  const [folderName, setFolderName] = useState('');

  const cleanTextInput = () => {
    setWord('');
    setMeaning('');
    setExample('');
    setFolderName('');
  };

  const handleVisible = v => {
    changeVisible(v);
    cleanTextInput();
  };

  const handlePicker = (itemValue, itemIndex) => {
    setSelectedType(itemValue);
    cleanTextInput();
  };

  const handleCreate = () => {
    createData(selectedType, word, meaning, example, folderName);
    handleVisible(!visible);
    cleanTextInput();
  };

  const handleWord = e => setWord(e);
  const handleMeaning = e => setMeaning(e);
  const handleExample = e => setExample(e);
  const handleFolderName = e => setFolderName(e);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handleVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.addModalView}>
          <Text style={styles.addModalTitle}>Create card or folder</Text>
          <Picker
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) =>
              handlePicker(itemValue, itemIndex)
            }
          >
            <Picker.Item label="file" value="file" />
            <Picker.Item label="folder" value="folder" />
          </Picker>
          {selectedType === 'file' ? (
            <View>
              <TextInput
                style={styles.input}
                onChangeText={handleWord}
                value={word}
                placeholder="word"
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={handleMeaning}
                value={meaning}
                placeholder="meaning"
              ></TextInput>
              <TextInput
                style={styles.input}
                onChangeText={handleExample}
                value={example}
                placeholder="example"
              ></TextInput>
            </View>
          ) : (
            <View>
              <TextInput
                style={styles.input}
                onChangeText={handleFolderName}
                value={folderName}
                placeholder="name"
              ></TextInput>
            </View>
          )}

          <View style={styles.addModalBtns}>
            <TouchableOpacity
              style={styles.addModalBtn}
              onPress={() => handleCreate()}
            >
              <Text style={styles.addModalBtnText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addModalBtn}
              onPress={() => handleVisible(!visible)}
            >
              <Text style={styles.addModalBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalView: {
    margin: 20,
    backgroundColor: theme.addModalBg,
    borderRadius: 20,
    padding: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  addModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  addModalBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addModalBtn: {
    borderRadius: 20,
    marginRight: 3,
    padding: 10,
    elevation: 2,
    backgroundColor: theme.addModalBtn,
  },

  addModalBtnText: {
    color: theme.addModalBtnText,
    fontWeight: 'bold',
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
