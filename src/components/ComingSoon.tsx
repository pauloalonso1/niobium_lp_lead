import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import ShinyText from '@/components/TextAnimations/ShinyText/ShinyText';
import DarkVeil from '@/components/DarkVeil/DarkVeil'; // ajuste o path se necessário

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const GOOGLE_SCRIPT_URL =
    import.meta.env.VITE_GOOGLE_SCRIPT_URL ||
    'https://script.google.com/macros/s/AKfycbxURsNciWfPOjJPKNjQb1BHlAlzjKCZasvcIg00Xq4_oKFYrdwSnWcA43vk2YBI0e4nqQ/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ email }),
      });

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
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* DarkVeil BG fixo */}
      <div className="absolute inset-0 z-0">
        <DarkVeil
          hueShift={80} // tom verde-limão sutil
          noiseIntensity={0.015}
          scanlineIntensity={0.04}
          scanlineFrequency={3.0}
          warpAmount={0.015}
          speed={0.5}
        />
      </div>

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md text-center space-y-8">
          <img
            src="/images/0a18f2aa-8bb4-4b7f-a68e-2ea20f5d9ee6.png"
            alt="Niobium Logo"
            className="h-12 sm:h-16 mx-auto object-contain"
          />

          <ShinyText
            text="Coming Soon"
            speed={4}
            className="text-2xl sm:text-3xl font-normal mb-4"
          />

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-base py-4 px-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-1 focus:ring-primary/30 rounded-lg"
              required
            />
            <Button
              type="submit"
              className="w-full py-4 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 rounded-lg"
            >
              Quero ser notificado
            </Button>
          </form>

          <p className="text-sm text-white/60">
            Não enviamos spam. Apenas atualizações importantes.
          </p>

          <p className="text-sm text-white/50">start@thinkniobium.com</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
