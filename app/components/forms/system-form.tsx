import { useState } from 'react';
import { createClient } from '@/app/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface SystemFormProps {
  onSuccess?: () => void;
}

export function SystemForm({ onSuccess }: SystemFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    try {
      const { error } = await supabase
        .from('systems')
        .insert([{ name, description }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'System created successfully',
      });

      // Reset form
      e.currentTarget.reset();
      
      // Call success callback if provided
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create system',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Enter system name"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Enter system description"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create System'}
      </Button>
    </form>
  );
} 