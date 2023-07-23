import { z } from "zod";
import { Secured, SecuredSchema } from "../user/user";


export enum FrequencyUnit {
    trip = 'trip',
    day = 'day',
    week = 'week',
    month = 'month'
}

export const FrequencySchema = z.nativeEnum(FrequencyUnit);

export const UsageFrequencySchema = z.object({
    nbStuffs: z.coerce.number().positive().int(),
    frequency: z.coerce.number().positive().int(),
    unit: FrequencySchema,
});

export type UsageFrequency = z.infer<typeof UsageFrequencySchema>;


export const StuffSchema = z.object({
    id: z.string().optional(),
    name: z.string().trim().min(1),
    notes: z.string().optional(),
    frequency: UsageFrequencySchema.default({
        nbStuffs: 1,
        frequency: 1,
        unit: FrequencyUnit.trip
    }),
    categoryIds: z.array(z.string()).nonempty()
}).merge(SecuredSchema)

export type Stuff = z.infer<typeof StuffSchema>;