import React from "react";
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

const InteractiveElements = ({
  predictions = [
    {
      id: "pred-1",
      title: "Who will win this match?",
      channel: "GamingPro",
      channelAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=GamingPro",
      timeRemaining: "10:45",
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
      timeRemaining: "5:30",
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
      timeRemaining: "2:15",
      options: [
        { name: "Pop", odds: "1.8x" },
        { name: "Rock", odds: "2.1x" },
        { name: "Hip-Hop", odds: "2.5x" },
      ],
      participants: 543,
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

        <div className="flex flex-wrap gap-4">
          {predictions.map((prediction) => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PredictionCard = ({ prediction }: { prediction: PredictionProps }) => {
  return (
    <Card className="overflow-hidden bg-gray-900 transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#F70F62] group rounded-none border-0 border-none">
      <CardHeader className="pb-2 bg-gray-900">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage
                src={prediction.channelAvatar}
                alt={prediction.channel}
              />
              <AvatarFallback className="bg-gray-800 text-wanna-green">
                {prediction.channel && prediction.channel.length > 0
                  ? prediction.channel[0]
                  : "P"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-bold text-white">
              {prediction.channel}
            </span>
          </div>
          <Badge
            variant="outline"
            className="flex items-center text-wanna-green rounded-none"
          >
            <Clock className="mr-1 h-3 w-3" /> {prediction.timeRemaining}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2 text-white group-hover:text-wanna-green transition-colors">
          {prediction.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-gray-900">
        <div className="space-y-2">
          {prediction.options.map((option, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <span className="text-white font-bold">{option.name}</span>
              <Badge
                variant="secondary"
                className="bg-black text-wanna-pink font-bold rounded-none"
              >
                {option.odds}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-gray-800 bg-gray-900">
        <div className="flex items-center text-xs text-gray-400">
          <Users className="mr-1 h-3 w-3 text-wanna-green" />{" "}
          {prediction.participants.toLocaleString()} participating
        </div>
        <Button
          size="sm"
          className="text-xs bg-wanna-green text-black font-bold hover:bg-wanna-pink hover:text-white transition-colors"
        >
          Place Prediction
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InteractiveElements;
