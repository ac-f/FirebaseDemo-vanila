
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getFirestore, doc, collection, query, where, getDocs, setDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "...",
    authDomain: "...",
    projectId: "...",
    storageBucket: "...",
    messagingSenderId: "...",
    appId: "...",
    measurementId: "..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Create
export const createData = async (first, last, born) => {
    await setDoc(doc(db, "Test", "2"), {
        first: first,
        last: last,
        born: born
    });
}

// Read
export const readData = async () => {
    const questRef = collection(db, "Test");
    const q = query(questRef, where("born", ">", 1000));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push(doc.data());
    });
    return data;
}

// Update
export const updateData = async (first, last, born) => {
    await updateDoc(doc(db, "Test", "2"), {
        first: first,
        last: last,
        born: born
    });
}

// Delete
export const deleteData = async () => {
    await deleteDoc(doc(db, "Test", "2"));
}
