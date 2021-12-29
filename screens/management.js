import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Management = ({ navigation }) => {
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
        <View style={styles.card}>
          <Text style={styles.cardText}>Apple</Text>
          <View style={styles.cardBtns}>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Banana</Text>
          <View style={styles.cardBtns}>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Melon</Text>
          <View style={styles.cardBtns}>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardBtn}>
              <FontAwesome name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    margin: 3,
    padding: 7,
    borderRadius: 10,
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
});
