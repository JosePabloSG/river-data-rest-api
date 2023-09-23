import z from 'zod'

const dataSchema = z.object({
  id: z.string(),
  waterLevel: z.number().int().positive().max(3),
  date: z.string(),
  time: z.string(),
  location: z.string()
})

export function validateData (input) {
  return dataSchema.safeParse(input)
}

export function validatePartialData (input) {
  return dataSchema.partial().safeParse(input)
}
