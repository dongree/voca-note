import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Quiz = ({ cards, finishQuiz, hide }) => {
  const [index, setIndex] = useState(0);
  const [word, setWord] = useState();
  const [meaning, setMeaning] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setWord(cards[index].word);
    setMeaning(cards[index].meaning);
  }, [index]);

  const handleIndex = () => {
    if (visible && index < cards.length - 1) {
      setIndex(index + 1);
    } else if (visible && index === cards.length - 1) {
      finishQuiz(false);
    }
    setVisible(!visible);
  };
  return (
    <View style={styles.card}>
      <Text style={styles.number}>
        {index + 1}/{cards.length}
      </Text>
      {hide ? (
        <View style={styles.info}>
          <Text style={styles.unhidden}>{word}</Text>
          <Text style={styles.hidden}>
            {visible ? meaning : '            '}
          </Text>
        </View>
      ) : (
        <View style={styles.info}>
          <Text style={styles.hidden}>{visible ? word : '            '}</Text>
          <Text style={styles.unhidden}>{meaning}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.btn} onPress={handleIndex}>
        <Text style={styles.btnText}>{visible ? 'next word' : '확인하기'}</Text>
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
  unhidden: {
    fontSize: 60,
  },
  hidden: {
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
