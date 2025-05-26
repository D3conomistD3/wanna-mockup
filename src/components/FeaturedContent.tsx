"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users, X } from "lucide-react";
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
        <div className="relative h-[500px] overflow-hidden" ref={carouselRef}>
          {/* Left Stream - Vertically centered */}
          <div
            className="absolute transition-all duration-500 w-[30%] top-1/2 -translate-y-1/2 left-[5%] z-10 opacity-70 transform scale-90"
            onClick={prevSlide}
          >
            <StreamCard stream={streams[leftIndex]} position="left" />
          </div>

          {/* Center Stream (Featured) - Vertically centered */}
          <div className="absolute transition-all duration-500 w-[40%] top-1/2 -translate-y-1/2 left-[30%] z-20 transform scale-100">
            <StreamCard stream={streams[centerIndex]} position="center" />
          </div>

          {/* Right Stream - Vertically centered */}
          <div
            className="absolute transition-all duration-500 w-[30%] top-1/2 -translate-y-1/2 right-[5%] z-10 opacity-70 transform scale-90"
            onClick={nextSlide}
          >
            <StreamCard stream={streams[rightIndex]} position="right" />
          </div>

          {/* Navigation Controls - Centered vertically */}
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
  // Determine height based on position
  const imageHeight = position === "center" ? "h-80" : "h-60";

  return (
    <div
      className={`relative overflow-hidden group cursor-pointer transition-all duration-200 ${stream.platform === "twitch" ? "border-2 border-purple-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#9146FF]" : "border-2 border-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#FFFFFF]"}`}
    >
      {/* Background Image */}
      <div className={`relative w-full ${imageHeight}`}>
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="w-full h-full object-cover"
        />

        {/* Platform Logo */}
        <div className="absolute top-2 right-2">
          {stream.platform === "twitch" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-500 bg-black/50 p-1"
            >
              <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
            </svg>
          ) : (
            <X className="text-white bg-black/50 p-1" size={24} />
          )}
        </div>

        {/* Live Badge - Always show as requested */}
        <div className="absolute top-2 left-2 bg-[#f70f62] px-2 py-0.5 text-xs font-bold text-white">
          LIVE
        </div>

        {/* Prediction Icon - Show on some streams */}
        {position === "left" || position === "center" ? (
          <div className="absolute top-2 left-16 bg-[#00ff85] px-2 py-0.5 text-xs font-bold text-black flex items-center gap-1">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            PREDICTION
          </div>
        ) : null}

        {/* Viewer Count */}
        <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 flex items-center gap-1">
          <span className="text-xs font-bold text-white">
            {stream.viewers && typeof stream.viewers === "number"
              ? stream.viewers.toLocaleString()
              : "0"}{" "}
            viewers
          </span>
        </div>

        {/* Channel Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <Link
            href={`/channel/${stream.id}`}
            className="text-white font-bold hover:underline"
          >
            {stream.streamer.name}
          </Link>
          <p className="text-xs text-wanna-green uppercase">
            {stream.category}
          </p>
          <h3 className="text-white font-bold line-clamp-2 group-hover:text-wanna-green transition-colors mt-1">
            {stream.title}
          </h3>
        </div>
      </div>
    </div>
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
    platform: "twitch",
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
