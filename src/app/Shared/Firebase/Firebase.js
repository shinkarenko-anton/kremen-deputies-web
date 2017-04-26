// Firebase
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCCYxTLlA05U1cdGTLJ6cL5J94yhGxCuCw",
    authDomain: "kremen-deputies.firebaseapp.com",
    databaseURL: "https://kremen-deputies.firebaseio.com",
    projectId: "kremen-deputies",
    storageBucket: "kremen-deputies.appspot.com",
    messagingSenderId: "358642110921"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();