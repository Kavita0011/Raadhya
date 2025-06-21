import { cn } from "@/lib/utils";

interface LotusLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LotusLogo({ className, size = "md" }: LotusLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-16 h-16"
  };

  return (
    <div className={cn(
      "lotus-gradient rounded-full flex items-center justify-center animate-lotus-glow",
      sizeClasses[size],
      className
    )}>
      <svg 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        className="w-1/2 h-1/2 text-deep-purple-900"
      >
        <path d="M12 2C7.58 2 4 5.58 4 10c0 2.5 1.5 4.5 3.5 5.5L12 22l4.5-6.5c2-1 3.5-3 3.5-5.5 0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        <circle cx="12" cy="10" r="1.5"/>
        <path d="M8 8.5c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2 1.5.5 2 0 .5-1.5 0-2zm8 0c.5-.5 1.5-.5 2 0s.5 1.5 0 2-1.5.5-2 0-.5-1.5 0-2z"/>
      </svg>
    </div>
  );
}
