import { useState } from 'react';
import { createClient } from '@/app/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface ApplicationFormProps {
  onSuccess?: () => void;
}

export function ApplicationForm({ onSuccess }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const system_id = formData.get('system_id') as string;

    try {
      const { error } = await supabase
        .from('applications')
        .insert([{ name, description, system_id }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Application created successfully',
      });

      // Reset form
      e.currentTarget.reset();
      
      // Call success callback if provided
      onSuccess?.();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create application',
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
          placeholder="Enter application name"
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
          placeholder="Enter application description"
        />
      </div>

      <div>
        <label htmlFor="system_id" className="block text-sm font-medium mb-1">
          System ID
        </label>
        <Input
          id="system_id"
          name="system_id"
          required
          placeholder="Enter system ID"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Application'}
      </Button>
    </form>
  );
} 