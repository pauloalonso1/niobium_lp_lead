import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ComingSoon = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
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
      <div className="absolute inset-0 bg-grid-pattern bg-grid animate-grid-move opacity-20" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-secondary" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-40 right-32 w-3 h-3 bg-primary-glow rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-40 w-2 h-2 bg-primary rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 right-20 w-5 h-5 bg-primary-glow rounded-full animate-float opacity-30" style={{ animationDelay: '0.5s' }} />
      
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo/Brand Area */}
          <div className="mb-8 animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-2xl flex items-center justify-center animate-glow-pulse">
              <div className="w-8 h-8 bg-foreground rounded-lg" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Sua Empresa</h1>
          </div>

          {/* Main Heading */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Algo incrível
              <br />
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                está chegando
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Estamos preparando uma experiência revolucionária que vai transformar 
              a forma como você trabalha. Seja o primeiro a saber quando estivermos prontos.
            </p>
          </div>

          {/* Email Signup */}
          <Card className="p-8 max-w-md mx-auto bg-card/50 backdrop-blur-sm border-border/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-center text-lg py-6 bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full py-6 text-lg font-semibold bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl"
              >
                Quero ser notificado
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-4">
              Não enviamos spam. Apenas atualizações importantes.
            </p>
          </Card>

          {/* Progress/Timeline */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
                <span>Em desenvolvimento</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-muted rounded-full" />
                <span>Testes finais</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-muted rounded-full" />
                <span>Lançamento</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;