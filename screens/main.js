import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CardModal from './modal/cardModal';
import AddModal from './modal/addModal';
import Quiz from './quiz';

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
      example: 'I like tigers',
      vKey: 3,
    },
    12: {
      type: 'file',
      word: 'elephant',
      meaning: '코끼리',
      example: 'A big elephant',
      vKey: 3,
    },
    13: {
      type: 'file',
      word: 'dog',
      meaning: '개',
      example: 'My dog is so cute',
      vKey: 3,
    },
    14: {
      type: 'file',
      word: 'cat',
      meaning: '고양이',
      example: 'I like cats more than dogs',
      vKey: 3,
    },
    15: {
      type: 'file',
      word: 'cow',
      meaning: '소',
      example: 'Two cows',
      vKey: 3,
    },
    16: {
      type: 'file',
      word: 'sheep',
      meaning: '양',
      example: 'a flock of sheep',
      vKey: 3,
    },
    17: {
      type: 'file',
      word: 'horse',
      meaning: '말',
      example: 'I rode a horse yesterday',
      vKey: 3,
    },
    18: {
      type: 'file',
      word: 'donkey',
      meaning: '당나귀',
      example: 'I rode a donkey yesterday',
      vKey: 3,
    },
    19: {
      type: 'file',
      word: 'cheetah',
      meaning: '치타',
      example: 'Cheetahs are fast',
      vKey: 3,
    },
    20: {
      type: 'file',
      word: 'crocodile',
      meaning: '악어',
      example: "I'm scared of crocodiles",
      vKey: 3,
    },
    21: {
      type: 'file',
      word: 'camel',
      meaning: '낙타',
      example: 'two camels',
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

  const [quizMode, setQuizMode] = useState(false);
  const [quizStart, setQuizStart] = useState(false);

  const [quizCards, setQuizCards] = useState([]);

  const [whatToHide, setWhatToHide] = useState(true);

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
    if (!quizMode) {
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
        'What do you want to hide between words and meanings?',
        [
          {
            text: 'Word',
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
              setQuizCards(shuffle(newQuizCards));
              setQuizStart(true);
            },
          },

          {
            text: 'Meaning',
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
              setQuizCards(shuffle(newQuizCards));
              setQuizStart(true);
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
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
                    backgroundColor: quizMode ? '#993b29' : 'tomato',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  qizeBtn: {
    backgroundColor: '#f5b342',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  qizeBtnText: {
    fontSize: 15,
  },

  cards: {
    backgroundColor: 'white',
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
    borderLeftColor: '#bd6128',
  },
});
