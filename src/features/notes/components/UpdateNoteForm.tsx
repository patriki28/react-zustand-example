import { useEffect } from 'react';
import { useNoteStore } from '../store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { NoteFormData, noteFormSchema } from '../utils/note.schema';

interface UpdateNoteFormProps {
  noteId: string | undefined;
}

export default function UpdateNoteForm({ noteId }: UpdateNoteFormProps) {
  const { isLoading, updateNote, fetchNoteById, note } = useNoteStore();

  const form = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: '',
      body: ''
    }
  });

  useEffect(() => {
    if (noteId) {
      fetchNoteById(noteId);
    }
  }, [noteId, fetchNoteById]);

  useEffect(() => {
    if (note) {
      form.setValue('title', note.title);
      form.setValue('body', note.body);
    }
  }, [note, form]);

  async function onSubmit(values: NoteFormData) {
    try {
      if (note) {
        await updateNote(note.id, values);
      }
    } catch (error) {
      console.error('Form submission error', error);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter note title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter note body"
                  className="max-h-[300px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Save'}
        </Button>
      </form>
    </Form>
  );
}
