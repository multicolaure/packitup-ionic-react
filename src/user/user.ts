import { z } from 'zod';


export const UserSchema = z.object({
    uid: z.string(),
    username: z.string(),
    photoUrl: z.string().optional(),
});


export type User = z.infer<typeof UserSchema>;

export enum Right {
    create='create',
    update='update',
    delete='delete',
    read='read'
}

export const RightSchema = z.nativeEnum(Right);
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
export type RightSchema = z.infer<typeof RightSchema>;

export const SecuredSchema = z.object({
    rights: z.record(z.string(), z.array(RightSchema)).optional()
})

export type Secured = z.infer<typeof SecuredSchema>;