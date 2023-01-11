import React, { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Keyboard,
  Animated,
  ToastAndroid,
} from 'react-native';
import { colors } from '../shared/Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const TodoModal = ({ list, closeModal, updateListFunc }) => {
  const [state, setState] = useState('');
  const [stateOfTodo, setStateOfTodo] = useState(false);
  const [todoName, setTodoName] = useState('')
  const [name, setName] = useState('')

  const showUpdateTodoForm = (title) => {
    setStateOfTodo(true)
    setTodoName(title)
    setName(title)
  }

  const toggleTodoCompleted = (index) => {
    const listTodo = list
    listTodo.todos[index].completed = !listTodo.todos[index].completed;
    updateListFunc(listTodo)
  }
  const addTodo = () => {
    let newList = list

    if (!newList.todos.some(todo => todo.title === state)) {
      newList.todos.push({ title: state, completed: false });
      updateListFunc(newList);
      ToastAndroid.show(`${state} is successfully added to the list`, ToastAndroid.SHORT)
    } else {
      ToastAndroid.show('There is a todo with this title, please create new one with another title!!!', ToastAndroid.SHORT)
    }

    setState('');

    Keyboard.dismiss()
  }
  const updateTodo = (title) => {
    let newList = list;
    newList.todos.forEach((todo) => {
      if (todo.title === title) {
        todo.title = todoName
      }
    })
    updateListFunc(newList)
    setStateOfTodo(false)
  }
  const renderTodo = (todo, index) => {
    return (
      <GestureHandlerRootView>
        <Swipeable renderRightActions={(_, dragX) => rightActions(dragX, index)}>
          <View style={styles.todoContainer}>
            <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
              <Ionicons
                name={todo.completed ? "ios-square" : "ios-square-outline"}
                size={24}
                color={colors.gray}
                style={{ width: 32, marginLeft: -30 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showUpdateTodoForm(todo.title)} >
              <Text
                style={[styles.todo, { color: todo.completed ? colors.gray : colors.black }]}
                numberOfLines={6}
              >
                {todo.title}
              </Text>
            </TouchableOpacity>



          </View>
          <View>
            {
              stateOfTodo && name === todo.title &&
              <KeyboardAvoidingView style={{ flex: 1, flexDirection: "row", marginLeft: 25 }}>
                <TextInput
                  value={todoName}
                  onChangeText={text => setTodoName(text)}
                  style={[styles.updateTodoBtnTextInput]}
                />
                <TouchableOpacity
                  style={[styles.updateTodoBtn]}
                  onPress={() => updateTodo(todo.title)}
                >
                  <Text style={[styles.updateTodoBtnText]}>Update</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            }
          </View>
        </Swipeable>
      </GestureHandlerRootView >
    )
  }
  const rightActions = (dragX, index) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.9],
      extrapolate: "clamp"
    })
    const opacity = dragX.interpolate({
      inputRange: [-100, -20, 0],
      outputRange: [1, 0.9, 0],
      extrapolate: "clamp"
    })
    return (
      <TouchableOpacity onPress={() => deleteTodo(index)}>
        <Animated.View style={[styles.deleteBtn, { opacity: opacity }]}>
          <Animated.Text style={{ color: colors.white, fontWeight: "800", transform: [{ scale }] }}>Delete</Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }
  const deleteTodo = (index) => {
    let newList = list;
    newList.todos.splice(index, 1)
    updateListFunc(newList)
  }
  const taskCount = list.todos.length;
  const completedCount = list.todos.filter(todo => todo.completed).length
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: 5, right: 32, zIndex: 10 }}
          onPress={closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View style={[styles.section, styles.header, { borderBottomColor: list.color, marginTop: 10 }]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>{completedCount} of {taskCount} tasks</Text>
          </View>
        </View>

        <View style={[styles.section, { flex: 3 }]}>
          <FlatList
            data={list.todos}
            renderItem={({ item, index }) => renderTodo(item, index)}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 32 }}
            showsVerticalScrollIndicator={false}

          />
        </View>

        <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
          <TextInput
            style={[styles.input, { borderColor: list.color }]}
            onChangeText={text => setState(text)}
            value={state}
          />
          <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => addTodo()} >
            <AntDesign name="plus" size={16} color={colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  section: {
    alignSelf: "stretch"
  },
  header: {
    justifyContent: "flex-end",
    marginLeft: 64,
    borderBottomWidth: 3,
    paddingTop: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.gray,
    fontWeight: "600"
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 16
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 6,
    paddingHorizontal: 8
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  todoContainer: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 57,
    width: 320,
  },
  todo: {
    color: colors.black,
    fontWeight: "700",
    fontSize: 14,
  },
  deleteBtn: {
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    padding: 12,
  },
  updateTodoBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    borderRadius: 6,
    borderColor: colors.blue,
    borderWidth: 1,
    backgroundColor: colors.blue,
    marginLeft: 4,
  },
  updateTodoBtnText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700"
  },
  updateTodoBtnTextInput: {
    borderColor: colors.blue,
    flex: 1,
    height: 30,
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 6,
    paddingHorizontal: 8
  }
})

export default TodoModal;