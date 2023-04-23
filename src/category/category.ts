import { SecuredSchema } from "../user/user";
import { z } from "zod";

export const CategoryIconSchema = z.string();
export type CategoryIcon = z.infer<typeof CategoryIconSchema>;

export const CategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().trim().min(1),
    icon: CategoryIconSchema,
    order: z.number().positive().int().optional()
}).merge(SecuredSchema)

export type Category = z.infer<typeof CategorySchema>;