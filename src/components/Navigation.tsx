import { Eye, Map, MessageCircle, Package, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AppView } from '@/pages/Index';

interface NavigationProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const navItems = [
    { id: 'detector' as AppView, icon: Eye, label: 'DETECT', color: 'text-thermal-glow' },
    { id: 'map' as AppView, icon: Map, label: 'SHELTER', color: 'text-safe-zone' },
    { id: 'comms' as AppView, icon: MessageCircle, label: 'COMMS', color: 'text-survivor-comm' },
    { id: 'supplies' as AppView, icon: Package, label: 'SUPPLY', color: 'text-accent' },
    { id: 'sos' as AppView, icon: Zap, label: 'SOS', color: 'text-primary' },
  ];

  return (
    <nav className="metal-texture p-4 border-t border-primary/30">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onViewChange(item.id)}
              className={`
                flex flex-col items-center space-y-1 px-2 py-3 min-w-[60px]
                ${isActive ? 'pulse-danger' : 'hover:bg-muted/50'}
                ${isActive ? item.color : 'text-muted-foreground'}
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'neon-flicker' : ''}`} />
              <span className="text-xs font-mono">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};