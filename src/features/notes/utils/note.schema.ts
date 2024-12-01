import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const notePropsSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  body: z.string().optional()
});

export const noteFormSchema = z.object({
  title: z
    .string()
    .min(4, 'Title is required and must be at least 4 characters'),
  body: z.string().min(4, 'Body must be at least 4 characters')
});

export type Note = z.infer<typeof noteSchema>;
export type NoteProps = z.infer<typeof notePropsSchema>;
export type NoteFormData = z.infer<typeof noteFormSchema>;
