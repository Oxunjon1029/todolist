import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, Platform, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { colors } from './Colors';
import { backgroundColors } from '../assets/bacColors';
const AddListModal = ({ closeModal, addList, listType, todo, updateListById }) => {
  const [username, setUserName] = useState(listType === "create" ? "" : todo.name);
  const [Color, setColor] = useState(listType === "create" ? backgroundColors[0] : todo.color);
  const renderColors = () => {
    return backgroundColors.map(color => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => setColor(color)} />
      )
    })
  }

  const createTodo = () => {
    const list = { name: username, color: Color };
    addList(list)
    setUserName('');
    ToastAndroid.showWithGravity(`${username} is successfully created`, ToastAndroid.SHORT, ToastAndroid.TOP)
    closeModal()
  }

  const updateTodoById = () => {
    const list = { name: username, color: Color, id: todo.id, todos: todo.todos };
    updateListById(list)
    ToastAndroid.showWithGravity(`${todo.name} is  successfully edited into ${username}`, ToastAndroid.SHORT, ToastAndroid.TOP)
    closeModal()
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
      <TouchableOpacity onPress={closeModal} style={{ position: "absolute", top: 64, right: 32 }}>
        <AntDesign name="close" size={24} color={colors.black} />
      </TouchableOpacity>


      <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
        <Text style={styles.title}>{listType === 'create' ? "Create todo" : "Update todo"}</Text>

        <TextInput
          value={username}
          style={styles.input}
          placeholder="List Name?"
          onChangeText={text => setUserName(text)}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          {renderColors()}
        </View>
        <TouchableOpacity onPress={listType === "create" ? createTodo : updateTodoById} style={[styles.create, { backgroundColor: Color }]}>
          <Text style={{ color: colors.white, fontWeight: "600" }}>
            {listType === 'create' ? "Create!" : "Save update!"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    alignSelf: "center",
    color: colors.black,
    marginBottom: 16
  },
  input: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4
  }
})

export default AddListModal;