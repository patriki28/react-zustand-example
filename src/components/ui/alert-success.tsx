import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './alert';

interface AlertSuccessProps {
  title?: string;
  message?: string;
}

function AlertSuccess({ title = 'Success', message = '' }: AlertSuccessProps) {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}

export { AlertSuccess };
