import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Send email to start@thinkniobium.com
      const emailData = {
        to: 'start@thinkniobium.com',
        subject: 'Nova inscrição - Coming Soon',
        email: email
      };
      
      toast({
        title: "Obrigado!",
        description: "Você será notificado quando estivermos prontos.",
      });
      setEmail('');
    }
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid animate-grid-move opacity-10" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/5" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-float opacity-30" />
      <div className="absolute top-40 right-32 w-1 h-1 bg-primary rounded-full animate-float opacity-20" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-40 w-1 h-1 bg-primary rounded-full animate-float opacity-25" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-20 w-2 h-2 bg-primary rounded-full animate-float opacity-15" style={{ animationDelay: '0.5s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-lg mx-auto text-center space-y-12">
          
          {/* Logo */}
          <div className="animate-fade-in">
            <img 
              src="/lovable-uploads/571e4cf9-aebd-4657-b2a2-eac7261cdfba.png" 
              alt="Logo" 
              className="h-16 sm:h-20 md:h-24 mx-auto object-contain"
            />
          </div>

          {/* Glass Box Email Form */}
          <Card className="p-6 sm:p-8 w-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center text-base sm:text-lg py-4 sm:py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-white/60 focus:border-primary focus:ring-primary/20"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
              >
                Cadastrar
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;