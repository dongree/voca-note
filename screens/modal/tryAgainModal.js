import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { theme } from '../../color';

const TryAgainModal = ({ visible, changeVisible }) => {
  const handleVisible = v => {
    changeVisible(v);
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
        <View style={styles.tryAgainModalView}>
          <Text style={styles.title}>Try again</Text>
          <Text style={styles.info}>
            There's no file in the folder you chose.
          </Text>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => handleVisible(!visible)}
            >
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TryAgainModal;

const styles = StyleSheet.create({
  tryAgainModalView: {
    margin: 20,
    backgroundColor: theme.tryAgainModallBg,
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
    alignItems: 'flex-end',
  },

  btn: {
    borderRadius: 20,
    marginRight: 3,
    padding: 10,
    backgroundColor: theme.tryAgainModalBtn,
  },

  btnText: {
    fontSize: 15,
    color: theme.tryAgainModalBtnText,
  },
});
