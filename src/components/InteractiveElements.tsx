import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Users, ChevronRight } from "lucide-react";

interface PredictionProps {
  id: string;
  title: string;
  channel: string;
  channelAvatar: string;
  timeRemaining: string;
  options: Array<{
    name: string;
    odds: string;
  }>;
  participants: number;
}

const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const parseTimeToSeconds = (timeString: string | undefined): number => {
  if (!timeString || typeof timeString !== "string") {
    return 0;
  }
  const parts = timeString.split(":").map(Number);
  if (parts.length === 3) {
    // Format: HH:MM:SS
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    // Format: MM:SS
    const [minutes, seconds] = parts;
    return minutes * 60 + seconds;
  }
  return 0;
};

const InteractiveElements = ({
  predictions = [
    {
      id: "pred-1",
      title: "Who will win this match?",
      channel: "GamingPro",
      channelAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=GamingPro",
      timeRemaining: "00:10:45",
      options: [
        { name: "Team Alpha", odds: "1.5x" },
        { name: "Team Omega", odds: "2.3x" },
      ],
      participants: 1245,
    },
    {
      id: "pred-2",
      title: "Will they beat the boss in one try?",
      channel: "AdventureQuest",
      channelAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=AdventureQuest",
      timeRemaining: "00:05:30",
      options: [
        { name: "Yes", odds: "3.2x" },
        { name: "No", odds: "1.2x" },
      ],
      participants: 876,
    },
    {
      id: "pred-3",
      title: "Next song genre?",
      channel: "MusicMaster",
      channelAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=MusicMaster",
      timeRemaining: "00:02:15",
      options: [
        { name: "Pop", odds: "1.8x" },
        { name: "Rock", odds: "2.1x" },
        { name: "Hip-Hop", odds: "2.5x" },
      ],
      participants: 543,
    },
    {
      id: "pred-4",
      title: "Will the streamer rage quit?",
      channel: "RageGaming",
      channelAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=RageGaming",
      timeRemaining: "00:08:20",
      options: [
        { name: "Definitely", odds: "1.3x" },
        { name: "No way", odds: "2.7x" },
      ],
      participants: 892,
    },
    {
      id: "pred-5",
      title: "First to reach 100 points?",
      channel: "CompetitiveGaming",
      channelAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=CompetitiveGaming",
      timeRemaining: "00:15:00",
      options: [
        { name: "Player One", odds: "2.0x" },
        { name: "Player Two", odds: "1.8x" },
      ],
      participants: 1120,
    },
    {
      id: "pred-6",
      title: "Will they find the secret item?",
      channel: "TreasureHunters",
      channelAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=TreasureHunters",
      timeRemaining: "00:07:15",
      options: [
        { name: "Yes, within 10 min", odds: "3.5x" },
        { name: "Yes, after 10 min", odds: "2.0x" },
        { name: "No", odds: "1.5x" },
      ],
      participants: 756,
    },
  ],
}) => {
  return (
    <div className="w-full bg-background py-8 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-wanna-green uppercase">
            Live Predictions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {predictions.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PredictionCard = ({ prediction }: { prediction: PredictionProps }) => {
  const initialSeconds = parseTimeToSeconds(prediction.timeRemaining);
  const [timeInSeconds, setTimeInSeconds] = useState<number>(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInSeconds((prevTime) => {
        if (prevTime <= 1) {
          // Reset to initial time when reaching zero
          return initialSeconds;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialSeconds]);

  return (
    <Card className="overflow-hidden bg-[#3d3d3d] transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#F70F62] group border-0 border-none rounded-none">
      <CardHeader className="pb-2 bg-[#3d3d3d]">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Badge className="mr-2 bg-[#F70F62] text-white font-bold px-2 py-0 text-xs rounded-none">
              LIVE
            </Badge>
          </div>
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage
                src={prediction.channelAvatar}
                alt={prediction.channel}
              />
            </Avatar>
            <span className="text-sm font-bold text-white">
              {prediction.channel}
            </span>
          </div>
          <div className="text-[#F70F62] font-bold text-xs flex items-center">
            <Clock className="mr-1 h-3 w-3 text-[#00ff85]" />{" "}
            {formatTime(timeInSeconds)}
          </div>
        </div>
        <CardTitle className="text-lg mt-2 text-white group-hover:text-wanna-green transition-colors">
          {prediction.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-[#3d3d3d]">
        <div className="space-y-2">
          {prediction.options.map((option, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors ${index === 0 ? "border-[#00ff85]" : "border-[#f70f62]"} border-2 rounded-none`}
            >
              <span
                className={`font-bold ${index === 0 ? "text-[#00ff85]" : "text-white"}`}
              >
                {index === 0 ? "Yes" : "No"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-gray-800 bg-[#3d3d3d]">
        <div className="flex items-center text-xs text-gray-400">
          <Users className="h-3 w-3 mr-1" />
          {prediction.participants.toLocaleString()} participants
        </div>
        <Button
          size="sm"
          className="text-xs bg-wanna-green text-white font-bold hover:bg-wanna-pink hover:text-white transition-colors bg-[#F70F62] rounded-none"
        >
          Place Prediction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InteractiveElements;
