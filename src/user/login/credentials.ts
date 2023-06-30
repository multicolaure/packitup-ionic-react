
import { z } from "zod";


export type Credentials = z.infer<typeof CredentialsSchema>;

export const CredentialsSchema = z.object({
    username: z.string().trim().min(1),
    password: z.string().min(6)
});