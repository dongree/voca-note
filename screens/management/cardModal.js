import React from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';

const CardModal = ({ data, visible, changeVisible }) => {
  const handleVisible = v => {
    changeVisible(v);
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
        <View style={styles.cardModalView}>
          <View>
            <Text style={styles.cardWord}>{data.word}</Text>
            <Text style={styles.cardMeaning}>{data.meaning}</Text>
            <Text style={styles.cardExample}>ex | {data.example}</Text>
          </View>
          <View style={styles.cardModalBtns}>
            <TouchableOpacity
              style={styles.cardModalBtn}
              onPress={() => createSomething()}
            >
              <Text style={styles.cardModalBtnText}>Fix</Text>
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
    backgroundColor: 'tomato',
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
  },

  cardMeaning: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  cardExample: {
    fontSize: 18,
    fontWeight: 'bold',
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
    backgroundColor: 'orange',
  },

  cardModalBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
