import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-extrabold leading-tight">404</h1>
      <h2 className="text-4xl font-semibold">Page Not Found</h2>
      <p className="my-6 max-w-md text-muted-foreground">
        It looks like the page you are looking for doesn’t exist or may have
        been moved.
      </p>
      <Button size="lg" onClick={() => navigate('/')}>
        Go Back to Home
      </Button>
    </div>
  );
}
