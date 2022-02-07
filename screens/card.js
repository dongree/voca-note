import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { theme } from '../color';
import { FontAwesome } from '@expo/vector-icons';
import CardModal from './modal/cardModal';

const Card = ({ cardData, cardKey, quizMode, deliverDelKey, editData }) => {
  const [cardModalVisible, setCardModalVisible] = useState(false);

  const handleCardModalVisible = visible => {
    setCardModalVisible(visible);
  };

  const handleDelete = key => {
    deliverDelKey(key);
  };

  const handleEdit = newData => {
    editData(newData, cardKey);
  };

  return (
    <View>
      <Pressable
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 4,
          padding: 7,
          borderRadius: 5,
          backgroundColor:
            cardData.difficulty === 'hard'
              ? quizMode
                ? theme.disabledHard
                : theme.hard
              : quizMode
              ? theme.disabledEasy
              : theme.easy,
        }}
        onPress={() => {
          setCardModalVisible(true);
        }}
        disabled={quizMode ? true : false}
      >
        <Text style={styles.cardText}>{cardData.word}</Text>

        <TouchableOpacity
          style={styles.cardBtn}
          onPress={() => handleDelete(cardKey)}
        >
          <FontAwesome name="remove" size={24} color="black" />
        </TouchableOpacity>
      </Pressable>

      <CardModal
        data={cardData}
        visible={cardModalVisible}
        changeVisible={handleCardModalVisible}
        editData={handleEdit}
      />
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardText: {
    fontSize: 20,
    color: theme.cardText,
  },

  cardBtn: {
    marginRight: 5,
  },
});
