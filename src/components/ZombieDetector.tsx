import { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Crosshair, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ZombieDetector = () => {
  const [isActive, setIsActive] = useState(false);
  const [detectedThreats, setDetectedThreats] = useState(3);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-thermal-glow mb-2 glitch" data-text="ZOMBIE DETECTION">
          ZOMBIE DETECTION
        </h2>
        <p className="text-sm text-muted-foreground">
          Thermal vision mode - Undead signatures glow red
        </p>
      </div>

      <Card className="flex-1 metal-texture border-primary/30 overflow-hidden relative">
        {isActive ? (
          <div className="relative h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Thermal overlay effect */}
            <div className="absolute inset-0 thermal-overlay" />
            
            {/* Crosshair overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Crosshair className="w-16 h-16 text-thermal-glow neon-flicker" />
            </div>
            
            {/* Threat indicators */}
            <div className="absolute top-4 left-4 space-y-2">
              {Array.from({ length: detectedThreats }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2 bg-danger-zone/80 px-3 py-1 rounded">
                  <AlertTriangle className="w-4 h-4 text-thermal-glow" />
                  <span className="text-xs font-mono text-foreground">
                    THREAT {i + 1}: {Math.floor(Math.random() * 50) + 10}m
                  </span>
                </div>
              ))}
            </div>
            
            {/* Scanner line effect */}
            <div className="scanner-line absolute inset-0" />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <CameraOff className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">Camera inactive</p>
              <p className="text-xs text-muted-foreground mb-6">
                Activate thermal vision to scan for undead signatures
              </p>
            </div>
          </div>
        )}
      </Card>

      <div className="mt-4 flex space-x-4">
        <Button
          onClick={isActive ? stopCamera : startCamera}
          className={`flex-1 ${isActive ? 'pulse-danger' : 'hover:bg-primary/90'}`}
          variant={isActive ? "destructive" : "default"}
        >
          {isActive ? (
            <>
              <CameraOff className="w-4 h-4 mr-2" />
              DEACTIVATE
            </>
          ) : (
            <>
              <Camera className="w-4 h-4 mr-2" />
              ACTIVATE THERMAL
            </>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setDetectedThreats(Math.floor(Math.random() * 8))}
          className="border-hazard-orange text-hazard-orange hover:bg-hazard-orange/10"
        >
          RESCAN
        </Button>
      </div>
    </div>
  );
};