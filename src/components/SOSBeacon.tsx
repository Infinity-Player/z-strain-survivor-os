import { useState, useEffect } from 'react';
import { Zap, ZapOff, Users, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NearbyAlly {
  id: string;
  callsign: string;
  distance: number;
  direction: string;
  responseTime: string;
  status: 'responding' | 'available' | 'busy';
}

export const SOSBeacon = () => {
  const [isActive, setIsActive] = useState(false);
  const [broadcastTime, setBroadcastTime] = useState(0);
  const [nearbyAllies, setNearbyAllies] = useState<NearbyAlly[]>([
    { id: '1', callsign: 'Alpha-6', distance: 0.8, direction: 'NE', responseTime: '3 min', status: 'responding' },
    { id: '2', callsign: 'Bravo-2', distance: 1.2, direction: 'SW', responseTime: '7 min', status: 'available' },
    { id: '3', callsign: 'Charlie-9', distance: 2.1, direction: 'N', responseTime: '12 min', status: 'busy' },
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setBroadcastTime(prev => prev + 1);
      }, 1000);
    } else {
      setBroadcastTime(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responding': return 'text-safe-zone';
      case 'available': return 'text-survivor-comm';
      case 'busy': return 'text-hazard-orange';
      default: return 'text-muted-foreground';
    }
  };

  const toggleBeacon = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Simulate new allies detecting the beacon
      setTimeout(() => {
        setNearbyAllies(prev => [
          ...prev,
          { id: '4', callsign: 'Delta-1', distance: 0.5, direction: 'E', responseTime: '2 min', status: 'responding' }
        ]);
      }, 5000);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-primary mb-2 glitch" data-text="SOS BEACON">
          SOS BEACON
        </h2>
        <p className="text-sm text-muted-foreground">
          Emergency broadcast system - Signal for immediate assistance
        </p>
      </div>

      {/* Beacon status */}
      <Card className={`mb-4 p-6 text-center metal-texture border-primary/30 ${isActive ? 'pulse-danger' : ''}`}>
        <div className="mb-4">
          {isActive ? (
            <Zap className="w-16 h-16 mx-auto text-primary neon-flicker" />
          ) : (
            <ZapOff className="w-16 h-16 mx-auto text-muted-foreground" />
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-bold">
            {isActive ? 'BEACON ACTIVE' : 'BEACON INACTIVE'}
          </h3>
          
          {isActive && (
            <>
              <div className="text-2xl font-mono text-primary">
                {formatTime(broadcastTime)}
              </div>
              <div className="text-sm text-muted-foreground">
                Broadcasting emergency signal...
              </div>
              <div className="scanner-line mt-4" />
            </>
          )}
        </div>
      </Card>

      {/* Warning */}
      {!isActive && (
        <Card className="mb-4 p-3 metal-texture border-hazard-orange/50 bg-hazard-orange/10">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-hazard-orange" />
            <div className="text-sm">
              <div className="font-medium text-hazard-orange">WARNING</div>
              <div className="text-foreground">
                SOS beacon will reveal your location to ALL survivors in range, including potential hostiles.
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Nearby allies */}
      <div className="flex-1">
        <h3 className="text-sm font-medium mb-3 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          NEARBY ALLIES ({nearbyAllies.length})
        </h3>
        
        <div className="space-y-2 overflow-y-auto">
          {nearbyAllies.map((ally) => (
            <Card key={ally.id} className="p-3 metal-texture border-primary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-safe-zone" />
                  <div>
                    <div className="font-mono text-sm font-medium">{ally.callsign}</div>
                    <div className="text-xs text-muted-foreground flex items-center space-x-2">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {ally.distance}km {ally.direction}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        ETA {ally.responseTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  variant={ally.status === 'responding' ? 'default' : 'outline'}
                  className={getStatusColor(ally.status)}
                >
                  {ally.status.toUpperCase()}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 space-y-3">
        <Button
          onClick={toggleBeacon}
          className={`w-full ${isActive ? 'pulse-danger' : ''}`}
          variant={isActive ? "destructive" : "default"}
          size="lg"
        >
          {isActive ? (
            <>
              <ZapOff className="w-5 h-5 mr-2" />
              DEACTIVATE BEACON
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-2" />
              ACTIVATE SOS BEACON
            </>
          )}
        </Button>
        
        {isActive && (
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              STEALTH MODE
            </Button>
            <Button variant="outline" size="sm" className="border-hazard-orange text-hazard-orange">
              PANIC SIGNAL
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};