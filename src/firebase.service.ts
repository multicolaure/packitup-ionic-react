
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { v4 as uuidV4} from 'uuid';

import { FIREBASE_API_KEY, FIREBASE_APP_ID, FIREBASE_AUTH_DOMAIN, FIREBASE_MESSAGE_SENDER_ID, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET } from './.env';
import { CommonError } from './error/common-errors';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

export const db = getFirestore(firebaseApp);

export const generateId = (prefix?: string) => {
  return (prefix ?? '') + uuidV4();
}

export function cleanUpUndefined<T>(obj: T) {
  return Object.fromEntries(Object.entries(obj)
    .filter(([_, value]) => value !== undefined));
}


export type FirestoreErrorCode = "cancelled"
  | "unknown"
  | "invalid-argument"
  | "deadline-exceeded"
  | "not-found"
  | "already-exists"
  | "permission-denied"
  | "resource-exhausted"
  | "failed-precondition"
  | "aborted"
  | "out-of-range"
  | "unimplemented"
  | "internal"
  | "unavailable"
  | "data-loss"
  | "unauthenticated";

export type FirestoreError = {
  code: FirestoreErrorCode;
  message?: string;
}

export function toCommonError(error: FirestoreError): CommonError {
  console.log('Translating error to code ', error)
  switch (error.code) {
    case "not-found":
      return CommonError.NOT_FOUND;
    case "permission-denied":
      return CommonError.PERMISSION_DENIED;
    case "unauthenticated":
      return CommonError.UNAUTHENTICATED;
    case "data-loss":
      return CommonError.DATA_LOSS;
    case "already-exists":
      return CommonError.ALREADY_EXISTS;
    case "cancelled":
      return CommonError.CANCELLED_BY_USER;
    case "deadline-exceeded":
      return CommonError.CONNECTIVITY_ISSUE;
    default:
      return CommonError.SYSTEM_INTERNAL;
  }
}

/**
 * Split the given array into chunks of 500 elements
 * and run the given function to use each chunk.
 * The result of the return promised is the results of all chunks.
 * @param toSplit array of elements to split into 500 elements batch
 */
export function splitToBatches<T, R>(toSplit: Array<T>,
  runChunk: (chunk: Array<T>) => Promise<Array<R>>, chunkSize = 500): Promise<Array<R>> {

  const chunks = splitToChunks(toSplit, chunkSize);
  return Promise.all(chunks.map((chunk) => runChunk(chunk)))
    .then(results => flatten(results));
}

function splitToChunks<T>(toSplit: Array<T>, chunkSize: number) {
  if(chunkSize <= 0) {
    return [toSplit];
  }

  let start = 0;
  let end = Math.min(chunkSize, toSplit.length);
  const chunks: Array<Array<T>> = [];

  do {
    chunks.push(toSplit.slice(start, end));
    start = end;
    end = start + chunkSize;
  } while(end < toSplit.length);

  return chunks;
}

function flatten<T>(arr: Array<Array<T>>) {
  return  ([] as Array<T>).concat(...arr);
}
