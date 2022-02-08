import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../color';
import AddModal from './modal/addModal';
import Quiz from './quiz';
import QuizModeModal from './modal/quizModeModal';
import TryAgainModal from './modal/tryAgainModal';
import Card from './card';
import Folder from './folder';

const STORAGE_KEY = '@Data';

const Main = () => {
  const [datas, setDatas] = useState({});

  const [backCount, setBackCount] = useState(0);
  const [preKeys, setPrekeys] = useState([0]);

  // modals
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [quizModeModalVisible, setQuizModeModalVisible] = useState(false);
  const [tryAgainModalVisible, setTryAgainModalVisible] = useState(false);

  const [quizMode, setQuizMode] = useState(false);
  const [quizStart, setQuizStart] = useState(false);

  const [quizCards, setQuizCards] = useState([]);

  const [whatToHide, setWhatToHide] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const handleAddModalVisible = visible => {
    setAddModalVisible(visible);
  };

  const handleQuizModeModalVisible = visible => {
    setQuizModeModalVisible(visible);
  };

  const handleTryAgainModalVisible = visible => {
    setTryAgainModalVisible(visible);
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

  const handleCreate = (type, word, meaning, name, difficulty) => {
    setDatas(datas => {
      const newData = {
        ...datas,
        [Date.now()]:
          type === 'file'
            ? {
                type,
                word,
                meaning,
                vKey: preKeys[preKeys.length - 1],
                difficulty,
              }
            : { type, name, datas: {}, vKey: preKeys[preKeys.length - 1] },
      };
      saveData(newData);
      return newData;
    });
  };

  const deleteCard = key => {
    if (!quizMode) {
      if (Platform.OS === 'web') {
        const ok = confirm('Do you want to delete this card?');
        if (ok) {
          setDatas(datas => {
            const newData = { ...datas };
            delete newData[key];
            saveData(newData);
            return newData;
          });
        }
      } else {
        Alert.alert('Delete Card', 'Are you sure?', [
          { text: 'Cancel' },
          {
            text: "I'm Sure",
            onPress: () => {
              setDatas(datas => {
                const newData = { ...datas };
                delete newData[key];
                saveData(newData);
                return newData;
              });
            },
          },
        ]);
      }
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
      if (Platform.OS === 'web') {
        const ok = confirm('Do you want to delete this folder?');
        if (ok) {
          setDatas(datas => {
            const newData = deleteIn({ ...datas }, folderKey);
            delete newData[folderKey];
            saveData(newData);
            return newData;
          });
        }
      } else {
        Alert.alert(
          'Delete Folder',
          'If you delete this folder, all data in the folder will be deleted. Are you sure?',
          [
            { text: 'Cancel' },
            {
              text: "I'm Sure",
              onPress: () => {
                setDatas(datas => {
                  const newData = deleteIn({ ...datas }, folderKey);
                  delete newData[folderKey];
                  saveData(newData);
                  return newData;
                });
              },
            },
          ]
        );
      }
    }
  };

  const handleEdit = (editData, key) => {
    setDatas(datas => {
      const newData = { ...datas };
      newData[key] = editData;
      saveData(newData);
      return newData;
    });
  };

  const handleQuizMode = () => {
    if (!quizMode) {
      setQuizModeModalVisible(true);
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

  const handleWhatHide = (s, folderKey) => {
    setWhatToHide(s);
    const newQuizCards = [];
    Object.keys(datas).map(key => {
      if (datas[key].vKey === Number(folderKey) && datas[key].type === 'file') {
        newQuizCards.push(datas[key]);
      }
    });
    if (newQuizCards.length !== 0) {
      setQuizCards(shuffle(newQuizCards));
      setQuizStart(true);
    } else {
      setTryAgainModalVisible(true);
    }
  };

  const handlePreKeys = newPreKeys => {
    setPrekeys(newPreKeys);
    setBackCount(backCount + 1);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
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
                <Card
                  key={key}
                  cardKey={key}
                  cardData={datas[key]}
                  quizMode={quizMode}
                  deliverDelKey={deleteCard}
                  editData={handleEdit}
                />
              ) : (
                <Folder
                  key={key}
                  folderKey={key}
                  preKeys={preKeys}
                  name={datas[key].name}
                  savePrekeys={handlePreKeys}
                  quizMode={quizMode}
                  whatHide={handleWhatHide}
                  deliverDelKey={deleteFolder}
                />
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

      <AddModal
        visible={addModalVisible}
        changeVisible={handleAddModalVisible}
        createData={handleCreate}
      />

      <QuizModeModal
        visible={quizModeModalVisible}
        changeVisible={handleQuizModeModalVisible}
      />

      <TryAgainModal
        visible={tryAgainModalVisible}
        changeVisible={handleTryAgainModalVisible}
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
    fontSize: 28,
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
    backgroundColor: theme.cardBox,
    borderRadius: 10,
    borderWidth: 3,
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
});
