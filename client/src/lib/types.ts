export interface SecurityStatus {
  threatsBlocked: number;
  safeSessions: number;
  isProtected: boolean;
  lastThreatDetected?: Date;
}

export interface ChatMessage {
  id: number;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  metadata?: any;
}

export interface CodeExecution {
  id: number;
  code: string;
  language: string;
  output?: string;
  error?: string;
  timestamp: Date;
  isSafe: boolean;
}

export interface SecurityEvent {
  id: number;
  eventType: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: Date;
  blocked: boolean;
}

export interface Session {
  id: string;
  threatLevel: number;
  isProtected: boolean;
  createdAt: Date;
  lastActivity: Date;
}
