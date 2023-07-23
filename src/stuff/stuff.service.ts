
import { collection, writeBatch, query, where, getDocs, DocumentData, QueryDocumentSnapshot, SnapshotOptions, doc, deleteDoc, setDoc } from "firebase/firestore";
import { CommonError } from '../error/common-errors';
import { cleanUpUndefined, db, FirestoreError, generateId, splitToBatches, toCommonError } from '../firebase.service';
import { Right, User } from '../user/user';
import { Stuff } from './stuff';

const ID_PREFIX = 'stuff-';
const COLLECTION_NAME = "stuffs";
const stuffCollection = collection(db, COLLECTION_NAME);

export function upsertStuff(stuff: Stuff, user?: User): Promise<Stuff> {
    if (!user) {
        console.error('Cannot upsert a stuff, no user authenticated');
        return Promise.reject(CommonError.UNAUTHENTICATED.toString());
    }

    const stuffWithId: Stuff = {
        ...stuff,
        id: stuff.id ?? generateId(ID_PREFIX),
        rights: stuff.rights ?? {
            [user.uid]: [Right.update, Right.delete, Right.read],
        },
    };
    try {
        return setDoc(getDocument(stuffWithId.id!), stuffWithId, { merge: true })
            .then(() => stuffWithId)
            .catch((error: FirestoreError) => {
                console.log(error);
                const code = toCommonError(error);
                return Promise.reject(code.toString());
            });
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}


export function upsertStuffs(stuffs: Array<Stuff>, user?: User) {
    if (!user) {
        console.error('Cannot upsert stuffs, no user authenticated');
        return Promise.reject(CommonError.UNAUTHENTICATED.toString());
    }

    return splitToBatches<Stuff,Stuff>(stuffs, (chunk: Stuff[]) => {

        const batch = writeBatch(db);

        const stuffsWithIds = chunk.map(stuff => {
            return {
                ...stuff,
                id: stuff.id ?? generateId(ID_PREFIX),
                rights: stuff.rights ?? {
                    [user.uid]: [Right.update, Right.delete, Right.read],
                },
            } as Stuff;
        });

        stuffsWithIds.forEach(stuffWithId => {
            const doc = getDocument(stuffWithId.id!);
    
            batch.set(doc, stuffWithId, { merge: true });
        });
    
        return batch.commit().then(() => stuffsWithIds);
    })
}

export function removeStuff(stuffId: string): Promise<string> {
    try {
        return deleteDoc(getDocument(stuffId))
            .then(() => stuffId)
            .catch((error: FirestoreError) => {
                console.log(error);
                const code = toCommonError(error);
                return Promise.reject(code.toString());
            });
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export function getStuffs(user?: User): Promise<Array<Stuff>> {
    if (!user) {
        console.error('Cannot fetch stuffs, no user authenticated');
        return Promise.reject(CommonError.UNAUTHENTICATED.toString());
    }

    try {
        return getDocs(
                query(stuffCollection, 
                    where(`rights.${user.uid}`, 'array-contains', 'read')))
            .then(querySnaphot => {
                return querySnaphot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }) as Stuff)
            })
            .catch((error: FirestoreError) => {
                console.log(error);
                const code = toCommonError(error);
                return Promise.reject(code.toString());
            });
    }
    catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
}

export function getStuffsForCategories(user: User, categoryIds: Array<string>) {
    return getStuffs(user)
        .then(stuffs => {
            return stuffs.filter(stuff => stuff.categoryIds?.some(categoryId => categoryIds.includes(categoryId)))
        });
};


const firestoreStuffConverter = {
    toFirestore(stuff: Stuff): DocumentData {
        return cleanUpUndefined(stuff);
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions): Stuff {
        return {
            id: snapshot.id,
            ...snapshot.data(options)
        } as Stuff;
    }
};

function getDocument(id: string) {
    return doc(stuffCollection, id)
        .withConverter(firestoreStuffConverter);
}

