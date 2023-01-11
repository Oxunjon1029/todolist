import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, } from 'react-native';
import { colors } from '../shared/Colors';
import TodoModal from './TodoModal';
import { AntDesign } from '@expo/vector-icons';
const TodoList = ({ list, updatListFunc, openGetListModalToUpdate, deleteTodoListFunc }) => {
  const [state, setState] = useState({ showListVisible: false });

  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;

  const toggleListModal = () => {
    setState({ showListVisible: !state.showListVisible })
  }



  return (
    <View>
      <Modal
        animationType="slide"
        visible={state.showListVisible}
        onRequestClose={() => toggleListModal()}
      >
        <TodoModal list={list} closeModal={() => toggleListModal()} updateListFunc={updatListFunc} />
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, { backgroundColor: list.color }]}
        onPress={() => toggleListModal()}
      >
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>


        <View style={{ marginBottom: 5 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subtitle}>Remaining</Text>
          </View>


          <View style={{ alignItems: "center" }}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subtitle}>Completed</Text>
          </View>
        </View>

        <View style={styles.updateDeleteContainer}>
          <TouchableOpacity style={[styles.updateBtn, {
            marginRight: 10,
            backgroundColor: list.color === "#24A6D9" ? "green" : colors.blue,
            borderColor: list.color === "#24A6D9" ? "green" : colors.blue
          }]} onPress={() => openGetListModalToUpdate(list.id)}>
            <AntDesign name="sync" size={24} color={colors.white} style={{ fontWeight: "700" }} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.updateBtn, {
            backgroundColor: list.color === "#24A6D9" ? "green" : colors.blue,
            borderColor: list.color === "#24A6D9" ? "green" : colors.blue
          }]} onPress={() => deleteTodoListFunc(list)}>
            <AntDesign name="delete" size={24} color={colors.red} style={{ fontWeight: "700" }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  listContainer: {
    width: 210,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginHorizontal: 13,
    height:"85%",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 15
  },
  count: {
    fontSize: 48,
    fontWeight: "200",
    color: colors.white
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white
  },

  updateDeleteContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  updateBtn: {
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius:6,
    marginBottom: 20
  },

})

export default TodoList;