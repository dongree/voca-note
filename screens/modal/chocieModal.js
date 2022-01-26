import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { theme } from '../../color';

const ChoiceModal = ({ visible, changeVisible, whatHide }) => {
  const handleVisible = v => {
    changeVisible(v);
  };

  const selectMeaning = () => {
    handleVisible(!visible);
    whatHide(true);
  };

  const selectWord = () => {
    handleVisible(!visible);
    whatHide(false);
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handleVisible(!visible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.ChoiceModalView}>
          <Text style={styles.title}>Choice</Text>
          <Text style={styles.info}>
            What do you want to hide between meanings and words?
          </Text>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => selectMeaning()}
            >
              <Text style={styles.btnText}>MEANING</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => selectWord()}>
              <Text style={styles.btnText}>WORD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChoiceModal;

const styles = StyleSheet.create({
  ChoiceModalView: {
    margin: 20,
    backgroundColor: theme.choiceModallBg,
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

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  info: {
    fontSize: 15,
    marginVertical: 10,
  },

  btns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  btn: {
    borderRadius: 20,
    marginRight: 3,
    padding: 10,
    backgroundColor: theme.choiceModalBtn,
  },

  btnText: {
    fontSize: 15,
    color: theme.choiceModalBtnText,
  },
});
