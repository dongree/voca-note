import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../color';
import CardModal from './modal/cardModal';
import AddModal from './modal/addModal';
import Quiz from './quiz';

const STORAGE_KEY = '@Data';

const Main = () => {
  const [datas, setDatas] = useState({});

  const [backCount, setBackCount] = useState(0);
  const [preKeys, setPrekeys] = useState([0]);

  // add modal
  const [addModalVisible, setAddModalVisible] = useState(false);

  // card modal
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [cardModalData, setCardModalData] = useState({});
  const [cardModalKey, setCardModalKey] = useState();

  const [quizMode, setQuizMode] = useState(false);
  const [quizStart, setQuizStart] = useState(false);

  const [quizCards, setQuizCards] = useState([]);

  const [whatToHide, setWhatToHide] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

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

  const saveData = async data => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const loadData = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      if (s) {
        setDatas(JSON.parse(s));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreate = async (type, word, meaning, example, name) => {
    const newData = {
      ...datas,
      [Date.now()]:
        type === 'file'
          ? { type, word, meaning, example, vKey: preKeys[preKeys.length - 1] }
          : { type, name, datas: {}, vKey: preKeys[preKeys.length - 1] },
    };
    setDatas(newData);
    await saveData(newData);
  };

  const deleteCard = key => {
    if (!quizMode) {
      Alert.alert('Delete Card', 'Are you sure?', [
        { text: 'Cancel' },
        {
          text: "I'm Sure",
          onPress: () => {
            const newData = { ...datas };
            delete newData[key];
            setDatas(newData);
            saveData(newData);
          },
        },
      ]);
    }
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
    if (!quizMode) {
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
    }
  };

  const handleEdit = editData => {
    const newData = { ...datas, [cardModalKey]: editData };
    setDatas(newData);
  };

  const handleQuizMode = () => {
    if (!quizMode) {
      Alert.alert(
        'Qize Mode',
        'Long press a folder you want to quiz and then start the quiz.',
        [{ text: 'OK' }]
      );
    }
    if (quizStart) {
      setQuizStart(!quizStart);
    }
    setQuizMode(!quizMode);
  };

  const shuffle = array => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const selectQuizFolder = folderKey => {
    if (quizMode) {
      Alert.alert(
        'Choice',
        'What do you want to hide between meanings and words?',
        [
          {
            text: 'Meaning',
            onPress: () => {
              setWhatToHide(true);
              const newQuizCards = [];
              Object.keys(datas).map(key => {
                if (
                  datas[key].vKey === Number(folderKey) &&
                  datas[key].type === 'file'
                ) {
                  newQuizCards.push(datas[key]);
                }
              });
              if (newQuizCards.length !== 0) {
                setQuizCards(shuffle(newQuizCards));
                setQuizStart(true);
              } else {
                Alert.alert(
                  'Try again',
                  "There's no file in the folder you chose.",
                  [{ text: 'OK' }]
                );
              }
            },
          },

          {
            text: 'Word',
            onPress: () => {
              setWhatToHide(false);
              const newQuizCards = [];
              Object.keys(datas).map(key => {
                if (
                  datas[key].vKey === Number(folderKey) &&
                  datas[key].type === 'file'
                ) {
                  newQuizCards.push(datas[key]);
                }
              });
              if (newQuizCards.length !== 0) {
                setQuizCards(shuffle(newQuizCards));
                setQuizStart(true);
              } else {
                Alert.alert(
                  'Try again',
                  "The folder you choosen doesn't have files",
                  [{ text: 'OK' }]
                );
              }
            },
          },
        ]
      );
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: quizMode ? theme.QuizBg : theme.ManagementBg,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {quizMode ? 'Random Quiz' : 'Card management'}
        </Text>
        <TouchableOpacity
          style={styles.qizeBtn}
          onPress={() => handleQuizMode()}
        >
          <Text style={styles.qizeBtnText}>{quizMode ? 'Exit' : 'Quiz'}</Text>
        </TouchableOpacity>
      </View>
      {!quizStart ? (
        <ScrollView style={styles.cards}>
          {Object.keys(datas).map(key =>
            datas[key].vKey === preKeys[preKeys.length - 1] ? (
              datas[key].type === 'file' ? (
                <Pressable
                  style={{
                    ...styles.card,
                    backgroundColor: quizMode ? theme.disabledFile : theme.file,
                  }}
                  key={key}
                  onPress={() => showCard(datas[key], key)}
                  disabled={quizMode ? true : false}
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
                </Pressable>
              ) : (
                // folder
                <Pressable
                  style={styles.folder}
                  key={key}
                  onPress={() => {
                    const newPreKeys = preKeys;
                    newPreKeys.push(Number(key));
                    setPrekeys(newPreKeys);
                    setBackCount(backCount + 1);
                  }}
                  onLongPress={() => selectQuizFolder(key)}
                >
                  <Text style={styles.folderText}>{datas[key].name}</Text>
                  <TouchableOpacity
                    style={styles.folderBtn}
                    onPress={() => deleteFolder(key)}
                  >
                    <FontAwesome name="remove" size={24} color="black" />
                  </TouchableOpacity>
                </Pressable>
              )
            ) : null
          )}
        </ScrollView>
      ) : (
        <Quiz
          cards={quizCards}
          finishQuiz={end => {
            setQuizStart(end);
            setQuizMode(end);
          }}
          hide={whatToHide}
        />
      )}

      {!quizMode ? (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setAddModalVisible(true)}
        >
          <FontAwesome name="plus" size={30} color="white" />
        </TouchableOpacity>
      ) : null}

      {!quizStart && backCount !== 0 ? (
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

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: theme.titleText,
  },

  qizeBtn: {
    backgroundColor: theme.btn,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  qizeBtnText: {
    fontSize: 15,
    color: theme.btnText,
    fontWeight: 'bold',
  },

  cards: {
    backgroundColor: '#ededed',
    borderRadius: 10,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4,
    padding: 7,
    borderRadius: 5,
  },

  cardText: {
    fontSize: 20,
    color: theme.fileText,
  },

  cardBtns: {
    flexDirection: 'row',
  },

  cardBtn: {
    marginRight: 5,
  },

  addBtn: {
    position: 'absolute',
    backgroundColor: theme.absoluteBtn,
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
    backgroundColor: theme.absoluteBtn,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    left: 40,
    bottom: 40,
  },

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
