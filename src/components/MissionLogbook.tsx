import { useState } from 'react';
import { CheckCircle, Circle, Star, Award, Clock, Target, MapPin, Users, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'survival' | 'rescue' | 'recon' | 'supply';
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  reward: string;
  location: string;
  timeLimit: string;
  progress: number;
  completed: boolean;
  requirements: string[];
}

interface DailyTask {
  id: string;
  task: string;
  completed: boolean;
  reward: string;
}

export const MissionLogbook = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'missions' | 'achievements'>('daily');

  const dailyTasks: DailyTask[] = [
    { id: '1', task: 'Scan for threats (3 times)', completed: true, reward: '+10 XP' },
    { id: '2', task: 'Check shelter status', completed: true, reward: '+5 XP' },
    { id: '3', task: 'Send survivor status update', completed: false, reward: '+15 XP' },
    { id: '4', task: 'Update supply inventory', completed: false, reward: '+10 XP' },
    { id: '5', task: 'Practice stealth mode', completed: false, reward: '+20 XP' },
  ];

  const missions: Mission[] = [
    {
      id: '1',
      title: 'Pharmacy Run',
      description: 'Secure medical supplies from abandoned hospital',
      type: 'supply',
      difficulty: 'medium',
      reward: '3x Medical Kits, +50 XP',
      location: 'Downtown Hospital',
      timeLimit: '6 hours',
      progress: 65,
      completed: false,
      requirements: ['Stealth gear', 'Lockpick tools', 'Empty backpack']
    },
    {
      id: '2',
      title: 'Survivor Rescue',
      description: 'Extract trapped survivors from infected zone',
      type: 'rescue',
      difficulty: 'hard',
      reward: '+3 Allies, +100 XP',
      location: 'Sector 7 Apartment',
      timeLimit: '4 hours',
      progress: 25,
      completed: false,
      requirements: ['Combat gear', 'First aid kit', 'Escape route planned']
    },
    {
      id: '3',
      title: 'Recon Mission',
      description: 'Scout zombie horde movement patterns',
      type: 'recon',
      difficulty: 'easy',
      reward: 'Horde Intel, +30 XP',
      location: 'Industrial District',
      timeLimit: '8 hours',
      progress: 100,
      completed: true,
      requirements: ['Binoculars', 'Camera', 'Silent movement']
    }
  ];

  const achievements = [
    { id: '1', name: 'First Contact', description: 'Establish communication with 5 survivors', completed: true, reward: 'Communication Badge' },
    { id: '2', name: 'Ghost Walker', description: 'Travel 10km without zombie detection', completed: true, reward: 'Stealth Master Badge' },
    { id: '3', name: 'Supply Master', description: 'Maintain full supplies for 7 days', completed: false, reward: 'Resource Management Badge' },
    { id: '4', name: 'Horde Survivor', description: 'Escape from a horde of 50+ zombies', completed: false, reward: 'Lucky Survivor Badge' },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-survivor-green border-survivor-green';
      case 'medium': return 'text-hazard-orange border-hazard-orange';
      case 'hard': return 'text-danger-zone border-danger-zone';
      case 'extreme': return 'text-alert-red border-alert-red';
      default: return 'text-muted-foreground border-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'survival': return Target;
      case 'rescue': return Users;
      case 'recon': return MapPin;
      case 'supply': return Package;
      default: return Circle;
    }
  };

  const completedTasks = dailyTasks.filter(task => task.completed).length;
  const totalTasks = dailyTasks.length;
  const dailyProgress = (completedTasks / totalTasks) * 100;

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-hazard-orange mb-2 glitch" data-text="MISSION LOGBOOK">
          MISSION LOGBOOK
        </h2>
        <p className="text-sm text-muted-foreground">
          Survival objectives and daily tasks - Complete to earn experience and rewards
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4">
        <div className="flex space-x-2">
          {[
            { id: 'daily', label: 'DAILY' },
            { id: 'missions', label: 'MISSIONS' },
            { id: 'achievements', label: 'BADGES' }
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 ${activeTab === tab.id ? 'pulse-danger' : ''}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <Card className="flex-1 metal-texture border-primary/30 p-0">
        <ScrollArea className="h-full p-4">
          {activeTab === 'daily' && (
            <div className="space-y-4">
              {/* Daily Progress */}
              <div className="p-4 bg-card/50 rounded border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">Daily Progress</span>
                  <span className="text-sm text-muted-foreground">{completedTasks}/{totalTasks}</span>
                </div>
                <Progress value={dailyProgress} className="mb-2" />
                <div className="text-xs text-muted-foreground">
                  {dailyProgress === 100 ? 'All tasks completed! Bonus XP earned.' : `${totalTasks - completedTasks} tasks remaining`}
                </div>
              </div>

              {/* Daily Tasks */}
              <div className="space-y-2">
                {dailyTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-3 rounded border ${task.completed ? 'bg-safe-zone/10 border-safe-zone/30' : 'bg-card/30 border-primary/20'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {task.completed ? (
                          <CheckCircle className="w-5 h-5 text-safe-zone" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                        <span className={`text-sm ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.task}
                        </span>
                      </div>
                      <Badge variant={task.completed ? "default" : "outline"} className="text-xs">
                        {task.reward}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'missions' && (
            <div className="space-y-4">
              {missions.map((mission) => {
                const TypeIcon = getTypeIcon(mission.type);
                return (
                  <div key={mission.id} className="p-4 bg-card/50 rounded border border-primary/20 scanner-line">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-5 h-5 text-primary" />
                        <h3 className="font-medium text-foreground">{mission.title}</h3>
                        {mission.completed && <CheckCircle className="w-4 h-4 text-safe-zone" />}
                      </div>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(mission.difficulty)}`}>
                        {mission.difficulty.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{mission.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{mission.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{mission.timeLimit}</span>
                      </div>
                    </div>
                    
                    {!mission.completed && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs text-foreground">{mission.progress}%</span>
                        </div>
                        <Progress value={mission.progress} />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-survivor-comm">
                        Reward: {mission.reward}
                      </div>
                      <Button 
                        size="sm" 
                        variant={mission.completed ? "outline" : "default"}
                        disabled={mission.completed}
                      >
                        {mission.completed ? 'COMPLETED' : 'CONTINUE'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded border ${achievement.completed ? 'bg-survivor-comm/10 border-survivor-comm/30' : 'bg-card/30 border-primary/20'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {achievement.completed ? (
                        <Award className="w-5 h-5 text-survivor-comm neon-flicker" />
                      ) : (
                        <Star className="w-5 h-5 text-muted-foreground" />
                      )}
                      <h3 className="font-medium text-foreground">{achievement.name}</h3>
                    </div>
                    {achievement.completed && (
                      <Badge className="text-xs bg-survivor-comm/20 text-survivor-comm">
                        EARNED
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <div className="text-xs text-hazard-orange">
                    Reward: {achievement.reward}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};