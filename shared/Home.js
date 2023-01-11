import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, ActivityIndicator, ToastAndroid, ImageBackground } from 'react-native';
import { colors } from './Colors';
import { AntDesign } from '@expo/vector-icons';
import TodoList from '../components/TodoList'
import AddListModal from './AddListModal';
import { getLists, updateList, addList, auth, deleteTodoList } from './Fire';
import { useNavigation } from '@react-navigation/core';
import backImg from '../assets/back.jpg';
const Home = () => {
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [todo, setTodo] = useState({})
  const [loading, setLoading] = useState(true);
  const [listType, setListType] = useState('create')
  const navigation = useNavigation()

  const toggleAddTodoModal = () => {
    if (listType === 'update') {
      setListType('create')
      setVisible(!visible)
    }
    if (listType === 'create') {
      setVisible(!visible)
    }
  }
  const toggleUpdateTodoModal = () => {
    if (listType === "create") {
      setListType('update');
      setUpdateVisible(!updateVisible)
    }
    if (listType === 'update') {
      setUpdateVisible(!updateVisible)
    }

  }
  const openGetListModalToUpdate = (id) => {
    if (listType === "create") {
      setListType('update')
      toggleUpdateTodoModal()
      let list = lists.find((item) => item.id === id);
      setTodo(list)
    }
    if (listType === 'update') {
      toggleUpdateTodoModal()
      let list = lists.find((item) => item.id === id);
      setTodo(list)
    }
  }

  const AddList = list => {
    addList({
      name: list.name,
      color: list.color,
      todos: []
    });
  }

  const updateListById = (list) => {
    try {
      updateList({
        id: list.id,
        name: list.name,
        color: list.color,
        todos: list.todos
      })
    } catch (err) {
      console.log(err.message)
    }
  }
  const updateListFunc = list => {
    updateList(list)
  }

  const deleteTodoListFunc = (list) => {
    deleteTodoList(list)
    ToastAndroid.showWithGravity(`${list.name} is successfully deleted`, ToastAndroid.SHORT, ToastAndroid.TOP)
  }
  const renderList = (list) => {
    return <TodoList
      list={list}
      updatListFunc={updateListFunc}
      openGetListModalToUpdate={openGetListModalToUpdate}
      deleteTodoListFunc={deleteTodoListFunc}
    />
  }
  useEffect(() => {
    getLists(lists => {
      setLists(lists);
      setLoading(false)
    })

  }, [])

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((err) => alert(err.message))
  }


  return (
    <>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      ) : (
        <ImageBackground source={backImg} resizeMode="cover" style={styles.container}>
          <Modal animationType="slide" visible={listType === "create" ? visible : updateVisible} onRequestClose={() => {
            listType === "create" ? toggleAddTodoModal() : toggleUpdateTodoModal()
          }}>
            <AddListModal
              listType={listType}
              closeModal={() => { listType === "create" ? toggleAddTodoModal() : toggleUpdateTodoModal() }}
              addList={AddList}
              updateListById={updateListById}
              todo={todo}
            />
          </Modal>

          <View style={{ flexDirection: "row" }}>
            <View style={styles.divider} />
            <Text style={styles.title}>
              Todo <Text style={{ fontWeight: "500", color: colors.blue }}>Lists</Text>
            </Text>
            <View style={styles.divider} />
          </View>

          <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", }}>
            <View style={{ marginVertical: 48 }}>
              <TouchableOpacity style={styles.addList} onPress={toggleAddTodoModal}>
                <AntDesign name="plus" size={16} color={colors.white} />
              </TouchableOpacity>
              <Text style={styles.add}>Add List</Text>
            </View>

            <View style={{ alignSelf: "center", marginLeft: 50, marginVertical: 48 }}>
              <TouchableOpacity style={[styles.button]} onPress={handleSignOut}>
                <AntDesign name="logout" size={20} color={colors.white} />
              </TouchableOpacity>
              <Text style={styles.add}>Sign out</Text>
            </View>
          </View>

          <View style={{ height: 350, paddingLeft: 32 }}>
            <FlatList
              data={lists}
              keyExtractor={item => item.id.toString()}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => renderList(item)}
              keyboardShouldPersistTaps="always"
            />
          </View>
        </ImageBackground>
      )
      }
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: colors.blue,
    height: 3,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.white,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.blue,
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: colors.white,
    fontWeight: "800",
    fonsw: 14,
    marginTop: 8
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    padding: 15,
  },

});
