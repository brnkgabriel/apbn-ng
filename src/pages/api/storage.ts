import { StorageReference, UploadResult, deleteObject, listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// folder parameter example
export const listFiles = async (folder: string) => {
  const folderRef = ref(storage, folder)

  let files: StorageReference[] = []

  try {
    const res = await listAll(folderRef)
    files = [...res.items]
    return files
  } catch (error: any) {
    console.error(error.message)
    return []
  }
}

// file parameter example: 'images/mountains.jpg'
export const deleteFile = async (file: string) => {
  const fileRef = ref(storage, file)

  try {
    await deleteObject(fileRef)
    return `${file} successfully deleted`
  } catch (error: any) {
    return `couldn't delete file ${file} because ${error.message}`
  }
}

export const uploadBlobOrFile = async (url: string, file: File): Promise<string | null> => {
  const fileRef = ref(storage, url)

  try {
    const snapshot: UploadResult = await uploadBytes(fileRef, file)
    return getDownloadURL(snapshot.ref)
  } catch (error: any) {
    console.error(`couldn't upload file because ${error.message}`)
    return null
  }
}