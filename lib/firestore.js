import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  where,
  Timestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

export const getUserData = (uid, callback) => {
  const ref = doc(db, "users", uid);

  const unsubscribe = onSnapshot(ref, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    } else {
      callback(null);
    }
  });

  return unsubscribe;
};

export const addTransaction = async (uid, data) => {
  const { nominal, category, describtions, date } = data;

  const ref = collection(db, "users", uid, "transactions");
  await addDoc(ref, {
    nominal: Number(nominal),
    category,
    describtions,
    date: Timestamp.fromDate(new Date(date)),
    createAt: Timestamp.now(),
  });
};

export const updateTransaction = async (uid, docId, data) => {
  const { nominal, category, describtions, date } = data;

  const ref = doc(db, "users", uid, "transactions", docId);
  await updateDoc(ref, {
    nominal: Number(nominal),
    category,
    describtions,
    date: Timestamp.fromDate(new Date(date)),
    updatedAt: Timestamp.now(),
  });
};

export const getTransactions = (uid, callback) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const ref = collection(db, "users", uid, "transactions");
  const q = query(
    ref,
    where("date", ">=", Timestamp.fromDate(start)),
    where("date", "<=", Timestamp.fromDate(end)),
    orderBy("date", "desc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });

  return unsubscribe;
};
