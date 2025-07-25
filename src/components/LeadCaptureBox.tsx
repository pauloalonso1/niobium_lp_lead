// Este arquivo demonstra um componente React para um box de captura de leads.
// Ele pode ser adicionado ao seu projeto Vite/React e estilizado com Tailwind ou Shadcn UI.
// O componente utiliza um card para centralizar o conteúdo, captura o e‑mail do usuário
// e envia os dados para um endpoint que você definirá. Para salvar os leads em
// uma planilha Google, você pode criar um Google Apps Script que escute requisições
// POST (veja o README ou instruções fornecidas) e retornar um JSON de sucesso.

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

/**
 * LeadCaptureBox exibe um formulário simples para captar o e‑mail de um visitante.
 * Ao enviar, ele faz uma requisição POST para um endpoint externo (ex.: Apps Script
 * do Google) que armazena o e‑mail em uma planilha. Ajuste a constante
 * `GOOGLE_SCRIPT_URL` ou defina a variável de ambiente VITE_GOOGLE_SCRIPT_URL
 * com o endereço do seu script publicado.
 */
const LeadCaptureBox = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // Usa variável de ambiente se disponível; para evitar erro de tipagem
  // fazemos um cast de import.meta para any. Se a variável não existir,
  // substitua pela URL do seu Apps Script terminada em /exec.
  const GOOGLE_SCRIPT_URL =
    ((import.meta as any).env?.VITE_GOOGLE_SCRIPT_URL as string | undefined) ||
    'https://script.google.com/macros/s/AKfycbxURsNciWfPOjJPKNjQb1BHlAlzjKCZasvcIg00Xq4_oKFYrdwSnWcA43vk2YBI0e4nqQ/exec';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Envia o e‑mail para o Apps Script via POST
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // evita bloqueio CORS ao chamar o Apps Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Notifica o usuário e limpa o campo
      toast({
      title: 'Inscrição realizada!',
      description: 'Você receberá nossas novidades por e‑mail em breve.',
      });
      setEmail('');
    } catch (err) {
      console.error(err);
      toast({
        title: 'Erro inesperado',
        description: 'Ocorreu um problema ao enviar seus dados.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 space-y-4 bg-white/10 backdrop-blur-md rounded-xl shadow-xl">
      <h3 className="text-2xl font-semibold text-center">Receba Nossas Novidades</h3>
      <p className="text-sm text-center text-muted-foreground">
        Inscreva‑se para obter conteúdos exclusivos e atualizações.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Input
          type="email"
          placeholder="Seu melhor e‑mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-transparent border border-border/50 focus:ring-primary focus:border-primary"
        />
        <Button type="submit" className="w-full">
          Quero receber novidades
        </Button>
      </form>
      <p className="text-xs text-center text-muted-foreground">
        Não enviamos spam. Ao cadastrar, você concorda com nossa política de privacidade.
      </p>
    </Card>
  );
};

export default LeadCaptureBox;
