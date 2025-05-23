"use client";

import React, { useState } from "react";
import { Search, MoreVertical, User, X, Users, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Navbar component from the homepage
const Navbar = () => {
  return (
    <nav className="text-white p-4 bg-[#1d1d1d]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="h-8">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-wanna-pink"
            >
              WANNA ?
            </Link>
          </div>

          {/* Browse Dropdown */}
          <div className="relative group">
            <button className="px-3 py-2 rounded hover:bg-gray-800 hover:text-wanna-pink">
              Browse
            </button>
          </div>

          {/* Following Button */}
          <Link
            href="/following"
            className="px-3 py-2 rounded hover:bg-gray-800 hover:text-wanna-pink"
          >
            Following
          </Link>

          {/* Three Dots Menu - Vertical with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-2 py-2 rounded hover:bg-gray-800 hover:text-wanna-pink">
                <MoreVertical size={18} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                Guides
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                Docs
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                Community
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                Support
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                Send Feedback
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Search Field with Icon */}
        <div className="flex-1 max-w-md mx-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-none text-white border-transparent focus:border-wanna-green outline-none bg-[#3d3d3d]"
          />
        </div>

        <div className="flex items-center space-x-4">
          {/* WANNA Points */}
          <div className="flex items-center">
            <button className="bg-wanna-pink text-white px-3 py-1 rounded-none mr-2">
              GET WANNA POINTS
            </button>
            <span className="text-sm">1,250</span>
          </div>

          {/* Profile Icon with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-8 h-8 rounded-none bg-gray-700 flex items-center justify-center hover:bg-gray-600">
                <User size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
              <DropdownMenuLabel className="text-gray-400">
                xStreamUser123
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                <Link href="/my-channels" className="w-full">
                  My Channels
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                Transaction History
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

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
    <div
      className={`relative overflow-hidden group cursor-pointer transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#F70F62] ${channel.platform === "twitch" ? "border border-purple-500" : "border border-white"}`}
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
    </div>
  );
};

// Add Channel Component
const AddChannelSection = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h3 className="text-wanna-green font-bold text-lg mb-4 flex items-center">
        <Plus size={18} className="mr-1" /> ADD CHANNEL
      </h3>
      <div className="flex space-x-4">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 flex items-center space-x-2 transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#F70F62]">
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
            className="mr-2"
          >
            <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
          </svg>
          Connect Twitch
        </button>
        <button className="bg-black hover:bg-gray-900 text-white px-4 py-2 flex items-center space-x-2 border border-white transition-all duration-200 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#F70F62]">
          <X size={20} className="mr-2" />
          Connect X
        </button>
      </div>
    </div>
  );
};

// My Channels Page Component
export default function MyChannelsPage() {
  const [platformFilter, setPlatformFilter] = useState<"all" | "twitch" | "x">(
    "all",
  );

  // Mock channel data
  const channels: ChannelProps[] = [
    {
      id: "1",
      name: "MyGamingChannel",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      platform: "twitch",
      isLive: true,
      viewers: 12500,
    },
    {
      id: "2",
      name: "MyMusicStream",
      image:
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
      platform: "x",
      isLive: false,
    },
    {
      id: "3",
      name: "MyTravelVlogs",
      image:
        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80",
      platform: "twitch",
      isLive: true,
      viewers: 7600,
    },
    {
      id: "4",
      name: "MyCryptoTalks",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
      platform: "x",
      isLive: true,
      viewers: 5932,
    },
  ];

  // Filter channels based on selected filters
  const filteredChannels = channels.filter((channel) => {
    // Filter by platform
    if (platformFilter !== "all" && channel.platform !== platformFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-black text-white font-['Neue_Machina',_sans-serif]">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-wanna-green uppercase">
            My Channels
          </h1>

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
          </div>
        </div>

        {/* Add Channel Section */}
        <AddChannelSection />

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
              Try adjusting your filters or connect a new channel
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
