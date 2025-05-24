"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface StreamProps {
  id: string;
  title: string;
  streamer: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  viewers: number;
  category: string;
  isLive: boolean;
}

interface FeaturedContentProps {
  streams?: StreamProps[];
}

const FeaturedContent = ({
  streams = defaultStreams,
}: FeaturedContentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % streams.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + streams.length) % streams.length,
    );
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isTransitioning]);

  // Calculate total pages for pagination
  const totalPages = streams.length;

  // Calculate indices for visible streams
  const centerIndex = currentIndex;
  const leftIndex = (currentIndex - 1 + streams.length) % streams.length;
  const rightIndex = (currentIndex + 1) % streams.length;

  return (
    <div className="w-full bg-background py-6 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="relative h-[400px] overflow-hidden" ref={carouselRef}>
          {/* Left Stream */}
          <div
            className="absolute transition-all duration-500 w-[30%] top-[50px] left-[5%] z-10 opacity-70 transform scale-90"
            onClick={prevSlide}
          >
            <StreamCard stream={streams[leftIndex]} position="left" />
          </div>

          {/* Center Stream (Featured) */}
          <div className="absolute transition-all duration-500 w-[40%] top-0 left-[30%] z-20 transform scale-100">
            <StreamCard stream={streams[centerIndex]} position="center" />
          </div>

          {/* Right Stream */}
          <div
            className="absolute transition-all duration-500 w-[30%] top-[50px] right-[5%] z-10 opacity-70 transform scale-90"
            onClick={nextSlide}
          >
            <StreamCard stream={streams[rightIndex]} position="right" />
          </div>

          {/* Navigation Controls */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 z-30 hover:bg-black/80"
            onClick={prevSlide}
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 z-30 hover:bg-black/80"
            onClick={nextSlide}
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <></>
          ))}
        </div>
      </div>
    </div>
  );
};

const StreamCard = ({
  stream,
  position = "center",
}: {
  stream: StreamProps;
  position?: "left" | "center" | "right";
}) => {
  return (
    <Card
      className={`overflow-hidden bg-gray-900 transition-all duration-200 group rounded-none border-0 border-none ${stream.platform === "twitch" ? "twitch-hover-shadow" : "x-hover-shadow"} cursor-pointer`}
    >
      <div className="relative">
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-40 object-cover rounded-none"
        />
        {stream.isLive && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 px-2 py-0.5 bg-wanna-pink uppercase font-bold rounded-none"
          >
            LIVE
          </Badge>
        )}
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 flex items-center gap-1">
          <Users className="h-3 w-3 text-wanna-green" />
          <span className="text-xs font-bold">
            {stream.viewers && typeof stream.viewers === "number"
              ? stream.viewers.toLocaleString()
              : "0"}
          </span>
        </div>
      </div>
      <CardContent className="p-4 bg-gray-900">
        <div className="flex items-start gap-3 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={stream.streamer.avatar}
              alt={stream.streamer.name}
            />
            <AvatarFallback className="bg-gray-800 text-wanna-green">
              {stream.streamer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/channel/${stream.id}`}
              className="text-sm font-bold text-white hover:underline"
            >
              {stream.streamer.name}
            </Link>
            <p className="text-xs text-wanna-green uppercase">
              {stream.category}
            </p>
          </div>
        </div>
        <h3 className="font-bold line-clamp-2 text-white group-hover:text-wanna-green transition-colors">
          {stream.title}
        </h3>
      </CardContent>
    </Card>
  );
};

// Default streams data for when no props are provided
const defaultStreams: StreamProps[] = [
  {
    id: "1",
    title: "Live Gameplay: Final Fantasy XVI - New DLC Exploration",
    streamer: {
      name: "GamerPro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    viewers: 15420,
    category: "Gaming",
    isLive: true,
  },
  {
    id: "2",
    title: "Music Production Session - Creating Beats Live",
    streamer: {
      name: "BeatMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BeatMaster",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    viewers: 8753,
    category: "Music",
    isLive: true,
  },
  {
    id: "3",
    title: "IRL Stream: Tokyo Street Food Tour",
    streamer: {
      name: "TravelWithMe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TravelWithMe",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
    viewers: 24680,
    category: "IRL",
    isLive: true,
  },
  {
    id: "4",
    title: "Crypto Market Analysis & Predictions",
    streamer: {
      name: "CryptoGuru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoGuru",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    viewers: 5932,
    category: "Finance",
    isLive: true,
  },
  {
    id: "5",
    title: "Art Commission Stream - Digital Painting",
    streamer: {
      name: "ArtistExtraordinaire",
      avatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=ArtistExtraordinaire",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=800&q=80",
    viewers: 3847,
    category: "Art",
    isLive: true,
  },
  {
    id: "6",
    title: "Cooking Stream: Italian Pasta Masterclass",
    streamer: {
      name: "ChefSupreme",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChefSupreme",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    viewers: 7621,
    category: "Food & Drink",
    isLive: false,
  },
  {
    id: "7",
    title: "Esports Tournament: League of Legends Finals",
    streamer: {
      name: "ProLeaguePlayer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ProLeaguePlayer",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
    viewers: 132456,
    category: "Esports",
    isLive: true,
  },
  {
    id: "8",
    title: "Fitness Session: HIIT Workout for Beginners",
    streamer: {
      name: "FitCoach",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FitCoach",
    },
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    viewers: 4532,
    category: "Fitness",
    isLive: true,
  },
];

export default FeaturedContent;
