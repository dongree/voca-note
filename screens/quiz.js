import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Quiz = ({ cards, finishQuiz }) => {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState();
  const [meaning, setMeaning] = useState();
  const [meaningVisible, setMeaningVisible] = useState(false);

  useEffect(() => {
    setWord(cards[index].word);
    setMeaning(cards[index].meaning);
  }, [index]);

  const handleIndex = () => {
    if (meaningVisible && index < cards.length - 1) {
      setIndex(index + 1);
    } else if (meaningVisible && index === cards.length - 1) {
      finishQuiz(false);
    }
    setMeaningVisible(!meaningVisible);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.number}>
        {index + 1}/{cards.length}
      </Text>
      <View style={styles.info}>
        <Text style={styles.cardWord}>{word}</Text>
        <Text style={styles.cardMeaning}>
          {meaningVisible ? meaning : '            '}
        </Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={handleIndex}>
        <Text style={styles.btnText}>
          {meaningVisible ? 'next word' : '확인하기'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'tomato',
    borderRadius: 10,
    width: '100%',
    height: '100%',
    padding: 20,
  },

  number: {
    fontSize: 30,
  },
  info: {
    alignItems: 'center',
  },
  cardWord: {
    fontSize: 60,
    marginBottom: 40,
  },
  cardMeaning: {
    fontSize: 50,
    backgroundColor: 'white',
  },
  btn: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
  },
});
