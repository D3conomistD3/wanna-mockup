"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Link } from "next/link";

interface InteractiveElementsProps {
  predictions?: Array<{
    id: string;
    title: string;
    options: Array<{ id: string; name: string; odds: string }>;
    timeLeft: string;
    participants: number;
  }>;
  polls?: Array<{
    id: string;
    question: string;
    options: Array<{ id: string; text: string; votes: number }>;
    timeLeft: string;
    participants: number;
  }>;
  powerChats?: Array<{
    id: string;
    title: string;
    activeUsers: number;
    timeLeft: string;
  }>;
}

export default function InteractiveElements({
  predictions = [
    {
      id: "pred-1",
      title: "Will xQc reach 100k viewers today?",
      options: [
        { id: "opt-1", name: "Yes", odds: "1.5x" },
        { id: "opt-2", name: "No", odds: "2.2x" },
      ],
      timeLeft: "2h 15m",
      participants: 1243,
    },
    {
      id: "pred-2",
      title: "Will Pokimane win this match?",
      options: [
        { id: "opt-3", name: "Yes", odds: "1.8x" },
        { id: "opt-4", name: "No", odds: "1.9x" },
      ],
      timeLeft: "45m",
      participants: 876,
    },
    {
      id: "pred-3",
      title: "Will Ninja get 5+ kills this game?",
      options: [
        { id: "opt-5", name: "Yes", odds: "1.3x" },
        { id: "opt-6", name: "No", odds: "2.5x" },
      ],
      timeLeft: "30m",
      participants: 2156,
    },
  ],
  polls = [
    {
      id: "poll-1",
      question: "Which game should I play next?",
      options: [
        { id: "poll-opt-1", text: "Fortnite", votes: 342 },
        { id: "poll-opt-2", text: "Valorant", votes: 528 },
        { id: "poll-opt-3", text: "Minecraft", votes: 187 },
      ],
      timeLeft: "5m",
      participants: 1057,
    },
    {
      id: "poll-2",
      question: "Best new game release?",
      options: [
        { id: "poll-opt-4", text: "Elden Ring", votes: 876 },
        { id: "poll-opt-5", text: "Starfield", votes: 654 },
        { id: "poll-opt-6", text: "Baldur's Gate 3", votes: 1243 },
      ],
      timeLeft: "1h 30m",
      participants: 2773,
    },
  ],
  powerChats = [
    {
      id: "chat-1",
      title: "VIP Chat with Shroud",
      activeUsers: 156,
      timeLeft: "45m",
    },
    {
      id: "chat-2",
      title: "Subscriber-only Q&A",
      activeUsers: 324,
      timeLeft: "1h 15m",
    },
    {
      id: "chat-3",
      title: "Tournament Discussion",
      activeUsers: 578,
      timeLeft: "3h",
    },
  ],
}: InteractiveElementsProps) {
  return (
    <div className="w-full bg-background p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Interactive Elements
        </h2>
        <Button
          variant="ghost"
          className="text-primary flex items-center gap-1"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="predictions" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="powerchats">Power Chats</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {predictions.map((prediction) => (
                <CarouselItem
                  key={prediction.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" /> {prediction.timeLeft}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />{" "}
                          {prediction.participants.toLocaleString()}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-3">{prediction.title}</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {prediction.options.map((option) => (
                          <Button
                            key={option.id}
                            variant="outline"
                            className="justify-between hover:bg-primary/10"
                          >
                            {option.name}
                            <span className="text-primary font-semibold">
                              {option.odds}
                            </span>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </TabsContent>

        <TabsContent value="polls" className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {polls.map((poll) => (
                <CarouselItem
                  key={poll.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" /> {poll.timeLeft}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" />{" "}
                          {poll.participants.toLocaleString()}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-3">{poll.question}</h3>
                      <div className="space-y-2">
                        {poll.options.map((option) => {
                          const totalVotes = poll.options.reduce(
                            (sum, opt) => sum + opt.votes,
                            0,
                          );
                          const percentage = Math.round(
                            (option.votes / totalVotes) * 100,
                          );

                          return (
                            <div key={option.id} className="relative">
                              <div
                                className="absolute top-0 left-0 h-full bg-primary/20 rounded-md"
                                style={{ width: `${percentage}%` }}
                              />
                              <Button
                                variant="outline"
                                className="w-full justify-between relative z-10 bg-transparent"
                              >
                                {option.text}
                                <span className="text-primary font-semibold">
                                  {percentage}%
                                </span>
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </TabsContent>

        <TabsContent value="powerchats" className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {powerChats.map((chat) => (
                <CarouselItem
                  key={chat.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge
                          variant="outline"
                          className="bg-primary/10 text-primary flex items-center gap-1"
                        >
                          <Clock className="h-3 w-3" /> {chat.timeLeft}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" /> {chat.activeUsers}
                        </span>
                      </div>
                      <h3 className="font-semibold mb-3">{chat.title}</h3>
                      <Button className="w-full">Join Chat</Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4" />
            <CarouselNext className="-right-4" />
          </Carousel>
        </TabsContent>
      </Tabs>
    </div>
  );
}
