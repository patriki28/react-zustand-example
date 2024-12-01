import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ui/theme-toggle';
import { Separator } from '../ui/separator';
import { useNoteStore } from '@/features/notes';

export default function HomeLayout() {
  const navigate = useNavigate();
  const { deleteAllNotes } = useNoteStore();

  async function handleDeleteAllNotes() {
    if (!window.confirm('Are you want to delete all these notes?')) return;
    await deleteAllNotes();
  }

  return (
    <div className="container mx-auto max-w-5xl p-4">
      <header className="sticky left-0 top-0 flex items-center justify-between gap-4 bg-background py-2">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="text-xl font-semibold"
        >
          Notes
        </Button>
        <div className="flex h-10 flex-wrap items-center gap-2 text-sm">
          <Button onClick={() => navigate('/notes/add')}>Add</Button>
          <Button variant="destructive" onClick={handleDeleteAllNotes}>
            Delete All
          </Button>
          <Separator orientation="vertical" />
          <ThemeToggle />
        </div>
      </header>
      <main className="overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
