import { useState, useEffect } from 'react';
import { Brain, Zap, TrendingUp, AlertTriangle, Shield, Clock, MapPin, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AIAlert {
  id: string;
  type: 'danger' | 'opportunity' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  action?: string;
}

interface PredictiveData {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  confidence: number;
}

export const AIAssistant = () => {
  const [activeMode, setActiveMode] = useState<'alerts' | 'predictions' | 'analytics'>('alerts');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiAlerts: AIAlert[] = [
    {
      id: '1',
      type: 'danger',
      title: 'Horde Movement Detected',
      message: 'Large infected group moving northeast. Estimated arrival at Sector 5 in 45 minutes.',
      timestamp: '2 min ago',
      priority: 'critical',
      action: 'EVACUATE AREA'
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Supply Drop Window',
      message: 'Weather conditions favorable for airdrop. Next window opens in 3 hours.',
      timestamp: '15 min ago',
      priority: 'medium',
      action: 'PREPARE SIGNAL'
    },
    {
      id: '3',
      type: 'warning',
      title: 'Resource Depletion',
      message: 'Current consumption rate will exhaust water supplies in 4 days.',
      timestamp: '1 hour ago',
      priority: 'high',
      action: 'FIND WATER SOURCE'
    },
    {
      id: '4',
      type: 'info',
      title: 'Optimal Travel Time',
      message: 'Zombie activity lowest between 2-4 AM. Recommended for long-distance travel.',
      timestamp: '3 hours ago',
      priority: 'low'
    }
  ];

  const predictiveData: PredictiveData[] = [
    { label: 'Infection Spread Rate', value: '12% increase', trend: 'up', confidence: 89 },
    { label: 'Safe Zone Capacity', value: '67% full', trend: 'stable', confidence: 94 },
    { label: 'Supply Availability', value: '8% decrease', trend: 'down', confidence: 76 },
    { label: 'Survivor Activity', value: '23% increase', trend: 'up', confidence: 82 },
    { label: 'Weather Impact', value: 'Storm in 18hrs', trend: 'down', confidence: 91 },
    { label: 'Emergency Risk', value: 'Medium level', trend: 'stable', confidence: 85 }
  ];

  const analyticsData = [
    { metric: 'Threats Avoided', value: '127', change: '+12%' },
    { metric: 'Safe Routes Found', value: '43', change: '+8%' },
    { metric: 'Successful Missions', value: '89%', change: '+3%' },
    { metric: 'Resource Efficiency', value: '76%', change: '-2%' },
    { metric: 'Communication Range', value: '15.2km', change: '+5%' },
    { metric: 'Survival Score', value: '1,847', change: '+23%' }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return 'border-danger-zone bg-danger-zone/10';
      case 'opportunity': return 'border-survivor-green bg-survivor-green/10';
      case 'warning': return 'border-hazard-orange bg-hazard-orange/10';
      case 'info': return 'border-ai-cyan bg-ai-cyan/10';
      default: return 'border-primary/20 bg-card/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-danger-zone" />;
      case 'high': return <TrendingUp className="w-4 h-4 text-hazard-orange" />;
      case 'medium': return <Activity className="w-4 h-4 text-survivor-comm" />;
      case 'low': return <Clock className="w-4 h-4 text-muted-foreground" />;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-danger-zone" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-survivor-green rotate-180" />;
      case 'stable': return <Activity className="w-3 h-3 text-muted-foreground" />;
      default: return null;
    }
  };

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-ai-cyan mb-2 glitch" data-text="AI ASSISTANT">
          AI ASSISTANT
        </h2>
        <p className="text-sm text-muted-foreground">
          Military-grade survival AI - Predictive analytics and threat assessment
        </p>
      </div>

      {/* AI Status */}
      <Card className="mb-4 p-4 metal-texture border-ai-cyan/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className={`w-6 h-6 text-ai-cyan ${isAnalyzing ? 'neon-flicker' : ''}`} />
            <div>
              <div className="font-medium text-foreground">
                {isAnalyzing ? 'ANALYZING DATA...' : 'TACTICAL AI ONLINE'}
              </div>
              <div className="text-xs text-muted-foreground">
                Neural networks active • Real-time processing
              </div>
            </div>
          </div>
          <Button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className={`${isAnalyzing ? 'pulse-danger' : ''}`}
            size="sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'ANALYZING' : 'DEEP SCAN'}
          </Button>
        </div>
        
        {isAnalyzing && (
          <div className="mt-3">
            <div className="scanner-line h-2 bg-ai-interface/20 rounded" />
          </div>
        )}
      </Card>

      {/* Mode Selection */}
      <div className="mb-4">
        <div className="flex space-x-2">
          {[
            { id: 'alerts', label: 'ALERTS', icon: AlertTriangle },
            { id: 'predictions', label: 'PREDICTIONS', icon: TrendingUp },
            { id: 'analytics', label: 'ANALYTICS', icon: Activity }
          ].map((mode) => {
            const Icon = mode.icon;
            return (
              <Button
                key={mode.id}
                variant={activeMode === mode.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveMode(mode.id as any)}
                className={`flex-1 ${activeMode === mode.id ? 'pulse-danger' : ''}`}
              >
                <Icon className="w-3 h-3 mr-1" />
                {mode.label}
              </Button>
            );
          })}
        </div>
      </div>

      <Card className="flex-1 metal-texture border-primary/30 p-0">
        <ScrollArea className="h-full p-4">
          {activeMode === 'alerts' && (
            <div className="space-y-3">
              {aiAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded border scanner-line ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(alert.priority)}
                      <h3 className="font-medium text-foreground text-sm">{alert.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${alert.priority === 'critical' ? 'border-danger-zone text-danger-zone' : ''}`}
                      >
                        {alert.priority.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{alert.message}</p>
                  
                  {alert.action && (
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-ai-cyan">RECOMMENDED ACTION:</div>
                      <Button size="sm" variant="outline" className="text-xs">
                        {alert.action}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeMode === 'predictions' && (
            <div className="space-y-3">
              {predictiveData.map((prediction, index) => (
                <div key={index} className="p-3 bg-card/50 rounded border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{prediction.label}</span>
                    <div className="flex items-center space-x-2">
                      {getTrendIcon(prediction.trend)}
                      <span className="text-sm text-foreground">{prediction.value}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Confidence: {prediction.confidence}%
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-16 h-1 bg-muted rounded overflow-hidden">
                        <div 
                          className={`h-full ${prediction.confidence > 80 ? 'bg-survivor-green' : prediction.confidence > 60 ? 'bg-hazard-orange' : 'bg-danger-zone'}`}
                          style={{ width: `${prediction.confidence}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeMode === 'analytics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {analyticsData.map((data, index) => (
                  <div key={index} className="p-3 bg-card/50 rounded border border-primary/20 text-center">
                    <div className="text-lg font-bold text-foreground">{data.value}</div>
                    <div className="text-xs text-muted-foreground mb-1">{data.metric}</div>
                    <div className={`text-xs font-medium ${data.change.startsWith('+') ? 'text-survivor-green' : 'text-danger-zone'}`}>
                      {data.change}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-ai-interface/10 rounded border border-ai-cyan/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-4 h-4 text-ai-cyan" />
                  <span className="font-medium text-foreground text-sm">AI Recommendations</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="text-muted-foreground">• Increase water collection efforts in next 48 hours</div>
                  <div className="text-muted-foreground">• Avoid northwest routes during 6-8 PM window</div>
                  <div className="text-muted-foreground">• Consider shelter reinforcement before storm arrival</div>
                  <div className="text-muted-foreground">• Optimal communication window: 3-5 AM daily</div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};