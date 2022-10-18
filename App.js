/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  Button,
  StatusBar,
  Text,
} from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import SelectedGoalItem from './components/SelectedGoalItem';

const App = () => {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);
  const [selectedCourseGoals, setSelectedCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endddGoalHandler = () => {
    setModalIsVisible(false);
  };

  const addGoalHandler = enteredGoalText => {
    setCourseGoals(currentCourseGoal => [
      ...currentCourseGoal,
      {text: enteredGoalText, id: Math.random().toString()},
    ]);

    endddGoalHandler();
  };

  const selectedGoalHandler = id => {
    const newSelected = courseGoals.filter(goal => goal.id === id);

    const toAdd = {
      id: newSelected[0].id,
      text: newSelected[0].text,
    };

    setSelectedCourseGoals(currentSelected => [
      ...currentSelected,
      {text: toAdd.text, id: toAdd.id},
    ]);

    deleteGoalHandler(id);
    console.log(selectedCourseGoals);
  };

  const deleteGoalHandler = id => {
    console.log(id);
    setCourseGoals(currentCourseGoal => {
      return currentCourseGoal.filter(goal => goal.id !== id);
    });
  };

  const deleteSelectedGoalHandler = id => {
    setSelectedCourseGoals(currentCourseGoal => {
      return currentCourseGoal.filter(goal => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <View style={styles.goaltitle}>
            <Text style={styles.titleText}>New Item</Text>
          </View>
          <FlatList
            data={courseGoals}
            renderItem={itemData => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={selectedGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
        <View style={styles.goalsContainer}>
          <View style={styles.goaltitle}>
            <Text style={styles.titleText}>Seleted Item</Text>
          </View>
          <FlatList
            data={selectedCourseGoals}
            renderItem={items => {
              return (
                <SelectedGoalItem
                  text={items.item.text}
                  id={items.item.id}
                  onDeleteItem={deleteSelectedGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a',
  },
  goalsContainer: {
    flex: 2,
  },
  goaltitle: {
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default App;
