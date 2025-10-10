import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);
export const FROM = process.env.FROM_EMAIL!;
export const TO = process.env.NOTIFY_EMAIL!;
