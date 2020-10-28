
const authSignout= document.querySelector('.authSignout');
var nameUser =null;

firebase.auth().onAuthStateChanged(function(user) {
  if(user) {
    // si el usuario existe quiere decir que inició sesión, se registró o ya tenía sesión iniciada
   
    const db = firebase.firestore();
    const usersRef = db.collection('users');
    usersRef.doc(user.uid).get().then(function (doc) {
      if(doc.exists) {
        const data = doc.data();
        nameUser=data.name;

       
      }
    });
  } 
});

// cerrar sesión
authSignout.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signOut();
  window.location.href = 'index.html';
});