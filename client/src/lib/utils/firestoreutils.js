import { db } from '@/config/firebase'
import {
  collection, collectionGroup, doc,
  getDocs, getDoc, setDoc, deleteDoc, updateDoc,
  where, query, orderBy,
  serverTimestamp
} from 'firebase/firestore'

/**
 * Generate a random Firebase document ID
 * @param {String} pathToCollection - Firestore slash-separated path to a collection
 * @returns {String} Firebase document ID
 */
const generateDocumentId = (pathToCollection) =>
  doc(collection(db, pathToCollection))

/**
 * Returns a Firestore Date with time in a simple String
 * @param {Firestore Date} firestoreTimeStamp - Firestore timestamp { seconds, nanoseconds }
 * @returns {String} String-converted Firestore Date with Time
 */
const timestampToDateString = (firestoreTimeStamp = {}) => {
  if (!Object.keys(firestoreTimeStamp).includes('seconds')) {
    return '-'
  } else {
    const currentDate = firestoreTimeStamp.toDate()
    const DAY_FORMAT_OPTIONS = { hour: '2-digit', minute: '2-digit' }
    return `${currentDate.toDateString()} ${currentDate.toLocaleTimeString('it-IT', DAY_FORMAT_OPTIONS)}`
  }
}

/**
 * Reads and fetch the Firestore Documents in a collection or subcollection.
 * @param {String} pathToCollection - Firestore slash-separated path to a collect
 * @param {String} fieldName - Document field key to order the Documents result response
 * @param {Object} query - Firestore query
 * @returns {Object[]} List of Documents in a collection (or subcollection)
 */
const getCollection = async (pathToCollection, fieldName = 'id', queryDef = null) => {
  const colRef = collection(db, pathToCollection)
  const q = (queryDef)
    ? queryDef
    : query(colRef, orderBy(fieldName, 'asc'))

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ ...doc.data() }))
}

/**
 * Reads and fetch the Firestore documents in subcollections across all documents using the collectionGroup() query.
 * @param {String} subcollection - Subcollection name that's present and common across all documents.
 * @param {Object[]} whereQueries - Firestore where() query items following the format { field, op, value }
 *    - field: {String} document field name
 *    - op: {String} Firestore where query equality operator ('==', '!=', '>', '<', etc)
 *    - value: {any} field parameter value
 * @typedef {Object} order - orderBy() firestore input
 * @param {String} order.field - Field name to run the orderBy() query
 * @param {String} order.mode - Ordering/sorting metho 'ASC', 'DESC'
 * @returns {Object[]} An array of Firestore documents
 */
const getCollectionGroup = async (subcollection, whereQueries = [], order) => {
  const conditions = []

  if (whereQueries.length > 0) {
    whereQueries.forEach(item => {
      conditions.push(where(item.field, item.op, item.value))
    })
  }

  let postsQuery

  if (order) {
    postsQuery = query(
      collectionGroup(db, subcollection),
      ...conditions,
      orderBy(order.field, order.mode))
  } else {
    postsQuery = query(collectionGroup(db, subcollection), ...conditions)
  }

  const querySnapshot = await getDocs(postsQuery)
  return querySnapshot.docs.map((doc) => ({ ...doc.data() }))
}

/**
 * Fetch a Firestore document inside a root or sub (nested) collection
 * @param {String} pathToDocument - Firestore slash-separated path to a Document.
 * @returns {Object} Firestore Document
 */
const getDocument = async (pathToDocument) => {
  const docRef = doc(db, pathToDocument)
  const docSnap = await getDoc(docRef)

  return (docSnap.exists())
    ? docSnap.data()
    : undefined
}

/**
 * Creates a new Firestore Document under a specified collection (or subcollection),
 * And re-fetches them returns newly created Document.
 * @param {String} pathToCollection - Firestore slash-separated path to a collection
 * @param {Object} params - Key-value pairs to insert in a new Firestore Document
 * @returns {Promise}
 */
const createDocument = async (pathToCollection, params) => {
  const docId = generateDocumentId(pathToCollection)

  const postId = (params.id === undefined)
    ? docId.id
    : params.id

  return await setDoc(doc(db, pathToCollection, postId), { ...params, id: postId })
}

const deleteDocument = async (pathToDocument) => {
  // Check if document exists
  const document = await getDocument(pathToDocument)
  const docRef = doc(db, pathToDocument)

  if (document === undefined) {
    throw new Error('Document does not exist')
  }

  return await deleteDoc(docRef)
}

/**
 * Updates the fields of an existing Firestore Document under a specified collection (or subcollection),
 * And re-fetches them returns updated Document.
 * @param {String} pathToDocument - Firestore slash-separated path to a Document.
 * @param {Object} params - Key-value pairs to update in an existing Firestore Document. New fields (keys) and their values will be added they are not present in the Document.
 * @returns {Promise}
 */
const updateDocument = async (pathToDocument, params) => {
  // Check if document exists
  const document = await getDocument(pathToDocument)
  const docRef = doc(db, pathToDocument)

  if (document === undefined) {
    throw new Error('Document does not exist')
  }

  return await updateDoc(docRef, params)
}

export {
  generateDocumentId,
  timestampToDateString,
  getCollection,
  getCollectionGroup,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument,
  serverTimestamp
}
