import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { theme } from '../../color';

const CardModal = ({ data, visible, changeVisible, editData }) => {
  const [editMode, setEditMode] = useState(false);
  const [word, setWord] = useState();
  const [meaning, setMeaning] = useState();
  const [example, setExample] = useState();

  useEffect(() => {
    setWord(data.word);
    setMeaning(data.meaning);
    setExample(data.example);
  }, [data]);

  const handleVisible = v => {
    changeVisible(v);
    if (editMode) {
      setEditMode(!editMode);
    }
  };

  const handleEdit = () => {
    if (editMode) {
      const newData = { type: 'file', word, meaning, example, vKey: data.vKey };
      editData(newData);
    }
    setEditMode(!editMode);
  };

  const handleWord = e => setWord(e);
  const handleMeaning = e => setMeaning(e);
  const handleExample = e => setExample(e);

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
        <View style={styles.cardModalView}>
          {editMode ? (
            <View>
              <TextInput
                style={{ ...styles.input, fontSize: 40 }}
                onChangeText={handleWord}
                value={word}
              ></TextInput>
              <TextInput
                style={{ ...styles.input, fontSize: 20 }}
                onChangeText={handleMeaning}
                value={meaning}
              ></TextInput>
              <TextInput
                style={{ ...styles.input, fontSize: 18 }}
                onChangeText={handleExample}
                value={example}
              ></TextInput>
            </View>
          ) : (
            <View>
              <Text style={styles.cardWord}>{word}</Text>
              <Text style={styles.cardMeaning}>{meaning}</Text>
              <Text style={styles.cardExample}>ex | {example}</Text>
            </View>
          )}

          <View style={styles.cardModalBtns}>
            <TouchableOpacity
              style={styles.cardModalBtn}
              onPress={() => handleEdit()}
            >
              <Text style={styles.cardModalBtnText}>
                {editMode ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardModalBtn}
              onPress={() => handleVisible(!visible)}
            >
              <Text style={styles.cardModalBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CardModal;

const styles = StyleSheet.create({
  cardModalView: {
    margin: 20,
    backgroundColor: theme.cardModalBg,
    borderRadius: 5,
    padding: 20,
    width: 350,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardWord: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  cardMeaning: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  cardExample: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },

  input: {
    backgroundColor: theme.inputBg,
    marginBottom: 4,
    borderRadius: 20,
    paddingLeft: 10,
  },

  cardModalBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cardModalBtn: {
    borderRadius: 20,
    marginRight: 3,
    padding: 10,
    elevation: 2,
    backgroundColor: theme.cardModalBtn,
  },

  cardModalBtnText: {
    color: theme.cardModalBtnText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
