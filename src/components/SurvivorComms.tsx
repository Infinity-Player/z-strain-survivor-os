import { useState } from 'react';
import { Send, Mic, MicOff, Radio, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'voice' | 'emergency';
  isEncrypted: boolean;
}

export const SurvivorComms = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Outpost-Alpha',
      content: 'Large horde spotted moving north from sector 7. Recommend immediate evacuation.',
      timestamp: '14:23',
      type: 'emergency',
      isEncrypted: true
    },
    {
      id: '2',
      sender: 'Wanderer-92',
      content: 'Found medical supplies in abandoned pharmacy. Coordinates: 42.3601° N, 71.0589° W',
      timestamp: '14:15',
      type: 'text',
      isEncrypted: true
    },
    {
      id: '3',
      sender: 'Base-Command',
      content: 'Voice transmission received',
      timestamp: '14:10',
      type: 'voice',
      isEncrypted: true
    },
    {
      id: '4',
      sender: 'Scout-Team-6',
      content: 'Area clear. Safe passage through downtown route confirmed.',
      timestamp: '13:58',
      type: 'text',
      isEncrypted: true
    }
  ];

  const channels = [
    { id: 'general', name: 'General', count: 23 },
    { id: 'emergency', name: 'Emergency', count: 3 },
    { id: 'supply', name: 'Supply-Runs', count: 8 },
    { id: 'intel', name: 'Intel', count: 12 }
  ];

  const sendMessage = () => {
    if (inputMessage.trim()) {
      // In a real app, this would send the message
      setInputMessage('');
    }
  };

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'border-l-danger-zone bg-danger-zone/10';
      case 'voice': return 'border-l-survivor-comm bg-survivor-comm/10';
      default: return 'border-l-safe-zone bg-card';
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-survivor-comm mb-2 glitch" data-text="SURVIVOR COMMS">
          SURVIVOR COMMS
        </h2>
        <p className="text-sm text-muted-foreground">
          Encrypted communications network - Stay connected, stay alive
        </p>
      </div>

      {/* Channel selector */}
      <div className="mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {channels.map((channel) => (
            <Button
              key={channel.id}
              variant={activeChannel === channel.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveChannel(channel.id)}
              className={`flex-shrink-0 ${activeChannel === channel.id ? 'pulse-danger' : ''}`}
            >
              <Radio className="w-3 h-3 mr-1" />
              {channel.name}
              <Badge variant="secondary" className="ml-1 text-xs">
                {channel.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <Card className="flex-1 metal-texture border-primary/30 p-0">
        <ScrollArea className="h-full p-4">
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded border-l-4 ${getMessageColor(message.type)} scanner-line`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm font-medium text-foreground">
                      {message.sender}
                    </span>
                    {message.isEncrypted && (
                      <Shield className="w-3 h-3 text-safe-zone" />
                    )}
                    {message.type === 'voice' && (
                      <Mic className="w-3 h-3 text-survivor-comm" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-sm text-card-foreground">
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Message input */}
      <div className="mt-4 space-y-3">
        <div className="flex space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Enter encrypted message..."
            className="flex-1 metal-texture border-primary/30"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <Button onClick={sendMessage} className="px-4">
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex space-x-4">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            className={`flex-1 ${isRecording ? 'pulse-danger' : ''}`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                STOP RECORDING
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                VOICE MESSAGE
              </>
            )}
          </Button>
          
          <Button variant="outline" className="border-hazard-orange text-hazard-orange">
            EMERGENCY
          </Button>
        </div>
      </div>
    </div>
  );
};