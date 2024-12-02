import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { NoteProps } from '../utils/note.schema';

export default function NoteCard({ note }: NoteProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="w-full hover:cursor-pointer"
      onClick={() => navigate(`/notes/${note.id}`)}
    >
      <CardHeader>
        <CardTitle>{note.title}</CardTitle>
        <CardDescription>{note.body}</CardDescription>
      </CardHeader>
    </Card>
  );
}
