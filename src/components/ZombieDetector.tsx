import { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Crosshair, AlertTriangle, Zap, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const ZombieDetector = () => {
  const [isActive, setIsActive] = useState(false);
  const [detectionMode, setDetectionMode] = useState<'survivor' | 'infected' | 'alert'>('infected');
  const [detectedThreats, setDetectedThreats] = useState(3);
  const [detectedSurvivors, setDetectedSurvivors] = useState(1);
  const [alertLevel, setAlertLevel] = useState(0);
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
        <h2 className="text-xl font-bold text-thermal-glow mb-2 glitch" data-text="TRI-MODE DETECTION">
          TRI-MODE DETECTION
        </h2>
        <p className="text-sm text-muted-foreground">
          Advanced AI detection system - Identifies survivors, infected, and threats
        </p>
      </div>

      {/* Detection Mode Selector */}
      <div className="mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setDetectionMode('survivor')}
            className={`flex-1 p-2 rounded text-xs font-mono border ${
              detectionMode === 'survivor' 
                ? 'bg-survivor-green/20 border-survivor-green text-survivor-green' 
                : 'border-primary/30 text-muted-foreground'
            }`}
          >
            <Users className="w-4 h-4 mx-auto mb-1" />
            GREEN MODE
          </button>
          <button
            onClick={() => setDetectionMode('infected')}
            className={`flex-1 p-2 rounded text-xs font-mono border ${
              detectionMode === 'infected' 
                ? 'bg-infected-purple/20 border-infected-purple text-infected-purple' 
                : 'border-primary/30 text-muted-foreground'
            }`}
          >
            <Eye className="w-4 h-4 mx-auto mb-1" />
            PURPLE MODE
          </button>
          <button
            onClick={() => setDetectionMode('alert')}
            className={`flex-1 p-2 rounded text-xs font-mono border ${
              detectionMode === 'alert' 
                ? 'bg-alert-red/20 border-alert-red text-alert-red pulse-danger' 
                : 'border-primary/30 text-muted-foreground'
            }`}
          >
            <Zap className="w-4 h-4 mx-auto mb-1" />
            RED ALERT
          </button>
        </div>
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
            
            {/* Detection overlay effect */}
            <div className={`absolute inset-0 ${
              detectionMode === 'survivor' ? 'bg-survivor-green/10' :
              detectionMode === 'infected' ? 'bg-infected-purple/10' :
              'bg-alert-red/20 pulse-danger'
            }`} />
            
            {/* Crosshair overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Crosshair className="w-16 h-16 text-thermal-glow neon-flicker" />
            </div>
            
            {/* Detection indicators */}
            <div className="absolute top-4 left-4 space-y-2">
              {detectionMode === 'survivor' && Array.from({ length: detectedSurvivors }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2 bg-survivor-green/80 px-3 py-1 rounded">
                  <Users className="w-4 h-4 text-background" />
                  <span className="text-xs font-mono text-background">
                    SURVIVOR {i + 1}: {Math.floor(Math.random() * 30) + 5}m
                  </span>
                </div>
              ))}
              
              {detectionMode === 'infected' && Array.from({ length: detectedThreats }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2 bg-infected-purple/80 px-3 py-1 rounded">
                  <Eye className="w-4 h-4 text-foreground" />
                  <span className="text-xs font-mono text-foreground">
                    INFECTED {i + 1}: {Math.floor(Math.random() * 50) + 10}m
                  </span>
                </div>
              ))}
              
              {detectionMode === 'alert' && (
                <div className="flex items-center space-x-2 bg-alert-red/90 px-3 py-1 rounded pulse-danger">
                  <AlertTriangle className="w-4 h-4 text-foreground neon-flicker" />
                  <span className="text-xs font-mono text-foreground">
                    CRITICAL THREAT: 15m APPROACHING
                  </span>
                </div>
              )}
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
          onClick={() => {
            setDetectedThreats(Math.floor(Math.random() * 8));
            setDetectedSurvivors(Math.floor(Math.random() * 3));
          }}
          className="border-hazard-orange text-hazard-orange hover:bg-hazard-orange/10"
        >
          RESCAN
        </Button>
      </div>
    </div>
  );
};