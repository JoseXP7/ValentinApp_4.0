import { z } from 'zod'

export const completeProfileSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  decanato: z.string().min(1, 'El decanato es requerido'),
  semestre: z.string().min(1, 'El semestre es requerido'),
})
