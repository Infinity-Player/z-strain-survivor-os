import { Battery, Wifi, Signal } from 'lucide-react';

export const StatusHeader = () => {
  return (
    <header className="metal-texture p-4 border-b border-primary/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="glitch neon-flicker text-xl font-bold" data-text="Z-MAP">
            Z-MAP
          </div>
          <div className="text-xs text-hazard-orange scanner-line">
            APOCALYPSE NAVIGATOR
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Network Status */}
          <div className="flex items-center space-x-1">
            <Wifi className="w-4 h-4 text-safe-zone" />
            <span className="text-xs text-muted-foreground">SECURE</span>
          </div>
          
          {/* Signal Strength */}
          <div className="flex items-center space-x-1">
            <Signal className="w-4 h-4 text-survivor-comm" />
            <span className="text-xs text-muted-foreground">STRONG</span>
          </div>
          
          {/* Battery */}
          <div className="flex items-center space-x-1">
            <Battery className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">87%</span>
          </div>
          
          {/* Time */}
          <div className="text-xs text-foreground font-mono">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </header>
  );
};