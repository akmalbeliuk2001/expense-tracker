import {
  collection,
  addDoc,
  setDoc,
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

// Data User
export const addUserDAta = async (uid, data) => {
  const ref = doc(db, "users", uid);
  await setDoc(ref, data);
};

export const updateUserData = async (uid, data) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, data);
};

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

export const deleteUserData = async (uid, field, sourceToDelete) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    console.warn("User document not found");
    return;
  }

  if (field === "income") {
    const incomes = docSnap.data().income;
    const updatedIncomes = incomes.filter(
      (income) => income.source !== sourceToDelete
    );
    await updateDoc(docRef, {
      income: updatedIncomes,
    });
  } else {
    const categories = docSnap.data().categories;
    const updatedCategories = categories.filter(
      (category) => category.id !== sourceToDelete
    );
    await updateDoc(docRef, {
      categories: updatedCategories,
    });
  }
};

// Transactions
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
  end.setHours(23, 59, 59, 999);

  const ref = collection(db, "users", uid, "transactions");
  const q = query(ref, orderBy("date", "desc"));
  // const q = query(
  //   ref,
  //   where("date", ">=", Timestamp.fromDate(start)),
  //   where("date", "<=", Timestamp.fromDate(end)),
  //   orderBy("date", "desc")
  // );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(data);
  });

  return unsubscribe;
};

export const deleteTransaction = async (uid, id) => {
  const ref = doc(db, "users", uid, "transactions", id);
  await deleteDoc(ref);
};
