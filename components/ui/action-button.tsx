import { Button } from './button';
import { ButtonProps } from './button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ActionButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function ActionButton({
  children,
  isLoading,
  loadingText,
  className,
  disabled,
  ...props
}: ActionButtonProps) {
  return (
    <Button className={cn('relative', className)} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
      {isLoading && loadingText ? loadingText : children}
    </Button>
  );
}
