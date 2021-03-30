import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCVnWQxhIrhgdtKD0Nwz6BnhI7TpnNJiPA",
    authDomain: "whapp-7be7f.firebaseapp.com",
    projectId: "whapp-7be7f",
    storageBucket: "whapp-7be7f.appspot.com",
    messagingSenderId: "1073364499338",
    appId: "1:1073364499338:web:923c783a692a2451156673"
  };

const app=!firebase.apps.length
    ?firebase.initializeApp(firebaseConfig)
    :firebase.app();

const db =app.firestore();
const auth=app.auth();
const provider=new firebase.auth.GoogleAuthProvider();

export {db ,auth, provider}