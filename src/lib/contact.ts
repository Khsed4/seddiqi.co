export const contactTopics = ["Project inquiry", "Employment opportunity", "Collaboration", "Just saying hello"] as const;

export type ContactMessage = {
  name: string;
  email: string;
  topic: string;
  message: string;
  submissionId: string;
};

export function validateContact(value: unknown): ContactMessage | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  for (const field of ["name", "email", "topic", "message", "submissionId"]) {
    if (typeof data[field] !== "string") return null;
  }
  if (data.website !== undefined && data.website !== "") return null;
  const name = (data.name as string).trim();
  const email = (data.email as string).trim();
  const topic = data.topic as string;
  const message = (data.message as string).trim();
  const submissionId = data.submissionId as string;
  if (!name || name.length > 100 || /[\r\n]/.test(name)) return null;
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (!contactTopics.some((item) => item === topic)) return null;
  if (message.length < 10 || message.length > 1500) return null;
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(submissionId)) return null;
  return { name, email, topic, message, submissionId };
}
