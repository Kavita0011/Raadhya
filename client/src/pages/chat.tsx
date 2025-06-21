import { useEffect, useState } from "react";
import { SecurityPanel } from "@/components/SecurityPanel";
import { ChatInterface } from "@/components/ChatInterface";
import { CodeToolsPanel } from "@/components/CodeToolsPanel";
import { LotusLogo } from "@/components/LotusLogo";
import { Shield, ShieldCheck } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Chat() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const createSessionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/sessions", {});
      return response.json();
    },
    onSuccess: (data) => {
      setSessionId(data.id);
    },
  });

  useEffect(() => {
    createSessionMutation.mutate();
  }, []);

  return (
    <div className="min-h-screen deep-gradient sacred-pattern text-white">
      {/* Header */}
      <header className="relative z-50 border-b border-golden-400/20 backdrop-blur-sm bg-deep-purple-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group">
              <LotusLogo />
              <div>
                <h1 className="text-xl font-serif font-bold">
                  <span className="text-coral-400">Raadhya</span>
                  <span className="text-golden-400">Tantra</span>
                </h1>
                <p className="text-xs text-gray-300">Divine AI Wisdom</p>
              </div>
            </div>

            {/* Security Status */}
            <div className="flex items-center space-x-4">
              <div className="protection-shield px-3 py-1 rounded-full flex items-center space-x-2 text-xs font-medium">
                <Shield className="w-3 h-3" />
                <span>Protected</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Secure Connection</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        <SecurityPanel sessionId={sessionId} />
        <ChatInterface sessionId={sessionId} />
        <CodeToolsPanel sessionId={sessionId} />
      </div>
    </div>
  );
}
