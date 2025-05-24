import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

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

        <ScrollArea className="w-full">
          <div className="flex space-x-4 pb-4">
            {displayStreams.slice(0, 4).map((stream) => (
              <div key={stream.id} className="min-w-[240px] max-w-[240px]">
                <Card
                  className={`overflow-hidden bg-gray-900 transition-all duration-200 group rounded-none border-0 border-none ${stream.platform === "twitch" ? "twitch-hover-shadow" : "x-hover-shadow"}`}
                >
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-[135px] object-cover rounded-none"
                    />
                    {stream.isLive && (
                      <Badge
                        variant="destructive"
                        className="absolute top-2 left-2 px-2 py-0.5 bg-[#f70f62] uppercase font-bold rounded-none"
                      >
                        LIVE
                      </Badge>
                    )}
                    {/* Platform logo */}
                    {stream.platform && (
                      <div className="absolute top-2 right-2 bg-black/70 p-1 rounded-sm">
                        {stream.platform === "twitch" ? (
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="#9146FF"
                          >
                            <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                          </svg>
                        ) : stream.platform === "x" ? (
                          <svg
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="white"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        ) : null}
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 px-2 py-1 flex items-center gap-1 bg-black/70">
                      <Users className="h-3 w-3 text-white/100" />
                      <span className="text-xs font-bold text-white/100">
                        {formatViewerCount(stream.viewerCount)}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-3 bg-gray-900">
                    <div className="flex items-start gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={stream.streamerAvatar}
                          alt={stream.streamerName}
                        />
                        <AvatarFallback className="bg-gray-800 text-wanna-green">
                          {stream.streamerName &&
                          typeof stream.streamerName === "string" &&
                          stream.streamerName.length > 0
                            ? stream.streamerName.substring(0, 2)
                            : "ST"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="overflow-hidden">
                        <h3 className="text-sm font-bold text-white truncate group-hover:text-wanna-green transition-colors">
                          {stream.title}
                        </h3>
                        <Link
                          href={`/channel/${stream.id}`}
                          className="text-xs text-wanna-green uppercase font-bold hover:underline"
                        >
                          {stream.streamerName}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-center">
          <Button
            variant="ghost"
            className="text-wanna-green hover:text-white font-bold uppercase flex items-center gap-1 px-4 py-2 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#F70F62] transition-all duration-200"
          >
            Show all &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
