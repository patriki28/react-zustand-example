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
import { AlertSuccess } from '@/components/ui/alert-success';
import { AlertError } from '@/components/ui/alert-error';

export default function AddNoteForm() {
  const { message, error, isLoading, createNote } = useNoteStore();

  const form = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      title: '',
      body: ''
    }
  });

  async function onSubmit(values: NoteFormData) {
    try {
      await createNote(values);

      form.reset();
    } catch (error) {
      console.error('Form submission error', error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="max-w-md space-y-4 p-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
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
                  placeholder="Enter body"
                  className="max-h-[300px]"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {isLoading ? 'Loading...' : 'Add'}
        </Button>
        {message && <AlertSuccess title="Success" message={message} />}
        {error && <AlertError error={error} />}
      </form>
    </Form>
  );
}
