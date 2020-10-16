
const firebaseConfig = {
    apiKey: "AIzaSyBRfYK3zEHk5Aq6OMJ7OtnMTJj9G659wrA",
    authDomain: "chat-6c8e0.firebaseapp.com",
    databaseURL: "https://chat-6c8e0.firebaseio.com",
    projectId: "chat-6c8e0",
    storageBucket: "chat-6c8e0.appspot.com",
    messagingSenderId: "121834586028",
    appId: "1:121834586028:web:691dbd1fbfa6308ffb4409",
    measurementId: "G-JM52LK3T7Q"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  
  const chat = document.querySelector('.chat');
  const chatbody = document.querySelector('.chat__body');

  // creación de nuevos mensajes a partir de la lista
  function renderMessage (list) {
    chatbody.innerHTML = '';
    list.forEach(function (elem) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
  
        newMessage.innerHTML = `
        <div class="chat__info">
        <p class="chat__p"> ${elem.text}</p>
        </div>
        `;

      chatbody.appendChild(newMessage);
    });
  }
  
  function getMessages(){
    messageRef  // referencia de la colección
    .onSnapshot( function (querySnapshot) {
      const objects = [];
      querySnapshot.forEach((doc) => {
          const obj = doc.data();
          obj.id = doc.id;
          objects.push(obj);
          console.log(`${doc.id} => ${doc.data()}`);
      });
      renderMessage(objects);
    });
  }
  
  // render inicial con todos los mensajes
  getMessages();
  
  
  //Aqui es donde agregamos un mensaje
  const form = document.querySelector('.chat__control');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    const newMessage = {
      text: form.message.value
    };
  
    messageRef // referencia de la colección
    .add(newMessage) // cree un nuevo elemento en la colección
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  });