import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { theme } from '../../color';

const CardModal = ({ data, visible, changeVisible, editData }) => {
  const [editMode, setEditMode] = useState(false);
  const [word, setWord] = useState();
  const [meaning, setMeaning] = useState();
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setWord(data.word);
    setMeaning(data.meaning);
    if (data.difficulty === 'hard') {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [data]);

  const handleVisible = v => {
    changeVisible(v);
    if (editMode) {
      setEditMode(!editMode);
    }
  };

  const handleEdit = () => {
    if (editMode) {
      const newData = {
        type: 'file',
        word,
        meaning,
        vKey: data.vKey,
        difficulty: data.difficulty,
      };
      editData(newData);
    }
    setEditMode(!editMode);
  };

  const handleWord = e => setWord(e);
  const handleMeaning = e => setMeaning(e);

  const handleCheck = e => {
    const newData = {
      type: 'file',
      word,
      meaning,
      vKey: data.vKey,
      difficulty: e ? 'easy' : 'hard',
    };
    editData(newData);
    setChecked(e);
  };
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
        <View
          style={{
            margin: 20,
            backgroundColor:
              data.difficulty === 'hard' ? theme.hard : theme.easy,
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
          }}
        >
          <View style={styles.checkbox}>
            <Text style={styles.checkboxText}>Easy</Text>
            <Checkbox
              value={isChecked}
              onValueChange={handleCheck}
              color="black"
            />
          </View>

          {editMode ? (
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
            </View>
          ) : (
            <View>
              <Text style={styles.cardText}>{word}</Text>
              <Text style={styles.cardText}>{meaning}</Text>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkbox: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 7,
  },

  checkboxText: {
    marginRight: 5,
    fontWeight: 'bold',
  },

  cardText: {
    fontWeight: 'bold',
    marginBottom: 4,
    paddingLeft: 10,
    fontSize: 40,
  },

  input: {
    backgroundColor: theme.inputBg,
    marginBottom: 4,
    borderRadius: 20,
    paddingLeft: 10,
    fontSize: 40,
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
