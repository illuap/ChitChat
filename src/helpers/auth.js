import { auth, db } from "../services/firebase"

export function signup(email, password, fname, lname, username){
    var user = auth().createUserWithEmailAndPassword(email, password);

    db.collection('users').doc(auth().currentUser.uid).add({
        fname: fname,
        lname: lname,
        username: username
    })

    return user;
}
export function signin(email,password){
    return auth().signInWithEmailAndPassword(email,password);
}
export function signInWithGoogle(){
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}

export function signOut(){
    return auth().signOut();
}