import { useEffect } from 'react';
import { useNoteStore } from '..';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function NoteList() {
  const navigate = useNavigate();
  const { notes, fetchNotes, isLoading, error } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="flex flex-wrap gap-4">
      {isLoading ? (
        new Array(4)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className="h-[100px] w-[200px]" />
          ))
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || 'Failed to load notes. Please try again later.'}
          </AlertDescription>
        </Alert>
      ) : notes.length === 0 ? (
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No Notes</AlertTitle>
          <AlertDescription>
            You currently have no notes. Start by creating a new one!
          </AlertDescription>
        </Alert>
      ) : (
        notes.map((note) => (
          <Card
            key={note.id}
            className="w-full max-w-[200px] hover:cursor-pointer"
            onClick={() => navigate(`/notes/${note.id}`)}
          >
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
              <CardDescription>{note.body} </CardDescription>
            </CardHeader>
          </Card>
        ))
      )}
    </div>
  );
}
