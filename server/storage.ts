import { 
  messages, sessions, securityEvents, codeExecutions,
  type Message, type InsertMessage,
  type Session, type InsertSession,
  type SecurityEvent, type InsertSecurityEvent,
  type CodeExecution, type InsertCodeExecution
} from "@shared/schema";

export interface IStorage {
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  getMessagesBySession(sessionId: string): Promise<Message[]>;
  
  // Sessions
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  updateSessionActivity(id: string): Promise<void>;
  updateSessionThreatLevel(id: string, level: number): Promise<void>;
  
  // Security Events
  createSecurityEvent(event: InsertSecurityEvent): Promise<SecurityEvent>;
  getSecurityEventsBySession(sessionId: string): Promise<SecurityEvent[]>;
  getSecurityStats(): Promise<{ threatsBlocked: number; safeSessions: number }>;
  
  // Code Executions
  createCodeExecution(execution: InsertCodeExecution): Promise<CodeExecution>;
  getCodeExecutionsBySession(sessionId: string): Promise<CodeExecution[]>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message> = new Map();
  private sessions: Map<string, Session> = new Map();
  private securityEvents: Map<number, SecurityEvent> = new Map();
  private codeExecutions: Map<number, CodeExecution> = new Map();
  
  private currentMessageId = 1;
  private currentSecurityEventId = 1;
  private currentCodeExecutionId = 1;

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      metadata: insertMessage.metadata || null,
    };
    this.messages.set(id, message);
    return message;
  }

  async getMessagesBySession(sessionId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(message => message.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  async createSession(insertSession: InsertSession): Promise<Session> {
    const session: Session = {
      ...insertSession,
      threatLevel: 0,
      isProtected: true,
      createdAt: new Date(),
      lastActivity: new Date(),
    };
    this.sessions.set(session.id, session);
    return session;
  }

  async getSession(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async updateSessionActivity(id: string): Promise<void> {
    const session = this.sessions.get(id);
    if (session) {
      session.lastActivity = new Date();
      this.sessions.set(id, session);
    }
  }

  async updateSessionThreatLevel(id: string, level: number): Promise<void> {
    const session = this.sessions.get(id);
    if (session) {
      session.threatLevel = level;
      this.sessions.set(id, session);
    }
  }

  async createSecurityEvent(insertEvent: InsertSecurityEvent): Promise<SecurityEvent> {
    const id = this.currentSecurityEventId++;
    const event: SecurityEvent = {
      ...insertEvent,
      id,
      timestamp: new Date(),
      blocked: insertEvent.blocked ?? false,
    };
    this.securityEvents.set(id, event);
    return event;
  }

  async getSecurityEventsBySession(sessionId: string): Promise<SecurityEvent[]> {
    return Array.from(this.securityEvents.values())
      .filter(event => event.sessionId === sessionId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async getSecurityStats(): Promise<{ threatsBlocked: number; safeSessions: number }> {
    const threatEvents = Array.from(this.securityEvents.values())
      .filter(event => event.blocked);
    const totalSessions = this.sessions.size;
    
    return {
      threatsBlocked: threatEvents.length,
      safeSessions: totalSessions,
    };
  }

  async createCodeExecution(insertExecution: InsertCodeExecution): Promise<CodeExecution> {
    const id = this.currentCodeExecutionId++;
    const execution: CodeExecution = {
      ...insertExecution,
      id,
      timestamp: new Date(),
      output: insertExecution.output || null,
      error: insertExecution.error || null,
      isSafe: insertExecution.isSafe ?? true,
    };
    this.codeExecutions.set(id, execution);
    return execution;
  }

  async getCodeExecutionsBySession(sessionId: string): Promise<CodeExecution[]> {
    return Array.from(this.codeExecutions.values())
      .filter(execution => execution.sessionId === sessionId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
}

export const storage = new MemStorage();
