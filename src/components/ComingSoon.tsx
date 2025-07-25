import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // Defina aqui a URL do seu Apps Script. 
  // Alternativamente, use import.meta.env.VITE_GOOGLE_SCRIPT_URL para ler do .env
  const GOOGLE_SCRIPT_URL =
    import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
    'https://script.google.com/macros/s/AKfycbw5ccy7KQcYhfYkrAj80Bg4vT3-HtMQ7-76UtoWU8Fx/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Envia o e-mail para o Apps Script via POST
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // use no-cors se não configurar CORS no script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Notifica o usuário e limpa o campo
      toast({
        title: 'Obrigado!',
        description: 'Você será notificado quando estivermos prontos.',
      });
      setEmail('');
    } catch (err) {
      toast({
        title: 'Erro ao enviar',
        description: 'Não foi possível registrar seu contato.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-15" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="animate-fade-in">
            <img
              src="/lovable-uploads/0a18f2aa-8bb4-4b7f-a68e-2ea20f5d9ee6.png"
              alt="Niobium Logo"
              className="h-12 sm:h-16 mx-auto object-contain mb-8"
            />
          </div>

          {/* Coming Soon Text */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl sm:text-3xl font-normal text-foreground mb-8">
              Coming Soon
            </h2>
          </div>

          {/* Email Form */}
          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-base py-4 px-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-lg"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full py-4 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-lg"
              >
                Quero ser notificado
              </Button>
            </form>

            <p className="text-sm text-white/60 mt-4">
              Não enviamos spam. Apenas atualizações importantes.
            </p>
          </div>

          {/* Contact Email */}
          <div className="pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <p className="text-sm text-white/50">
              start@thinkniobium.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
