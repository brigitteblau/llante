import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5),
  locale: z.string().optional(),
  // honeypot:
  website: z.string().optional()
});

export const ApplySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.string().optional(),
  link: z.string().url().optional(),
  notes: z.string().optional(),
  locale: z.string().optional(),
  website: z.string().optional()
});
