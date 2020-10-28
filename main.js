
  
  const db = firebase.firestore();
  const messageRef = db.collection('message');
  
  const chat = document.querySelector('.chat');
  const chatbody = document.querySelector('.chat__body');


  //const usersRef = db.collection('users');
  // creación de nuevos mensajes a partir de la lista
  function renderMessage (list) {
    chatbody.innerHTML = '';
    list.forEach(function (elem) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message');
  
        newMessage.innerHTML = `
        <div class="chat__info">
        <p class="chat__name">${elem.name}</p>
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
      text: form.message.value,
      name: nameUser
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