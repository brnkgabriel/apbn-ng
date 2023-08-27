import {
  collection, getDocs, getDoc,
  addDoc, deleteDoc, doc, query,
  where, setDoc, collectionGroup,
  Timestamp,
  DocumentData
} from "firebase/firestore"
import type { iOptions, iResponse } from "~/types"
import { firestoredb } from "./firebase"

export const queryByCollection = async (col: string) => {
  const colRef = collection(firestoredb, col)

  const snapshot = await getDocs(colRef)

  const docs = Array.from(snapshot.docs).map(doc => {
    return {
      ...doc.data(),
      id: doc.id
    }
  })

  return docs
}

export const set = async (options: iOptions) => {

  const { data, params: { col, id, successMessage } } = options
  try {
    const docRef = doc(firestoredb, col as string, id as string)
    const snapData:DocumentData = {}
    snapData[data.email] = data
    await setDoc(docRef, snapData, { merge: true })
    const response = { error: false, success: true, message: successMessage }
    return response
  } catch (error: any) {
    const response = { error: true, success: false, message: error.message }
    return response
  }
}

export const add = async (options: iOptions) => {
  const { data, params: { col } } = options
  const colRef = collection(firestoredb, col)
  const docRef = await addDoc(colRef, data)
  return docRef
}

export const del = async (col: string, id: string) => {
  const docRef = doc(firestoredb, col, id)
  return await deleteDoc(docRef)
}

export const checkAndStoreDoc = async (options: iOptions) => {
  const {
    data,
    params: {
      col,
      id,
      errorMessage,
      successMessage
    }
  } = options
  const docRef = doc(firestoredb, col as string, id as string)
  const docSnap = await getDoc(docRef)
  let snapData: DocumentData = docSnap.data() as DocumentData

  if (snapData === undefined) {
    snapData = {}
  }

  let response: iResponse
  if (data.email in snapData) {
    response = { error: true, success: false, message: errorMessage }
    return response
  }

  try {
    snapData[data.email] = data
    await setDoc(docRef, snapData, { merge: true })
    response = { error: false, success: true, message: successMessage }
    return response
  } catch (error: any) {
    response = { error: true, success: false, message: error.message }
    return response
  }

}