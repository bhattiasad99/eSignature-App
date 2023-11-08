/* eslint-disable no-unused-vars */
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  deleteObject,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db, storage, auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { COLLECTION_USERS } from "./constants";

export const getDocuments = async (path) => {
  const res = await getDocs(collection(db, path));
  return res.docs.map((eachDoc) => eachDoc.data());
};

export const deleteDocument = async (path, id) => {
  return await deleteDoc(doc(db, path, id));
};

export const updateDocument = async (path, id, data) => {
  const washingtonRef = doc(db, path, id);

  return await updateDoc(washingtonRef, data);
};

export const postDocument = async (path, data) => {
  return await addDoc(collection(db, path), data);
};

export const signup = async (email, password) => {
  const authRes = await createUserWithEmailAndPassword(auth, email, password);
  const updateUser = await postDocument(COLLECTION_USERS, {
    email,
    password,
  });
  return authRes;
};

export const signout = async () => {
  return await signOut(auth);
};

export const signin = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const deleteAsset = (assetUrl) => {
  const deleteRef = ref(storage, assetUrl);
  deleteObject(deleteRef)
    .then(() => {})
    .catch((error) => {
      alert(error.message);
    });
};

export const getDocumentById = async (path, id) => {
  const docRef = doc(db, path, id);
  return await getDoc(docRef);
};

export const getSubCollectionDocument = async (path, id, subCollection) => {
  return await getDocs(collection(db, path, id, subCollection));
};

export const imagePostDocument = async (image) => {
  return new Promise(function (resolve, reject) {
    const name2 = new Date().getTime() + "" + image.name;
    const storageRef = ref(storage, "photos/" + name2);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export const postDocumentByCustomId = async (path, data, id) => {
  return await setDoc(doc(db, path, id), data);
};

export const unsub = onSnapshot(doc(db, "cities", "SF"), (doc) => {});
