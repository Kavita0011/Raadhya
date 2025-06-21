import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  role: text("role", { enum: ["user", "assistant"] }).notNull(),
  sessionId: text("session_id").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  metadata: jsonb("metadata"),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  threatLevel: integer("threat_level").default(0),
  isProtected: boolean("is_protected").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastActivity: timestamp("last_activity").defaultNow().notNull(),
});

export const securityEvents = pgTable("security_events", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  eventType: text("event_type").notNull(),
  severity: text("severity", { enum: ["low", "medium", "high", "critical"] }).notNull(),
  description: text("description").notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  blocked: boolean("blocked").default(false),
});

export const codeExecutions = pgTable("code_executions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  output: text("output"),
  error: text("error"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  isSafe: boolean("is_safe").default(true),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  role: true,
  sessionId: true,
  metadata: true,
});

export const insertSessionSchema = createInsertSchema(sessions).pick({
  id: true,
});

export const insertSecurityEventSchema = createInsertSchema(securityEvents).pick({
  sessionId: true,
  eventType: true,
  severity: true,
  description: true,
  blocked: true,
});

export const insertCodeExecutionSchema = createInsertSchema(codeExecutions).pick({
  sessionId: true,
  code: true,
  language: true,
  output: true,
  error: true,
  isSafe: true,
});

export const chatRequestSchema = z.object({
  message: z.string().min(1).max(5000),
  sessionId: z.string(),
});

export const codeExecutionRequestSchema = z.object({
  code: z.string().min(1),
  language: z.string(),
  sessionId: z.string(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Session = typeof sessions.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type SecurityEvent = typeof securityEvents.$inferSelect;
export type InsertSecurityEvent = z.infer<typeof insertSecurityEventSchema>;
export type CodeExecution = typeof codeExecutions.$inferSelect;
export type InsertCodeExecution = z.infer<typeof insertCodeExecutionSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type CodeExecutionRequest = z.infer<typeof codeExecutionRequestSchema>;
