import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const LeadCaptureBox = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const GOOGLE_SCRIPT_URL =
    import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
    'https://script.google.com/macros/s/AKfycbxURsNciWfPOjJPKNjQb1BHlAlzjKCZasvcIg00Xq4_oKFYrdwSnWcA43vk2YBI0e4nqQ/exec;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: 'Inscrição realizada!',
          description: result.message,
        });
        setEmail('');
      } else {
        toast({
          title: 'Erro ao enviar',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (err) {
      toast({
        title: 'Erro de conexão',
        description: 'Não foi possível se conectar ao servidor.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-6 bg-white/10 backdrop-blur-md rounded-xl">
      <h3 className="text-2xl font-semibold text-center">Receba nossas novidades</h3>
      <Input
        type="email"
        placeholder="Seu melhor e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-transparent border border-border/50 focus:ring-primary focus:border-primary"
      />
      <Button type="submit" className="w-full">
        Quero receber novidades
      </Button>
      <p className="text-xs text-center text-muted-foreground">
        Não enviamos spam. Apenas atualizações importantes.
      </p>
    </form>
  );
};

export default LeadCaptureBox;

return ContentService.createTextOutput(JSON.stringify(response))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeader("Access-Control-Allow-Origin", "*");