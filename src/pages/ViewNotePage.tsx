import { useNoteStore } from '@/features/notes/store';
import { useNavigate, useParams } from 'react-router-dom';
import UpdateNoteForm from '@/features/notes/components/UpdateNoteForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { AlertSuccess } from '@/components/ui/alert-success';
import { AlertError } from '@/components/ui/alert-error';

export default function ViewNotePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { deleteNote, message, error } = useNoteStore();

  async function handleDelete(noteId: string) {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(noteId);
      navigate('/');
    } catch (error) {
      console.error('Deleting note error', error);
    }
  }

  function renderContent() {
    return (
      <div className="max-w-md space-y-4">
        <UpdateNoteForm noteId={id} />
        <Separator />
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => id && handleDelete(id)}
        >
          Delete
        </Button>
        {message && <AlertSuccess title="Success" message={message} />}
        {error && <AlertError error={error} />}
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>/</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="p-2">{renderContent()}</div>
    </div>
  );
}
