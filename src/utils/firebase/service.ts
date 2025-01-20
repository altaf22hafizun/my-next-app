import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
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