import { useState } from 'react';
import { MapPin, Shield, Users, AlertTriangle, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Shelter {
  id: string;
  name: string;
  distance: number;
  capacity: number;
  occupied: number;
  safetyLevel: 'high' | 'medium' | 'low';
  lastContact: string;
}

interface DangerZone {
  id: string;
  x: number;
  y: number;
  radius: number;
  intensity: number;
}

export const ShelterMap = () => {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  
  const shelters: Shelter[] = [
    { id: '1', name: 'Safe Haven Alpha', distance: 2.3, capacity: 50, occupied: 12, safetyLevel: 'high', lastContact: '2 min ago' },
    { id: '2', name: 'Bunker Delta-7', distance: 4.1, capacity: 25, occupied: 20, safetyLevel: 'medium', lastContact: '15 min ago' },
    { id: '3', name: 'Outpost Zulu', distance: 6.8, capacity: 15, occupied: 8, safetyLevel: 'low', lastContact: '3 hours ago' },
  ];

  const dangerZones: DangerZone[] = [
    { id: '1', x: 30, y: 40, radius: 15, intensity: 0.8 },
    { id: '2', x: 70, y: 20, radius: 20, intensity: 0.6 },
    { id: '3', x: 50, y: 70, radius: 12, intensity: 0.9 },
  ];

  const getSafetyColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-safe-zone';
      case 'medium': return 'text-hazard-orange';
      case 'low': return 'text-danger-zone';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-safe-zone mb-2 glitch" data-text="SHELTER LOCATOR">
          SHELTER LOCATOR
        </h2>
        <p className="text-sm text-muted-foreground">
          Real-time safe zone mapping and survivor tracking
        </p>
      </div>

      <Card className="flex-1 metal-texture border-primary/30 p-4 relative overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 bg-muted/10">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20" 
               style={{
                 backgroundImage: `
                   linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                 `,
                 backgroundSize: '20px 20px'
               }} 
          />
          
          {/* Danger zones */}
          {dangerZones.map((zone) => (
            <div
              key={zone.id}
              className="absolute rounded-full bg-danger-zone/30 border border-danger-zone pulse-danger"
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.radius}%`,
                height: `${zone.radius}%`,
                transform: 'translate(-50%, -50%)',
                animation: `pulse-danger ${2 - zone.intensity}s infinite`
              }}
            />
          ))}
          
          {/* Current position */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-survivor-comm rounded-full border-2 border-foreground pulse-danger" />
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-survivor-comm font-mono">
              YOU
            </div>
          </div>
          
          {/* Shelter markers */}
          {shelters.map((shelter, index) => {
            const positions = [
              { x: 20, y: 30 },
              { x: 80, y: 60 },
              { x: 40, y: 80 }
            ];
            const pos = positions[index];
            
            return (
              <div
                key={shelter.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => setSelectedShelter(shelter)}
              >
                <Shield className={`w-6 h-6 ${getSafetyColor(shelter.safetyLevel)} neon-flicker`} />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-center font-mono whitespace-nowrap">
                  <div className={getSafetyColor(shelter.safetyLevel)}>{shelter.name}</div>
                  <div className="text-muted-foreground">{shelter.distance}km</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scanner line */}
        <div className="scanner-line absolute inset-0" />
      </Card>

      {/* Shelter list */}
      <div className="mt-4 space-y-2 max-h-40 overflow-y-auto">
        {shelters.map((shelter) => (
          <Card 
            key={shelter.id}
            className={`p-3 metal-texture border cursor-pointer transition-all
              ${selectedShelter?.id === shelter.id ? 'border-primary' : 'border-muted/30'}
            `}
            onClick={() => setSelectedShelter(shelter)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className={`w-5 h-5 ${getSafetyColor(shelter.safetyLevel)}`} />
                <div>
                  <div className="font-mono text-sm font-medium">{shelter.name}</div>
                  <div className="text-xs text-muted-foreground">{shelter.distance}km • {shelter.lastContact}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  <Users className="w-3 h-3 mr-1" />
                  {shelter.occupied}/{shelter.capacity}
                </Badge>
                <Badge 
                  variant={shelter.safetyLevel === 'high' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {shelter.safetyLevel.toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex space-x-4">
        <Button className="flex-1" disabled={!selectedShelter}>
          <Navigation className="w-4 h-4 mr-2" />
          NAVIGATE
        </Button>
        <Button variant="outline" className="border-hazard-orange text-hazard-orange">
          <MapPin className="w-4 h-4 mr-2" />
          REFRESH
        </Button>
      </div>
    </div>
  );
};