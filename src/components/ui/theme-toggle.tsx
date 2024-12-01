import { useTheme } from '@/context/theme-provider';
import { Button } from './button';
import { Moon, Sun } from 'lucide-react';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center justify-center">
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {theme === 'light' ? <Moon /> : <Sun />}
      </Button>
    </div>
  );
}
export { ThemeToggle };
