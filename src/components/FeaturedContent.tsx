"use client";

import React, { useState } from "react";
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
  const itemsPerPage = 4;
  const totalPages = Math.ceil(streams.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= streams.length ? 0 : prevIndex + itemsPerPage,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? Math.max(0, streams.length - itemsPerPage)
        : prevIndex - itemsPerPage,
    );
  };

  const visibleStreams = streams.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  return (
    <div className="w-full bg-background py-6 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
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

const StreamCard = ({ stream }: { stream: StreamProps }) => {
  return (
    <Card className="overflow-hidden bg-gray-900 transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#F70F62] group rounded-none border-0 border-none">
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
            <p className="text-sm font-bold text-white">
              {stream.streamer.name}
            </p>
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
