import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import app from "./firebase";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
  const snapshoot = await getDocs(collection(firestore, collectionName));

  const data = snapshoot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}
