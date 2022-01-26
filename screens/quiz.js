import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { theme } from '../color';

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
          {visible ? (
            <Text style={styles.unhidden}>{meaning}</Text>
          ) : (
            <Text style={styles.hidden}>{'            '}</Text>
          )}
        </View>
      ) : (
        <View style={styles.info}>
          {visible ? (
            <Text style={styles.unhidden}>{word}</Text>
          ) : (
            <Text style={styles.hidden}>{'            '}</Text>
          )}
          <Text style={styles.unhidden}>{meaning}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.btn} onPress={handleIndex}>
        <Text style={styles.btnText}>
          {visible ? (index === cards.length - 1 ? 'End' : 'Next') : 'Check'}
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
    backgroundColor: theme.card,
    borderRadius: 10,
    width: '100%',
    height: '100%',
    padding: 20,
  },
  number: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  info: {
    alignItems: 'center',
  },
  unhidden: {
    fontSize: 60,
  },
  hidden: {
    fontSize: 60,
    backgroundColor: theme.hidden,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: theme.btn,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: theme.btnText,
  },
});
