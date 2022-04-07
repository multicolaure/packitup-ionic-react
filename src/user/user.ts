export interface User {
    uid: string,
    username: string,
    photoUrl?: string,
}

export enum Right {
    create='create',
    update= 'update',
    delete= 'delete',
    read='read'
}

export interface Secured {
    rights?: {
        [uid: string]: Array<Right>;
    };
}