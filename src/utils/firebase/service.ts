import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import bcrypt from "bcrypt";
import app from "./init";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshoot = await getDocs(collection(firestore, collectionName));

  const data = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataById(collectionName: string, id: string) {
  // Mengambil satu data pakai getDoc jika banyak baru getDocs
  const snapshoot = await getDoc(doc(firestore, collectionName, id));
  const data = snapshoot.data();
  return data;
}

export async function signIn(userData: { email: string }) {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email));
  const snapshoot = await getDocs(q);

  const data = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function signUp(userData: { email: string; password: string; fullname: string; role?: string }, callback: Function) {
  const q = query(collection(firestore, "users"), where("email", "==", userData.email));
  const snapshoot = await getDocs(q);

  const data = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  if (data.length > 0) {
    callback({ status: false, message: "Email sudah terdaftar" });
  } else {
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.role = "member";
    await addDoc(collection(firestore, "users"), userData)
      .then(() => {
        callback({ status: true, message: "Berhasil mendaftar" });
      })
      .catch((error) => {
        callback({ status: false, message: error });
      });
  }
}
