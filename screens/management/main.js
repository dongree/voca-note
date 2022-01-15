import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CardModal from './cardModal';
import AddModal from './addModal';

const Management = () => {
  const [datas, setDatas] = useState({
    1: {
      type: 'file',
      word: 'apple',
      meaning: '사과',
      example: 'I have an apple',
      vKey: 0,
    },
    2: {
      type: 'file',
      word: 'banana',
      meaning: '바나나',
      example: 'I like to eat banana',
      vKey: 0,
    },
    3: {
      type: 'folder',
      name: 'animal',
      vKey: 0,
    },
    4: {
      type: 'file',
      word: 'lion',
      meaning: '사자',
      example: 'I have an lion',
      vKey: 3,
    },
    5: {
      type: 'file',
      word: 'tiger',
      meaning: '호랑이',
      example: 'I like to eat banana',
      vKey: 3,
    },
    6: {
      type: 'folder',
      name: 'birds',
      vKey: 3,
    },
    7: {
      type: 'file',
      word: 'eagle',
      meaning: '독수리',
      example: 'I like to eat banana',
      vKey: 6,
    },
    8: {
      type: 'file',
      word: 'sparrow',
      meaning: '참새',
      example: 'I like to eat banana',
      vKey: 6,
    },
  });

  const [backCount, setBackCount] = useState(0);
  const [preKeys, setPrekeys] = useState([0]);

  // add modal
  const [addModalVisible, setAddModalVisible] = useState(false);

  // card modal
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [cardModalData, setCardModalData] = useState({});
  const [cardModalKey, setCardModalKey] = useState();

  const showCard = (card, key) => {
    setCardModalData({ ...card });
    setCardModalVisible(true);
    setCardModalKey(key);
  };

  const handleCardModalVisible = visible => {
    setCardModalVisible(visible);
  };

  const handleAddModalVisible = visible => {
    setAddModalVisible(visible);
  };

  const handleCreate = (type, word, meaning, example, name) => {
    const newData = {
      ...datas,
      [Date.now()]:
        type === 'file'
          ? { type, word, meaning, example, vKey: preKeys[preKeys.length - 1] }
          : { type, name, datas: {}, vKey: preKeys[preKeys.length - 1] },
    };
    setDatas(newData);
  };

  const deleteCard = key => {
    Alert.alert('Delete Card', 'Are you sure?', [
      { text: 'Cancel' },
      {
        text: "I'm Sure",
        onPress: () => {
          const newData = { ...datas };
          delete newData[key];
          setDatas(newData);
        },
      },
    ]);
  };

  const deleteIn = (newData, folderKey) => {
    Object.keys(newData).map(key => {
      if (datas[key].vKey === Number(folderKey)) {
        if (datas[key].type === 'folder') {
          const temp = newData;
          newData = deleteIn(temp, key);
        }
        delete newData[key];
      }
    });
    return newData;
  };

  const deleteFolder = folderKey => {
    Alert.alert(
      'Delete Folder',
      'If you delete this folder, all data in the folder will be deleted. Are you sure?',
      [
        { text: 'Cancel' },
        {
          text: "I'm Sure",
          onPress: () => {
            const newData = deleteIn({ ...datas }, folderKey);
            delete newData[folderKey];
            setDatas(newData);
          },
        },
      ]
    );
  };

  const handleEdit = editData => {
    const newData = { ...datas, [cardModalKey]: editData };
    setDatas(newData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Card management</Text>
      </View>
      <ScrollView style={styles.cards}>
        {Object.keys(datas).map(key =>
          datas[key].vKey === preKeys[preKeys.length - 1] ? (
            datas[key].type === 'file' ? (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.card}
                key={key}
                onPress={() => showCard(datas[key], key)}
              >
                <Text style={styles.cardText}>{datas[key].word}</Text>
                <View style={styles.cardBtns}>
                  <TouchableOpacity
                    style={styles.cardBtn}
                    onPress={() => deleteCard(key)}
                  >
                    <FontAwesome name="remove" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ) : (
              // folder
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.folder}
                key={key}
                onPress={() => {
                  const newPreKeys = preKeys;
                  newPreKeys.push(Number(key));
                  setPrekeys(newPreKeys);
                  setBackCount(backCount + 1);
                }}
              >
                <Text style={styles.folderText}>{datas[key].name}</Text>
                <TouchableOpacity
                  style={styles.folderBtn}
                  onPress={() => deleteFolder(key)}
                >
                  <FontAwesome name="remove" size={24} color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
            )
          ) : null
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setAddModalVisible(true)}
      >
        <FontAwesome name="plus" size={30} color="white" />
      </TouchableOpacity>

      {backCount !== 0 ? (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            setBackCount(backCount - 1);
            const newPreKeys = preKeys;
            newPreKeys.pop();
            setPrekeys(newPreKeys);
          }}
        >
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      ) : null}

      <CardModal
        data={cardModalData}
        visible={cardModalVisible}
        changeVisible={handleCardModalVisible}
        editData={handleEdit}
      />

      <AddModal
        visible={addModalVisible}
        changeVisible={handleAddModalVisible}
        createData={handleCreate}
      />
    </View>
  );
};

export default Management;

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

  cards: {
    backgroundColor: 'white',
    borderRadius: 10,
  },

  card: {
    backgroundColor: 'tomato',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 7,
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

  backBtn: {
    position: 'absolute',
    backgroundColor: 'black',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    left: 40,
    bottom: 40,
  },

  folder: {
    backgroundColor: 'orange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
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
    borderLeftColor: '#bd6128',
  },
});
