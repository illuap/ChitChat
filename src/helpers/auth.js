import { auth, db } from '../services/firebase';

export function signup(email, password, username) {
  const userdb = db.collection('users');
  const query = userdb.where('username', '==', username);
  return query.get().then((snapshot) => {
    if (snapshot.size >= 1) {
      throw new Error('That username is already taken.');
    }
    return true; // i dont know if i really need a return for a promise
  }).then(() => auth().createUserWithEmailAndPassword(email, password)
    .then((cred) => userdb.doc(cred.user.uid).set({
      username,
      email,
      fname: 'John',
      lname: 'Smith',
    }))).catch((msg) => {
    console.log(msg.message);
    throw msg;
  });
}
// export async function signup(email, password, username){
//     const userdb = db.collection('users');
//     const query = userdb.where('username','==',username);

//     let error = null;

//     let results = await query.get().then(async snapshot => {
//         if (snapshot.size >= 1 ){
//             error = {message:"There already another account with the same username."};
//         }else{
//             const user = auth().createUserWithEmailAndPassword(email, password).then(user => {

//                 db.collection('users').doc(user.user.uid).add({
//                     "username": username,
//                     "email": email
//                 });
//             }).catch(e =>{
//                 alert(e.message);
//                 console.log('Error with checking Auth Server');
//                 error = e;
//             });
//         }
//     }).catch(err => {
//         console.log('Error with checking db.');
//         throw err;
//     });

//     if(results){

//         throw error;
//     }

// }
export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}
export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signOut() {
  return auth().signOut();
}
