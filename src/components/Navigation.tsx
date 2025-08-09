import { Eye, Map, MessageCircle, Package, Zap, BookOpen, Bot } from 'lucide-react';
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
    { id: 'missions' as AppView, icon: BookOpen, label: 'MISSIONS', color: 'text-hazard-orange' },
    { id: 'ai' as AppView, icon: Bot, label: 'AI', color: 'text-ai-cyan' },
  ];

  return (
    <nav className="metal-texture p-2 border-t border-primary/30">
      <div className="grid grid-cols-7 gap-1 items-center">
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
                flex flex-col items-center space-y-1 px-1 py-2 text-center
                ${isActive ? 'pulse-danger' : 'hover:bg-muted/50'}
                ${isActive ? item.color : 'text-muted-foreground'}
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'neon-flicker' : ''}`} />
              <span className="text-[10px] font-mono leading-tight">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};