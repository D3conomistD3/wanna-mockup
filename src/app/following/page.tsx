"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Users, Heart, Plus, TrendingUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// Channel Card Component
interface ChannelProps {
  id: string;
  name: string;
  image: string;
  platform: "twitch" | "x";
  isLive: boolean;
  viewers?: number;
}

const ChannelCard = ({ channel }: { channel: ChannelProps }) => {
  return (
    <Link
      href={`/channel/${channel.id}`}
      className={`relative overflow-hidden group cursor-pointer transition-all duration-200 ${channel.platform === "twitch" ? "border border-purple-500 twitch-hover-shadow" : "border border-white x-hover-shadow"}`}
    >
      {/* Background Image */}
      <div className="relative w-full h-48">
        <img
          src={channel.image}
          alt={channel.name}
          className="w-full h-full object-cover"
        />

        {/* Platform Logo */}
        <div className="absolute top-2 right-2">
          {channel.platform === "twitch" ? (
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

        {/* Live Badge */}
        {channel.isLive && (
          <div className="absolute top-2 left-2 bg-[#f70f62] px-2 py-0.5 text-xs font-bold text-white">
            LIVE
          </div>
        )}

        {/* Prediction Icon - only show on some live channels */}
        {channel.isLive && channel.id % 2 === 0 && (
          <div className="absolute top-2 left-16 bg-[#00ff85] px-2 py-0.5 text-xs font-bold text-black flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> PREDICTION
          </div>
        )}

        {/* Viewer Count for Live Channels */}
        {channel.isLive && channel.viewers && (
          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 flex items-center gap-1">
            <Users className="h-3 w-3 text-wanna-green" />
            <span className="text-xs font-bold text-white">
              {channel.viewers.toLocaleString()}
            </span>
          </div>
        )}

        {/* Channel Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <h3 className="text-white font-bold">{channel.name}</h3>
        </div>
      </div>
    </Link>
  );
};

// Following Page Component
export default function FollowingPage() {
  const [platformFilter, setPlatformFilter] = useState<"all" | "twitch" | "x">(
    "all",
  );
  const [liveOnly, setLiveOnly] = useState(false);
  const [isAddChannelsOpen, setIsAddChannelsOpen] = useState(false);

  // Mock channel data
  const [channels, setChannels] = useState<ChannelProps[]>([
    {
      id: "1",
      name: "GamerPro99",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      platform: "twitch",
      isLive: true,
      viewers: 12500,
    },
    {
      id: "2",
      name: "MusicMaestro",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
      platform: "x",
      isLive: false,
    },
    {
      id: "3",
      name: "TravelBuddy",
      image:
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
      platform: "twitch",
      isLive: true,
      viewers: 7600,
    },
    {
      id: "4",
      name: "CryptoGuru",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      platform: "x",
      isLive: true,
      viewers: 5932,
    },
    {
      id: "5",
      name: "ArtistExtraordinaire",
      image:
        "https://images.unsplash.com/photo-1536924430914-91f9e2041b83?w=800&q=80",
      platform: "twitch",
      isLive: false,
    },
    {
      id: "6",
      name: "ChefSupreme",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
      platform: "x",
      isLive: false,
    },
    {
      id: "7",
      name: "ProLeaguePlayer",
      image:
        "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
      platform: "twitch",
      isLive: true,
      viewers: 132456,
    },
    {
      id: "8",
      name: "FitCoach",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
      platform: "x",
      isLive: true,
      viewers: 4532,
    },
  ]);

  // Mock accounts from social platforms
  const mockAccounts = {
    twitch: [
      {
        id: "twitch-1",
        name: "NinjaStreamer",
        image:
          "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80",
        platform: "twitch" as const,
        isLive: true,
        viewers: 45600,
        isFollowed: false,
      },
      {
        id: "twitch-2",
        name: "ShroudGaming",
        image:
          "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
        platform: "twitch" as const,
        isLive: false,
        isFollowed: false,
      },
      {
        id: "twitch-3",
        name: "PokimaneOfficial",
        image:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
        platform: "twitch" as const,
        isLive: true,
        viewers: 23400,
        isFollowed: false,
      },
      {
        id: "twitch-4",
        name: "TimTheTatman",
        image:
          "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
        platform: "twitch" as const,
        isLive: false,
        isFollowed: false,
      },
    ],
    x: [
      {
        id: "x-1",
        name: "ElonMusk",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
        platform: "x" as const,
        isLive: false,
        isFollowed: false,
      },
      {
        id: "x-2",
        name: "MrBeast",
        image:
          "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
        platform: "x" as const,
        isLive: true,
        viewers: 78900,
        isFollowed: false,
      },
      {
        id: "x-3",
        name: "KSI",
        image:
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        platform: "x" as const,
        isLive: false,
        isFollowed: false,
      },
    ],
  };

  // Handle following/unfollowing channels
  const toggleFollow = (account: ChannelProps) => {
    // Check if the channel is already in the list
    const existingIndex = channels.findIndex((ch) => ch.id === account.id);

    if (existingIndex >= 0) {
      // Remove from followed channels
      setChannels((prev) => prev.filter((ch) => ch.id !== account.id));
    } else {
      // Add to followed channels
      setChannels((prev) => [...prev, account]);
    }
  };

  // Filter channels based on selected filters
  const filteredChannels = channels.filter((channel) => {
    // Filter by platform
    if (platformFilter !== "all" && channel.platform !== platformFilter) {
      return false;
    }

    // Filter by live status
    if (liveOnly && !channel.isLive) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white font-['Neue_Machina',_sans-serif]">
      <Navbar activePage="following" />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-wanna-green uppercase">
              Following
            </h1>
            <Button
              onClick={() => setIsAddChannelsOpen(true)}
              className="bg-[#f70f62] hover:bg-[#d00c52] text-white flex items-center gap-1 rounded-none"
            >
              <Plus className="h-4 w-4" /> ADD CHANNELS
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            {/* Platform Filter Toggles */}
            <div className="flex space-x-2">
              <Toggle
                pressed={platformFilter === "all"}
                onPressedChange={() => setPlatformFilter("all")}
                className={`px-4 py-2 ${platformFilter === "all" ? "bg-gray-700 text-wanna-green" : "bg-gray-800 text-white"}`}
              >
                All
              </Toggle>
              <Toggle
                pressed={platformFilter === "twitch"}
                onPressedChange={() => setPlatformFilter("twitch")}
                className={`px-4 py-2 ${platformFilter === "twitch" ? "bg-gray-700 text-purple-500" : "bg-gray-800 text-white"}`}
              >
                Twitch
              </Toggle>
              <Toggle
                pressed={platformFilter === "x"}
                onPressedChange={() => setPlatformFilter("x")}
                className={`px-4 py-2 ${platformFilter === "x" ? "bg-gray-700 text-white" : "bg-gray-800 text-white"}`}
              >
                X
              </Toggle>
            </div>

            {/* Live Only Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold uppercase">LIVE ONLY</span>
              <Switch
                checked={liveOnly}
                onCheckedChange={setLiveOnly}
                className="data-[state=checked]:bg-[#f70f62] rounded-none h-6 w-12"
              />
            </div>
          </div>
        </div>

        {/* Channel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredChannels.map((channel) => (
            <ChannelCard key={channel.id} channel={channel} />
          ))}
        </div>

        {/* Empty State */}
        {filteredChannels.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Users className="h-16 w-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-400">
              No channels found
            </h3>
            <p className="text-gray-500 mt-2">
              {liveOnly
                ? "None of your followed channels are currently live"
                : "Try adjusting your filters"}
            </p>
          </div>
        )}
      </main>

      {/* Add Channels Modal */}
      <Dialog open={isAddChannelsOpen} onOpenChange={setIsAddChannelsOpen}>
        <DialogContent className="bg-[#1d1d1d] text-white border-gray-800 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-wanna-green">
              Add Channels
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="twitch" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger
                value="twitch"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-purple-500"
              >
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
                  className="mr-2"
                >
                  <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                </svg>
                Twitch
              </TabsTrigger>
              <TabsTrigger
                value="x"
                className="data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                <X className="mr-2 h-4 w-4" /> X
              </TabsTrigger>
            </TabsList>

            <TabsContent value="twitch" className="mt-4">
              <div className="space-y-4">
                {mockAccounts.twitch.map((account) => {
                  const isFollowed = channels.some(
                    (ch) => ch.id === account.id,
                  );
                  return (
                    <Link
                      key={account.id}
                      href={`/channel/${account.id}`}
                      className="flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 transition-colors w-full"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-4 overflow-hidden">
                          <img
                            src={account.image}
                            alt={account.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/channel/${account.id}`}
                            className="font-bold text-white hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {account.name}
                          </Link>
                          <div className="text-xs text-gray-400 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-purple-500 mr-1"
                            >
                              <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                            </svg>
                            Twitch
                            {account.isLive && (
                              <span className="ml-2 text-[#f70f62] font-bold">
                                • LIVE
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFollow(account);
                        }}
                        variant={isFollowed ? "outline" : "default"}
                        className={
                          isFollowed
                            ? "border-[#f70f62] text-[#f70f62] hover:bg-[#f70f62] hover:text-white rounded-none"
                            : "bg-[#f70f62] hover:bg-[#d00c52] text-white rounded-none"
                        }
                      >
                        <Heart
                          className="h-4 w-4 mr-1"
                          fill={isFollowed ? "#f70f62" : "none"}
                        />
                        {isFollowed ? "Following" : "Follow"}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="x" className="mt-4">
              <div className="space-y-4">
                {mockAccounts.x.map((account) => {
                  const isFollowed = channels.some(
                    (ch) => ch.id === account.id,
                  );
                  return (
                    <Link
                      key={account.id}
                      href={`/channel/${account.id}`}
                      className="flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 transition-colors w-full"
                    >
                      <div className="flex items-center">
                        <div className="w-12 h-12 mr-4 overflow-hidden">
                          <img
                            src={account.image}
                            alt={account.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/channel/${account.id}`}
                            className="font-bold text-white hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {account.name}
                          </Link>
                          <div className="text-xs text-gray-400 flex items-center">
                            <X className="h-3 w-3 mr-1" />X
                            {account.isLive && (
                              <span className="ml-2 text-[#f70f62] font-bold">
                                • LIVE
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFollow(account);
                        }}
                        variant={isFollowed ? "outline" : "default"}
                        className={
                          isFollowed
                            ? "border-[#f70f62] text-[#f70f62] hover:bg-[#f70f62] hover:text-white rounded-none"
                            : "bg-[#f70f62] hover:bg-[#d00c52] text-white rounded-none"
                        }
                      >
                        <Heart
                          className="h-4 w-4 mr-1"
                          fill={isFollowed ? "#f70f62" : "none"}
                        />
                        {isFollowed ? "Following" : "Follow"}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
