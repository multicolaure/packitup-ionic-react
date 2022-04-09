import { CommonError } from '../error/common-errors';
import { collection, writeBatch, query, where, getDocs, DocumentData, QueryDocumentSnapshot, SnapshotOptions, doc, deleteDoc, setDoc } from "firebase/firestore";
import { cleanUpUndefined, db, FirestoreError, generateId, splitToBatches, toCommonError } from '../firebase.service';
import { Right, User } from '../user/user';
import { Category } from './category';

const ID_PREFIX = 'category-';
const COLLECTION_NAME = "categories";
const categoryCollection = collection(db, COLLECTION_NAME);

export function upsertCategory(category: Category, user?: User): Promise<Category> {
    if (!user) {
        console.error('Cannot upsert a category, no user authenticated');
        return Promise.reject(CommonError.UNAUTHENTICATED.toString());
    }

    const categoryWithId: Category = {
        ...category,
        id: category.id ?? generateId(ID_PREFIX),
        rights: category.rights ?? {
            [user.uid]: [Right.update, Right.delete, Right.read],
        },
    };
    try {
        return setDoc(getDocument(categoryWithId.id!), categoryWithId, { merge: true })
            .then(() => categoryWithId)
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

export function upsertCategories(categories: Array<Category>, user?: User) {
    if (!user) {
        console.error('Cannot upsert categories, no user authenticated');
        return Promise.reject(CommonError.UNAUTHENTICATED.toString());
    }

    return splitToBatches<Category,Category>(categories, (chunk: Category[]) => {

        const batch = writeBatch(db);

        const categoriesWithIds = categories.map(category => {
            return {
                ...category,
                id: category.id ?? generateId(ID_PREFIX),
                rights: category.rights ?? {
                    [user.uid]: [Right.update, Right.delete, Right.read],
                },
            } as Category;
        });

        categoriesWithIds.forEach(categoryWithId => {
            const doc = getDocument(categoryWithId.id!);
    
            batch.set(doc, categoryWithId, { merge: true });
        });
    
        return batch.commit().then(() => categoriesWithIds);
    })
}

export function removeCategory(categoryId: string, user?: User): Promise<string> {
    if (!user) {
        console.error('Cannot fetch categories, no user authenticated');
        return Promise.reject(CommonError.UNAUTHENTICATED.toString());
    }

    try {
        return deleteDoc(getDocument(categoryId))
            .then(() => categoryId)
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

export function reorderCategories(categories: Array<Category>) {
    return categories.map((category, i) => ({
        ...category,
        order: i
    }));
}

export function getCategories(user?: User): Promise<Array<Category>> {
    if (!user) {
        console.error('Cannot fetch categories, no user authenticated');
        return Promise.reject(CommonError.UNAUTHENTICATED.toString());
    }

    try {
        return getDocs(
                query(categoryCollection, 
                    where(`rights.${user.uid}`, 'array-contains', 'read')))
            .then(querySnaphot => {
                return querySnaphot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }) as Category)
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


const firestoreCategoryConverter = {
    toFirestore(category: Category): DocumentData {
        return cleanUpUndefined(category);
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions): Category {
        return {
            id: snapshot.id,
            ...snapshot.data(options)
        } as Category;
    }
};

function getDocument(id: string) {
    return doc(categoryCollection, id)
        .withConverter(firestoreCategoryConverter)
}

