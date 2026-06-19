import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().min(8, "Informe um telefone válido."),
  paymentMethod: z.enum(["PIX", "CREDIT_CARD", "BOLETO", "SIMULATED"]),
  notes: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string().min(3),
  priceCents: z.number().int().positive(),
  supplierCostCents: z.number().int().positive(),
  departmentId: z.string(),
  categoryId: z.string(),
  supplierId: z.string(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ProductInput = z.infer<typeof productSchema>;
