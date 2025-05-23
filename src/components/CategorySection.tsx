import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";

interface StreamProps {
  id: string;
  title: string;
  thumbnail: string;
  viewerCount: number;
  streamerName: string;
  streamerAvatar: string;
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
    },
    {
      id: "2",
      title: "Minecraft building competition",
      thumbnail:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
      viewerCount: 876,
      streamerName: "BlockMaster",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=block2",
    },
    {
      id: "3",
      title: "League of Legends ranked grind",
      thumbnail:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      viewerCount: 2340,
      streamerName: "LeagueQueen",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=queen3",
    },
    {
      id: "4",
      title: "Apex Legends tournament practice",
      thumbnail:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
      viewerCount: 1567,
      streamerName: "ApexPredator",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=apex4",
    },
    {
      id: "5",
      title: "Fortnite with subscribers",
      thumbnail:
        "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=800&q=80",
      viewerCount: 932,
      streamerName: "BuildKing",
      streamerAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=king5",
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
                <Card className="overflow-hidden bg-gray-900 transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#F70F62] group rounded-none border-0 border-none">
                  <div className="relative">
                    <img
                      src={stream.thumbnail}
                      alt={stream.title}
                      className="w-full h-[135px] aspect-square object-cover rounded-none"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 font-bold">
                      {formatViewerCount(stream.viewerCount)} viewers
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
                        <p className="text-xs text-wanna-green uppercase font-bold">
                          {stream.streamerName}
                        </p>
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
