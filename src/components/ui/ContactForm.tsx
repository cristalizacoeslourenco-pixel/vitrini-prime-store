"use client";

import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { CheckCircle } from "lucide-react";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", order: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (form.name.trim().length < 3) e.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido.";
    if (form.message.trim().length < 10) e.message = "Descreva sua dúvida ou problema.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-light-gray bg-white/90 py-12 text-center">
        <CheckCircle size={40} className="text-petrol" />
        <div>
          <p className="font-semibold text-graphite">Mensagem enviada!</p>
          <p className="mt-1 text-sm text-text-gray">
            Retornaremos em até 1 dia útil no e-mail informado.
          </p>
        </div>
        <button
          onClick={() => { setSent(false); setForm({ name: "", email: "", order: "", message: "" }); }}
          className="text-sm text-text-gray hover:text-champagne transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-light-gray bg-white/90 p-6 space-y-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-graphite">Nome *</label>
          <Input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Seu nome"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-graphite">E-mail *</label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="seu@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-graphite">
          Número do pedido (opcional)
        </label>
        <Input
          value={form.order}
          onChange={(e) => set("order", e.target.value)}
          placeholder="VP-XXXXX-XXXX"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-graphite">Mensagem *</label>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={4}
          placeholder="Descreva sua dúvida, problema ou sugestão…"
          className="w-full rounded-xl border border-light-gray bg-white px-4 py-2.5 text-sm text-graphite placeholder:text-text-gray/50 focus:border-champagne focus:outline-none resize-none"
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>
      <Button type="submit" variant="primary">
        Enviar mensagem
      </Button>
      <p className="text-xs text-text-gray/50">
        * Este formulário é uma demonstração. Em produção, as mensagens serão
        encaminhadas ao e-mail de suporte real.
      </p>
    </form>
  );
}
