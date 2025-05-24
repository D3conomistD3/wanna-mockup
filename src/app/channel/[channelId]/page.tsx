"use client";

import React from "react";
import { MoreVertical, User, X, Users, Heart } from "lucide-react";
import Link from "next/link";
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
import { Clock } from "lucide-react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

// Prediction Card Component
const PredictionCard = ({ type = "PREDICTION", showButton = true }) => {
  return (
    <Card className="overflow-hidden bg-[#3d3d3d] transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#F70F62] group border-0 border-none rounded-none">
      <CardHeader className="pb-2 bg-[#3d3d3d]">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Badge className="mr-2 bg-[#F70F62] text-white font-bold px-2 py-0 text-xs rounded-none">
              {type}
            </Badge>
            <Badge className="mr-2 bg-[#F70F62] text-white font-bold px-2 py-0 text-xs rounded-none">
              LIVE
            </Badge>
          </div>
          <div className="text-[#F70F62] font-bold text-xs flex items-center">
            <Clock className="mr-1 h-3 w-3 text-[#00ff85]" /> 00:15:30
          </div>
        </div>
        <CardTitle className="text-lg mt-2 text-white group-hover:text-wanna-green transition-colors">
          {type === "PREDICTION"
            ? "Will they beat the boss in one try?"
            : "What game should be played next?"}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-[#3d3d3d]">
        <div className="space-y-2">
          {type === "PREDICTION" ? (
            <>
              <div className="flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors border-[#00ff85] border-2 rounded-none">
                <span className="text-[#00ff85] font-bold">Yes</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors border-[#f70f62] border-2 rounded-none">
                <span className="text-white font-bold">No</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors border-[#00ff85] border-2 rounded-none">
                <span className="text-[#00ff85] font-bold">Valorant</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors border-[#f70f62] border-2 rounded-none">
                <span className="text-white font-bold">Apex Legends</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors border-[#f70f62] border-2 rounded-none">
                <span className="text-white font-bold">Fortnite</span>
              </div>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-gray-800 bg-[#3d3d3d]">
        <div className="flex items-center text-xs text-gray-400">
          <Users className="h-3 w-3 mr-1" />
          876 participants
        </div>
        {showButton && (
          <Button
            size="sm"
            className="text-xs bg-wanna-green text-white font-bold hover:bg-wanna-pink hover:text-white transition-colors bg-[#F70F62] rounded-none"
          >
            {type === "PREDICTION" ? "Place Prediction" : "Vote"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

// Channel Page Component
export default function ChannelPage() {
  const params = useParams();
  const channelId = params.channelId;

  // Mock channel data - in a real app, this would be fetched based on channelId
  const channelData = {
    id: channelId,
    name: "COHHCARNAGE",
    isVerified: true,
    followers: "1.6M",
    description:
      "Happy, helpful and respectful people welcome. Come say hello!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=COHHCARNAGE",
    coverImage:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80",
    isLive: true,
    currentStream: {
      title: "COHHCARNAGE IS STREAMING TAINTED GRAIL: THE FALL OF AVALON",
      viewers: "13K",
    },
    connectedUsers: 2037,
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Neue_Machina',_sans-serif]">
      <Navbar />
      <main className="w-full">
        {/* Full-width stream cover image */}
        <div className="relative w-full h-[400px] bg-gray-900">
          <img
            src={channelData.coverImage}
            alt={`${channelData.name}'s stream`}
            className="w-full h-full object-cover"
          />
          {channelData.isLive && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center">
              {/* Play button with hover effect */}
              <div className="group cursor-pointer mb-4">
                <div className="h-16 w-16 bg-transparent border-2 border-white flex items-center justify-center group-hover:border-[#00ff85] transition-colors duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="transparent"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-[#00ff85] transition-colors duration-200"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white bg-black bg-opacity-70 p-4 max-w-md text-center">
                {channelData.currentStream.title}
              </h2>
              {/* LIVE badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-[#f70f62] text-white font-bold uppercase px-2 py-0.5">
                  LIVE
                </div>
              </div>
              {/* Viewer count */}
              <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 flex items-center gap-1">
                <Users className="h-3 w-3 text-wanna-green" />
                <span className="text-xs font-bold">13,690</span>
              </div>
            </div>
          )}
        </div>

        {/* Channel info section */}
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            {/* Channel avatar and info */}
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24 rounded-none border-2 border-[#f70f62]">
                <AvatarImage src={channelData.avatar} alt={channelData.name} />
                <AvatarFallback className="bg-gray-800 text-wanna-green">
                  {channelData.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-grow">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold">{channelData.name}</h1>
                    {channelData.isVerified && (
                      <span className="text-wanna-green">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 mb-2">
                    {channelData.followers} followers
                  </p>
                  <p className="text-gray-300 max-w-2xl">
                    {channelData.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#1d1d1d] p-3 stats-box transition-all duration-200">
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[#00ff85]"
                        >
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        <span className="text-[#00ff85] font-bold">
                          {channelData.connectedUsers}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">Connected</div>
                    </div>
                    <div className="bg-[#1d1d1d] p-3 stats-box transition-all duration-200">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-[#00ff85]" />
                        <span className="font-bold text-[#00ff85]">
                          {channelData.followers}
                        </span>
                      </div>
                      <div className="text-xs text-gray-400">Followers</div>
                    </div>
                  </div>
                  <Button className="bg-transparent hover:bg-[#f70f62] border-2 border-[#f70f62] text-white font-bold px-6 py-2 flex items-center gap-2 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#00ff85] transition-all duration-200 rounded-none">
                    <Heart className="h-4 w-4" /> FOLLOW
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Live Activity Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-wanna-green uppercase">
              Live Activity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute top-2 left-2 z-10 bg-[#F70F62] text-white font-bold px-2 py-0.5 text-xs">
                  PREDICTION
                </div>
                <PredictionCard type="PREDICTION" />
              </div>
              <div className="relative">
                <div className="absolute top-2 left-2 z-10 bg-[#F70F62] text-white font-bold px-2 py-0.5 text-xs">
                  POLL
                </div>
                <PredictionCard type="POLL" />
              </div>
            </div>
          </section>

          {/* Recent Activity Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-wanna-green uppercase">
              Recent Activity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <div className="absolute top-2 left-2 z-10 bg-[#F70F62] text-white font-bold px-2 py-0.5 text-xs">
                  PREDICTION
                </div>
                <PredictionCard type="PREDICTION" showButton={false} />
              </div>
              <div className="relative">
                <div className="absolute top-2 left-2 z-10 bg-[#F70F62] text-white font-bold px-2 py-0.5 text-xs">
                  POLL
                </div>
                <PredictionCard type="POLL" showButton={false} />
              </div>
              <div className="relative">
                <div className="absolute top-2 left-2 z-10 bg-[#F70F62] text-white font-bold px-2 py-0.5 text-xs">
                  PREDICTION
                </div>
                <PredictionCard type="PREDICTION" showButton={false} />
              </div>
            </div>
          </section>

          {/* Recent Broadcasts Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6 text-wanna-green uppercase">
              Recent Broadcasts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-4">
              {[
                {
                  id: "1",
                  title: "Playing Valorant with viewers!",
                  thumbnail:
                    "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
                  viewerCount: 1245,
                  streamerName: "COHHCARNAGE",
                  streamerAvatar: channelData.avatar,
                  isLive: false,
                  platform: "twitch",
                },
                {
                  id: "2",
                  title: "Minecraft building competition",
                  thumbnail:
                    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
                  viewerCount: 876,
                  streamerName: "COHHCARNAGE",
                  streamerAvatar: channelData.avatar,
                  isLive: false,
                  platform: "twitch",
                },
                {
                  id: "3",
                  title: "League of Legends ranked grind",
                  thumbnail:
                    "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
                  viewerCount: 2340,
                  streamerName: "COHHCARNAGE",
                  streamerAvatar: channelData.avatar,
                  isLive: false,
                  platform: "twitch",
                },
                {
                  id: "4",
                  title: "Apex Legends Season 20",
                  thumbnail:
                    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
                  viewerCount: 1876,
                  streamerName: "COHHCARNAGE",
                  streamerAvatar: channelData.avatar,
                  isLive: false,
                  platform: "twitch",
                },
                {
                  id: "5",
                  title: "Elden Ring DLC First Look",
                  thumbnail:
                    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
                  viewerCount: 3421,
                  streamerName: "COHHCARNAGE",
                  streamerAvatar: channelData.avatar,
                  isLive: false,
                  platform: "twitch",
                },
              ].map((stream) => (
                <div key={stream.id}>
                  <Card className="overflow-hidden bg-gray-900 transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#F70F62] group rounded-none border-0 border-none">
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
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 flex items-center gap-1">
                        <Users className="h-3 w-3 text-white/100" />
                        <span className="text-xs font-bold text-white/100">
                          {stream.viewerCount.toString()}
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
                          <p className="text-xs uppercase font-bold text-white/100">
                            {stream.streamerName}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
