import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { theme } from '../color';
import { FontAwesome } from '@expo/vector-icons';
import ChoiceModal from './modal/chocieModal';

const Folder = ({
  folderKey,
  preKeys,
  name,
  savePrekeys,
  quizMode,
  whatHide,
  deliverDelKey,
}) => {
  const [choiceModalVisible, setChoiceModalVisible] = useState(false);

  const handleChoiceModalVisible = visible => {
    setChoiceModalVisible(visible);
  };

  const selectQuizFolder = () => {
    if (quizMode) {
      setChoiceModalVisible(true);
    }
  };

  const handlePreKeys = () => {
    const newPreKeys = preKeys;
    newPreKeys.push(Number(folderKey));
    savePrekeys(newPreKeys);
  };

  const handleWhatHide = s => {
    whatHide(s, folderKey);
  };

  const handleDelete = key => {
    deliverDelKey(key);
  };

  return (
    <View>
      <Pressable
        style={styles.folder}
        onPress={() => handlePreKeys()}
        onLongPress={() => selectQuizFolder(folderKey)}
      >
        <Text style={styles.folderText}>{name}</Text>
        <TouchableOpacity
          style={styles.folderBtn}
          onPress={() => handleDelete(folderKey)}
        >
          <FontAwesome name="remove" size={24} color="black" />
        </TouchableOpacity>
      </Pressable>

      <ChoiceModal
        visible={choiceModalVisible}
        changeVisible={handleChoiceModalVisible}
        whatHide={handleWhatHide}
      />
    </View>
  );
};

export default Folder;

const styles = StyleSheet.create({
  folder: {
    backgroundColor: theme.folder,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4,
    padding: 7,
    borderRadius: 10,
  },

  folderBtn: {
    marginRight: 5,
  },

  folderText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: theme.brown,
    color: theme.folderText,
  },
});
