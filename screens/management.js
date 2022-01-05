import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from '@expo/vector-icons';

const Management = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('file');
  const [cards, setCard] = useState({
    1: {
      type: 'file',
      word: 'apple',
      meaning: '사과',
      example: 'I have an apple',
    },
    2: {
      type: 'file',
      word: 'banana',
      meaning: '바나나',
      example: 'I like to eat banana',
    },
    3: {
      type: 'folder',
      name: 'animals',
      datas: {
        5: {
          type: 'file',
          word: 'lion',
          meaning: '사자',
          example: 'My favorite animal is a lion',
        },
        6: {
          type: 'file',
          word: 'tiger',
          meaning: '호랑이',
          example: 'A tiger is rouring',
        },
        7: {
          type: 'folder',
          name: 'birds',
          datas: {
            8: {
              type: 'file',
              word: 'eagle',
              meaning: '독수리',
              example: 'eagles soaring overhead',
            },
            9: {
              type: 'file',
              word: 'sparrow',
              meaning: '참새',
              example: 'Sparrows are chirping',
            },
          },
        },
      },
    },
    4: {
      type: 'file',
      word: 'consider',
      meaning: '고려하다, ~로 여기다',
      example: 'She considered her options.',
    },
    10: {
      type: 'folder',
      name: 'good place',
      datas: {
        12: {
          type: 'file',
          word: 'good',
          meaning: '좋은',
          example: 'good job',
        },
        13: {
          type: 'file',
          word: 'place',
          meaning: '장소',
          example: 'There are good place and bad place afterlife',
        },
      },
    },
  });
  const [scrollviewData, setScrollviewData] = useState(cards);
  const [backCount, setBackCount] = useState(0);
  const [preDatas, setPreDatas] = useState([cards]);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [cardModalData, setCardModalData] = useState({});
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [example, setExample] = useState('');

  const showCard = card => {
    setCardModalData({
      word: card.word,
      meaning: card.meaning,
      example: card.example,
    });
    setCardModalVisible(true);
  };

  const createSomething = () => {};
  const onChangeWord = () => {};
  const onChangeMeaning = () => {};
  const onChangeExample = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Card management</Text>
        <TouchableOpacity
          style={styles.goBackBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackBtnText}>Go back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.cards}>
        {Object.keys(scrollviewData).map(key =>
          scrollviewData[key].type === 'file' ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              key={key}
              onPress={() => showCard(scrollviewData[key])}
            >
              <Text style={styles.cardText}>{scrollviewData[key].word}</Text>
              <View style={styles.cardBtns}>
                <TouchableOpacity style={styles.cardBtn}>
                  <FontAwesome name="pencil" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.cardBtn}>
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
              // onPress={() => console.log(cards[key].datas)}
              onPress={() => {
                const newPreDatas = preDatas;
                newPreDatas.push(scrollviewData);
                setPreDatas(newPreDatas);
                setScrollviewData(scrollviewData[key].datas);
                setBackCount(backCount + 1);
              }}
            >
              <Text style={styles.folderText}>{scrollviewData[key].name}</Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome name="plus" size={30} color="white" />
      </TouchableOpacity>

      {backCount !== 0 ? (
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            setBackCount(backCount - 1);
            const newPreDatas = preDatas;
            setScrollviewData(newPreDatas.pop());
            setPreDatas(newPreDatas);
          }}
        >
          <FontAwesome name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
      ) : null}

      {/* card modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={cardModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setCardModalVisible(!cardModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.cardModalView}>
            <View>
              <Text style={styles.cardWord}>{cardModalData.word}</Text>
              <Text style={styles.cardMeaning}>{cardModalData.meaning}</Text>
              <Text style={styles.cardExample}>
                ex | {cardModalData.example}
              </Text>
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
                onPress={() => setCardModalVisible(!cardModalVisible)}
              >
                <Text style={styles.cardModalBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* add modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Create card or folder</Text>
            <Picker
              selectedValue={selectedType}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedType(itemValue)
              }
            >
              <Picker.Item label="file" value="file" />
              <Picker.Item label="folder" value="folder" />
            </Picker>
            {selectedType === 'file' ? (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeWord}
                  value={word}
                  placeholder="word"
                ></TextInput>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeMeaning}
                  value={meaning}
                  placeholder="meaning"
                ></TextInput>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeExample}
                  value={example}
                  placeholder="example"
                ></TextInput>
              </View>
            ) : (
              <View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeWord}
                  value={word}
                  placeholder="name"
                ></TextInput>
              </View>
            )}

            <View style={styles.modalBtns}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => createSomething()}
              >
                <Text style={styles.modalBtnText}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.modalBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Management;

const styles = StyleSheet.create({
  // management screen
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

  goBackBtn: {
    backgroundColor: '#f5b342',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  goBackBtnText: {
    fontSize: 15,
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
    alignItems: 'center',
    margin: 5,
    padding: 7,
    borderRadius: 10,
  },

  folderText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#bd6128',
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  modalBtns: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalBtn: {
    borderRadius: 20,
    marginRight: 3,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },

  modalBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input: {
    backgroundColor: 'white',
    padding: 9,
    marginBottom: 15,
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#4f4f4f',
    borderStyle: 'solid',
  },

  // card modal
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
