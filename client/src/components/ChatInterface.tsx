import { useState, useEffect, useRef } from "react";
import { Send, Mic, Image, Code, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/hooks/useChat";
import { LotusLogo } from "./LotusLogo";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ChatInterfaceProps {
  sessionId: string | null;
}

export function ChatInterface({ sessionId }: ChatInterfaceProps) {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, isSending, error } = useChat(sessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim() || !sessionId || isSending) return;
    
    sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content: string) => {
    // Basic markdown-like formatting for code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = content.split(codeBlockRegex);
    
    return parts.map((part, index) => {
      if (index % 3 === 2) { // This is code content
        const language = parts[index - 1] || 'text';
        return (
          <div key={index} className="code-preview rounded-lg p-4 my-4 border border-golden-400/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-golden-400 font-mono">
                {language} - Sacred Code
              </span>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                  Copy
                </Button>
                <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                  Run
                </Button>
              </div>
            </div>
            <pre className="text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap">
              <code>{part}</code>
            </pre>
          </div>
        );
      } else if (index % 3 === 0) { // Regular text
        return (
          <div key={index} className="whitespace-pre-wrap">
            {part.split('\n').map((line, lineIndex) => (
              <p key={lineIndex} className="mb-2 last:mb-0">
                {line}
              </p>
            ))}
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" id="chat-container">
        
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="text-center py-8">
            <LotusLogo size="lg" className="mx-auto mb-4 animate-float" />
            <h2 className="text-2xl font-serif font-bold mb-2">
              <span className="text-coral-400">Welcome to </span>
              <span className="text-golden-400">Raadhya Tantra</span>
            </h2>
            <p className="text-gray-300 max-w-md mx-auto">
              The most intelligent AI with divine wisdom, technical expertise, and complete protection against all forms of abuse.
            </p>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${
              msg.role === "user" ? "justify-end" : ""
            }`}
          >
            {msg.role === "assistant" && (
              <LotusLogo size="sm" className="flex-shrink-0 mt-1" />
            )}
            
            <div className="flex-1 max-w-3xl">
              <div
                className={`rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "chat-bubble-user text-white ml-auto rounded-tr-sm"
                    : "chat-bubble-ai rounded-tl-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="text-gray-100">
                    {formatMessage(msg.content)}
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mt-3">
                      <span className="flex items-center">
                        <ShieldCheck className="w-3 h-3 text-green-400 mr-1" />
                        Protected Response
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-3 h-3 text-coral-400 mr-1" />
                        With Divine Love
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                )}
              </div>
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 bg-gradient-to-br from-coral-400 to-golden-400 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-4 h-4 rounded-full bg-white/20"></div>
              </div>
            )}
          </div>
        ))}

        {/* Error Display */}
        {error && (
          <Alert className="border-red-500/20 bg-red-500/10">
            <AlertDescription className="text-red-400">
              {error instanceof Error ? error.message : "An error occurred"}
            </AlertDescription>
          </Alert>
        )}

        {/* Loading Indicator */}
        {isSending && (
          <div className="flex items-start space-x-3">
            <LotusLogo size="sm" className="flex-shrink-0 mt-1" />
            <div className="chat-bubble-ai rounded-2xl rounded-tl-sm p-4 max-w-3xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-golden-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-coral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-golden-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-golden-400/20 p-6 bg-deep-purple-800/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full bg-deep-purple-700/50 border border-golden-400/30 rounded-2xl px-4 py-3 pr-12 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-golden-400/50 focus:border-golden-400/50 transition-all min-h-[80px]"
              placeholder="Ask for technical help, spiritual guidance, or both... (Protected by divine wisdom)"
              disabled={!sessionId || isSending}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() || !sessionId || isSending}
              className="absolute right-3 bottom-3 w-8 h-8 lotus-gradient rounded-full p-0 hover:scale-110 transition-transform"
            >
              <Send className="w-4 h-4 text-deep-purple-900" />
            </Button>
          </div>
          
          {/* Input Features */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-coral-400 h-6 px-2">
                <Mic className="w-3 h-3 mr-1" />
                Voice Input
              </Button>
              <Button variant="ghost" size="sm" className="text-golden-400 h-6 px-2">
                <Image className="w-3 h-3 mr-1" />
                Image Upload
              </Button>
              <Button variant="ghost" size="sm" className="text-green-400 h-6 px-2">
                <Code className="w-3 h-3 mr-1" />
                Code Mode
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 flex items-center">
                <ShieldCheck className="w-3 h-3 mr-1" />
                Protected Session
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
