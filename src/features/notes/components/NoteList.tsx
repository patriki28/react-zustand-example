import { useEffect } from 'react';
import { useNoteStore } from '../store';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertError } from '@/components/ui/alert-error';
import NoteCard from './NoteCard';

export default function NoteList() {
  const { notes, fetchNotes, isLoading, error } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  function renderContent() {
    if (isLoading)
      return (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {new Array(3).fill(null).map((_, index) => (
            <Skeleton key={index} className="h-[100px] w-full" />
          ))}
        </div>
      );
    if (!isLoading && error)
      return (
        <AlertError
          error={error || 'Failed to load notes. Please try again later.'}
        />
      );
    if (!isLoading && !error && notes.length === 0)
      return (
        <AlertError
          title="Notes is empty."
          error="You currently have no notes. Start by creating a new one!"
        />
      );

    return (
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    );
  }
  return <div>{renderContent()}</div>;
}
