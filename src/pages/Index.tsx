import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { ZombieDetector } from '@/components/ZombieDetector';
import { ShelterMap } from '@/components/ShelterMap';
import { SurvivorComms } from '@/components/SurvivorComms';
import { SupplyTracker } from '@/components/SupplyTracker';
import { SOSBeacon } from '@/components/SOSBeacon';
import { StatusHeader } from '@/components/StatusHeader';
import apocalypseBg from '@/assets/apocalypse-bg.jpg';

export type AppView = 'detector' | 'map' | 'comms' | 'supplies' | 'sos';

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>('detector');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'detector':
        return <ZombieDetector />;
      case 'map':
        return <ShelterMap />;
      case 'comms':
        return <SurvivorComms />;
      case 'supplies':
        return <SupplyTracker />;
      case 'sos':
        return <SOSBeacon />;
      default:
        return <ZombieDetector />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${apocalypseBg})` }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col h-screen">
        <StatusHeader />
        
        <main className="flex-1 overflow-hidden">
          {renderCurrentView()}
        </main>
        
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
      </div>
    </div>
  );
};

export default Index;