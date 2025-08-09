import { useState } from 'react';
import { Package, Plus, Minus, AlertTriangle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface Supply {
  id: string;
  name: string;
  current: number;
  max: number;
  critical: number;
  unit: string;
  category: 'food' | 'water' | 'ammo' | 'medical';
}

export const SupplyTracker = () => {
  const [supplies, setSupplies] = useState<Supply[]>([
    { id: '1', name: 'Food Rations', current: 8, max: 20, critical: 5, unit: 'meals', category: 'food' },
    { id: '2', name: 'Water', current: 3, max: 10, critical: 2, unit: 'liters', category: 'water' },
    { id: '3', name: 'Ammunition', current: 45, max: 100, critical: 20, unit: 'rounds', category: 'ammo' },
    { id: '4', name: 'Medical Supplies', current: 2, max: 8, critical: 3, unit: 'kits', category: 'medical' },
    { id: '5', name: 'Batteries', current: 12, max: 15, critical: 5, unit: 'units', category: 'food' },
  ]);

  const updateSupply = (id: string, change: number) => {
    setSupplies(prev => prev.map(supply => 
      supply.id === id 
        ? { ...supply, current: Math.max(0, Math.min(supply.max, supply.current + change)) }
        : supply
    ));
  };

  const getSupplyStatus = (supply: Supply) => {
    const percentage = (supply.current / supply.max) * 100;
    if (supply.current <= supply.critical) return { color: 'text-danger-zone', status: 'CRITICAL' };
    if (percentage <= 30) return { color: 'text-hazard-orange', status: 'LOW' };
    if (percentage <= 60) return { color: 'text-accent', status: 'MODERATE' };
    return { color: 'text-safe-zone', status: 'GOOD' };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return '🍞';
      case 'water': return '💧';
      case 'ammo': return '🔫';
      case 'medical': return '🏥';
      default: return '📦';
    }
  };

  const criticalSupplies = supplies.filter(s => s.current <= s.critical);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-accent mb-2 glitch" data-text="SUPPLY TRACKER">
          SUPPLY TRACKER
        </h2>
        <p className="text-sm text-muted-foreground">
          Inventory management system - Track your survival resources
        </p>
      </div>

      {/* Critical alerts */}
      {criticalSupplies.length > 0 && (
        <Card className="mb-4 p-3 metal-texture border-danger-zone/50 bg-danger-zone/10">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-danger-zone neon-flicker" />
            <span className="font-bold text-danger-zone">CRITICAL SUPPLY ALERT</span>
          </div>
          <div className="text-sm text-foreground">
            {criticalSupplies.map(s => s.name).join(', ')} running dangerously low!
          </div>
        </Card>
      )}

      {/* Supply list */}
      <div className="flex-1 space-y-3 overflow-y-auto">
        {supplies.map((supply) => {
          const status = getSupplyStatus(supply);
          const percentage = (supply.current / supply.max) * 100;
          
          return (
            <Card key={supply.id} className="p-4 metal-texture border-primary/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getCategoryIcon(supply.category)}</span>
                  <div>
                    <h3 className="font-mono text-sm font-medium">{supply.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {supply.current}/{supply.max} {supply.unit}
                      </span>
                      <Badge 
                        variant={status.status === 'CRITICAL' ? 'destructive' : 'outline'}
                        className={`text-xs ${status.color}`}
                      >
                        {status.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateSupply(supply.id, -1)}
                    disabled={supply.current === 0}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateSupply(supply.id, 1)}
                    disabled={supply.current === supply.max}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <Progress 
                value={percentage} 
                className={`h-2 ${supply.current <= supply.critical ? 'pulse-danger' : ''}`}
              />
              
              {supply.current <= supply.critical && (
                <div className="mt-2 text-xs text-danger-zone font-mono">
                  ⚠️ Below critical threshold ({supply.critical} {supply.unit})
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex space-x-4">
        <Button className="flex-1">
          <Package className="w-4 h-4 mr-2" />
          ADD SUPPLIES
        </Button>
        <Button variant="outline" className="border-hazard-orange text-hazard-orange">
          <ShoppingCart className="w-4 h-4 mr-2" />
          SCAVENGE
        </Button>
      </div>
    </div>
  );
};