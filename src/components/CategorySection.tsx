import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, X } from "lucide-react";

interface StreamProps {
  id: string;
  title: string;
  thumbnail: string;
  viewerCount: number;
  streamerName: string;
  streamerAvatar: string;
  isLive?: boolean;
  platform?: string;
}

interface CategorySectionProps {
  title: string;
  streams?: StreamProps[];
}

const CategorySection = ({
  title = "Gaming",
  streams = [],
}: CategorySectionProps) => {
  // Default streams if none are provided
  const defaultStreams: StreamProps[] = [
    {
      id: "1",
      title: "Playing Valorant with viewers!",
      thumbnail:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      viewerCount: 1245,
      streamerName: "GamerPro",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=gamer1",
      isLive: true,
      platform: "twitch",
    },
    {
      id: "2",
      title: "Minecraft building competition",
      thumbnail:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
      viewerCount: 876,
      streamerName: "BlockMaster",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=block2",
      isLive: false,
      platform: "x",
    },
    {
      id: "3",
      title: "League of Legends ranked grind",
      thumbnail:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      viewerCount: 2340,
      streamerName: "LeagueQueen",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=queen3",
      isLive: true,
      platform: "twitch",
    },
    {
      id: "4",
      title: "Apex Legends tournament practice",
      thumbnail:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
      viewerCount: 1567,
      streamerName: "ApexPredator",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=apex4",
      isLive: true,
      platform: "x",
    },
    {
      id: "5",
      title: "Fortnite with subscribers",
      thumbnail:
        "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=800&q=80",
      viewerCount: 932,
      streamerName: "BuildKing",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=king5",
      isLive: false,
      platform: "twitch",
    },
    {
      id: "6",
      title: "Call of Duty: Warzone highlights",
      thumbnail:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
      viewerCount: 1823,
      streamerName: "WarzonePro",
      streamerAvatar:
        "https://api.dicebear.com/7.x/avataaars/svg?seed=warzone6",
      isLive: true,
      platform: "x",
    },
  ];

  const displayStreams = streams.length > 0 ? streams : defaultStreams;

  // Format viewer count (e.g., 1500 -> 1.5K)
  const formatViewerCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="w-full bg-background py-6 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-wanna-green uppercase">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {displayStreams.slice(0, 4).map((stream) => (
            <div key={stream.id}>
              <Link
                href={`/channel/${stream.id}`}
                className={`block relative overflow-hidden group cursor-pointer transition-all duration-200 ${stream.platform === "twitch" ? "border-2 border-purple-500 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#9146FF]" : "border-2 border-white hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#FFFFFF]"}`}
              >
                {/* Background Image */}
                <div className="relative w-full aspect-video">
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

                  {/* Viewer Count */}
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 flex items-center gap-1">
                    <Users className="h-3 w-3 text-wanna-green" />
                    <span className="text-xs font-bold text-white">
                      {formatViewerCount(stream.viewerCount)}
                    </span>
                  </div>

                  {/* Channel Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                    <h3 className="text-white font-bold line-clamp-1">
                      {stream.title}
                    </h3>
                    <Link
                      href={`/channel/${stream.id}`}
                      className="text-xs text-wanna-green uppercase font-bold hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {stream.streamerName}
                    </Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            className="text-wanna-green hover:text-white font-bold uppercase flex items-center gap-1 px-4 py-2 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#F70F62] transition-all duration-200"
          >
            SHOW ALL &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
