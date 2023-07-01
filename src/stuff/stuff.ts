import { z } from "zod";


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