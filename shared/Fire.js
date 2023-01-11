import firebase from 'firebase/compat/app'
import "firebase/compat/firestore";
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyJA8vO23ZEd2Ar4gfB-8Sfb0kjQ1bwNM",
  authDomain: "todolist-e622e.firebaseapp.com",
  projectId: "todolist-e622e",
  storageBucket: "todolist-e622e.appspot.com",
  messagingSenderId: "85514029640",
  appId: "1:85514029640:web:5eb096cdee3892b09ee67d"
};


let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}
let auth = firebase.auth()


function userId() {
  return auth.currentUser.uid
}

function ref() {
  return firebase
    .firestore()
    .collection('users')
    .doc(userId())
    .collection('lists');
}

function updateList(list) {
  let Ref = ref()
  Ref.doc(list.id).update(list)
}

const deleteTodoList = (list) => {
  let Ref = ref();
  Ref.doc(list.id).delete()
}

function getLists(callback) {
  let Ref = ref().orderBy('name')

  Ref.onSnapshot(snapshot => {
    let lists = [];
    snapshot.forEach(doc => {
      lists.push({ id: doc.id, ...doc.data() })
    })
    callback(lists);

  })
}


function addList(list) {
  let Ref = ref()
  Ref.add(list)
}


export { auth, getLists, updateList, addList, deleteTodoList }