import { Shield, ShieldCheck, Lock, Eye, Activity } from "lucide-react";
import { useSecurity } from "@/hooks/useSecurity";
import { Card } from "@/components/ui/card";

interface SecurityPanelProps {
  sessionId: string | null;
}

export function SecurityPanel({ sessionId }: SecurityPanelProps) {
  const { securityStatus, isLoading } = useSecurity(sessionId);

  if (isLoading) {
    return (
      <div className="w-80 border-r border-golden-400/20 p-6 space-y-6 bg-deep-purple-800/30 backdrop-blur-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-deep-purple-700 rounded"></div>
          <div className="h-20 bg-deep-purple-700 rounded"></div>
          <div className="h-20 bg-deep-purple-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-golden-400/20 p-6 space-y-6 bg-deep-purple-800/30 backdrop-blur-sm overflow-y-auto">
      <div className="text-center">
        <h2 className="text-lg font-serif font-semibold text-golden-400 mb-2">
          Divine Protection
        </h2>
        <p className="text-sm text-gray-300">
          Advanced threat detection & spiritual safeguarding
        </p>
      </div>

      {/* Threat Protection Status */}
      <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-green-400">Threat Detection</h3>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Content Filtering</span>
            <span className="text-green-400">Active</span>
          </div>
          <div className="flex justify-between">
            <span>Abuse Prevention</span>
            <span className="text-green-400">Enabled</span>
          </div>
          <div className="flex justify-between">
            <span>Scammer Detection</span>
            <span className="text-green-400">Online</span>
          </div>
        </div>
      </Card>

      {/* Privacy Protection */}
      <Card className="bg-gradient-to-r from-golden-400/10 to-coral-400/10 border-golden-400/20 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-golden-400">Privacy Shield</h3>
          <Lock className="w-4 h-4 text-golden-400" />
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Data Encryption</span>
            <span className="text-golden-400">256-bit</span>
          </div>
          <div className="flex justify-between">
            <span>Memory Protection</span>
            <span className="text-golden-400">Secured</span>
          </div>
          <div className="flex justify-between">
            <span>Session Isolation</span>
            <span className="text-golden-400">Active</span>
          </div>
        </div>
      </Card>

      {/* Sacred Geometry Decoration */}
      <div className="text-center py-6">
        <div className="w-16 h-16 mx-auto border-2 border-golden-400/30 rounded-full flex items-center justify-center animate-sacred-pulse">
          <div className="w-8 h-8 border-2 border-coral-400/50 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-golden-400 rounded-full"></div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Sacred Protection Mandala</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-deep-purple-700/50 rounded-lg">
          <div className="text-xl font-bold text-coral-400">
            {securityStatus.threatsBlocked}
          </div>
          <div className="text-xs text-gray-400">Threats Blocked</div>
        </div>
        <div className="text-center p-3 bg-deep-purple-700/50 rounded-lg">
          <div className="text-xl font-bold text-golden-400">100%</div>
          <div className="text-xs text-gray-400">Safe Sessions</div>
        </div>
      </div>

      {/* Security Features */}
      <div className="space-y-3">
        <h3 className="font-semibold text-golden-400 text-sm">Security Features</h3>
        <div className="space-y-2">
          <div className="flex items-center text-xs text-green-400">
            <ShieldCheck className="w-3 h-3 mr-2" />
            Real-time Threat Scanning
          </div>
          <div className="flex items-center text-xs text-green-400">
            <Eye className="w-3 h-3 mr-2" />
            Behavioral Analysis
          </div>
          <div className="flex items-center text-xs text-green-400">
            <Activity className="w-3 h-3 mr-2" />
            Divine Pattern Recognition
          </div>
          <div className="flex items-center text-xs text-green-400">
            <Shield className="w-3 h-3 mr-2" />
            Sacred Content Protection
          </div>
        </div>
      </div>
    </div>
  );
}
