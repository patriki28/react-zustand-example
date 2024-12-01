import { useEffect } from 'react';
import { useNoteStore } from '@/features/notes';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export default function ViewNotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchNoteById, deleteNote, note, isLoading, error } = useNoteStore();

  useEffect(() => {
    if (id) {
      fetchNoteById(id);
    }
  }, [id, fetchNoteById]);

  async function handleDelete(noteId: string) {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    await deleteNote(noteId);
    navigate('/');
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
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Failed to load notes. Please try again later.'}
          </AlertDescription>
        </Alert>
      ) : !note ? (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Note not found.</AlertTitle>
          <AlertDescription>
            The requested note does not exist or has been deleted.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="max-w-md space-y-4 p-2">
          <UpdateNoteForm id={id} title={note.title} body={note.body} />
          <Separator />
          <Button
            variant="destructive"
            className="w-full"
            onClick={() => handleDelete(id!)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
