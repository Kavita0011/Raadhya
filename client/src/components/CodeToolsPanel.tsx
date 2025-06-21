import { useState } from "react";
import { Play, Copy, Expand, Share, Infinity, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface CodeToolsPanelProps {
  sessionId: string | null;
}

export function CodeToolsPanel({ sessionId }: CodeToolsPanelProps) {
  const [lastExecution, setLastExecution] = useState<any>(null);

  const executeCodeMutation = useMutation({
    mutationFn: async (code: { code: string; language: string }) => {
      if (!sessionId) throw new Error("No session");
      
      const response = await apiRequest("POST", "/api/code/execute", {
        ...code,
        sessionId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setLastExecution(data);
    },
  });

  const sampleCode = `import math

class SacredGeometry:
    @staticmethod
    def golden_ratio():
        return (1 + math.sqrt(5)) / 2
    
    @staticmethod
    def lotus_petals(layers=3):
        fibonacci = [1, 1]
        for i in range(layers):
            fibonacci.append(fibonacci[-1] + fibonacci[-2])
        return fibonacci

sacred = SacredGeometry()
print(f"Golden Ratio: {sacred.golden_ratio():.6f}")
print(f"Lotus Petals: {sacred.lotus_petals()}")`;

  const handleRunCode = () => {
    executeCodeMutation.mutate({
      code: sampleCode,
      language: "python"
    });
  };

  return (
    <div className="w-80 border-l border-golden-400/20 p-6 space-y-6 bg-deep-purple-800/30 backdrop-blur-sm overflow-y-auto">
      
      {/* Live Code Preview */}
      <Card className="code-preview rounded-xl border border-golden-400/20 overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-golden-400/20">
          <h3 className="font-semibold text-golden-400">Live Preview</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
              <Expand className="w-3 h-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-6 px-2 text-green-400"
              onClick={handleRunCode}
              disabled={executeCodeMutation.isPending}
            >
              <Play className="w-3 h-3" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <div className="bg-deep-purple-900/50 rounded p-3 text-xs font-mono">
            {executeCodeMutation.isPending ? (
              <div className="text-golden-400">Executing with divine precision...</div>
            ) : lastExecution ? (
              <div>
                <div className="text-green-400">{lastExecution.output}</div>
                {lastExecution.error && (
                  <div className="text-red-400 mt-2">{lastExecution.error}</div>
                )}
              </div>
            ) : (
              <div>
                <div className="text-green-400">Golden Ratio: 1.618034</div>
                <div className="text-green-400">Lotus Petals: [1, 1, 2, 3, 5]</div>
                <div className="text-coral-400">✨ Code executed with divine precision</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Sacred Sharing */}
      <Card className="bg-gradient-to-r from-golden-400/10 to-coral-400/10 border border-golden-400/20 p-4">
        <h3 className="font-semibold text-golden-400 mb-3">Sacred Sharing</h3>
        <p className="text-sm text-gray-300 mb-4">Share solutions with divine protection</p>
        <Button className="w-full bg-gradient-to-r from-coral-400 to-golden-400 text-deep-purple-900 font-semibold hover:scale-105 transition-transform">
          <Share className="w-4 h-4 mr-2" />
          Create Protected Link
        </Button>
      </Card>

      {/* Spiritual Wisdom */}
      <Card className="text-center p-4 bg-deep-purple-700/30 border border-coral-400/20">
        <div className="w-12 h-12 mx-auto mb-3 border-2 border-coral-400/50 rounded-full flex items-center justify-center animate-sacred-pulse">
          <div className="text-coral-400 text-lg">ॐ</div>
        </div>
        <blockquote className="text-sm italic text-gray-300 mb-2">
          "Just as the lotus rises from muddy waters to bloom in purity, 
          let your code emerge from complexity to elegant simplicity."
        </blockquote>
        <cite className="text-xs text-golden-400">- Ancient Programming Wisdom</cite>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold text-golden-400">Quick Divine Actions</h3>
        <div className="grid grid-cols-1 gap-2">
          <Button 
            variant="ghost" 
            className="justify-start p-3 bg-deep-purple-700/50 hover:bg-deep-purple-700/70 h-auto"
          >
            <div className="text-coral-400 mr-2">🧘</div>
            <span className="text-sm">Morning Code Blessing</span>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start p-3 bg-deep-purple-700/50 hover:bg-deep-purple-700/70 h-auto"
          >
            <Shield className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm">Security Scan</span>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start p-3 bg-deep-purple-700/50 hover:bg-deep-purple-700/70 h-auto"
          >
            <Infinity className="w-4 h-4 text-golden-400 mr-2" />
            <span className="text-sm">Infinite Learning Mode</span>
          </Button>
        </div>
      </div>

      {/* Model Status */}
      <Card className="text-center p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
        <div className="flex items-center justify-center mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
          <span className="text-sm font-semibold text-green-400">Model Status: Divine</span>
        </div>
        <p className="text-xs text-gray-400">
          Operating at peak spiritual-technical intelligence with complete selfless service orientation
        </p>
      </Card>

      {/* Sacred Geometry Animation */}
      <div className="text-center py-4">
        <div className="w-20 h-20 mx-auto relative">
          <div className="absolute inset-0 border border-golden-400/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute inset-2 border border-coral-400/30 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-4 border border-golden-400/50 rounded-full animate-pulse"></div>
          <div className="absolute inset-6 bg-coral-400/20 rounded-full"></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Divine Sacred Geometry</p>
      </div>
    </div>
  );
}
