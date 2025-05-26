"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MoreVertical, User, X, Users } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FeaturedContent from "../components/FeaturedContent";
import CategorySection from "../components/CategorySection";
import InteractiveElements from "../components/InteractiveElements";
import FeaturedCategories from "../components/FeaturedCategories";

// Create a custom navbar component directly in this file since there seems to be an issue with the import
const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  // Mock accounts for search
  const mockAccounts = [
    {
      id: "twitch-1",
      name: "NinjaStreamer",
      image:
        "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80",
      platform: "twitch",
      isLive: true,
      viewers: 45600,
    },
    {
      id: "twitch-2",
      name: "ShroudGaming",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
      platform: "twitch",
      isLive: false,
    },
    {
      id: "x-1",
      name: "ElonMusk",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      platform: "x",
      isLive: false,
    },
    {
      id: "x-2",
      name: "MrBeast",
      image:
        "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
      platform: "x",
      isLive: true,
      viewers: 78900,
    },
  ];

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Filter accounts based on search query
    const results = mockAccounts.filter((account) =>
      account.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    setSearchResults(results);
    setShowSearchResults(true);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="text-white p-4 bg-[#1d1d1d]">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="h-8">
            <Link href="/" className="text-xl font-bold text-white hover:text-wanna-pink">
              WANNA ?
            </Link>
          </div>

          {/* Predictions Link */}
          <Link href="/predictions" className="px-3 py-2 hover:text-[#f70f62]">
            Predictions
          </Link>

          {/* Following Button */}
          <Link href="/following" className="px-3 py-2 hover:text-[#f70f62]">
            Following
          </Link>

          {/* Three Dots Menu - Vertical with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-2 py-2 hover:text-[#f70f62]">
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
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-none text-white border-transparent focus:border-[#00ff85] focus:border-2 outline-none bg-[#3d3d3d]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() =>
              searchQuery.trim() !== "" && setShowSearchResults(true)
            } />

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div
              ref={searchResultsRef}
              className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 shadow-lg max-h-96 overflow-y-auto">
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/channel/${result.id}`}
                  className="flex items-center p-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                  onClick={() => setShowSearchResults(false)}>
                  <div className="w-10 h-10 mr-3 overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3
                      className="text-sm font-bold text-white truncate group-hover:text-wanna-green transition-colors">
                      {result.name}
                    </h3>
                    <Link
                      href={`/channel/${result.id}`}
                      className="text-xs text-wanna-green uppercase font-bold hover:underline">
                      {result.name}
                    </Link>
                    <div className="text-xs text-gray-400 flex items-center">
                      {result.platform === "twitch" ? (
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
                          className="text-purple-500 mr-1">
                          <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
                        </svg>
                      ) : (
                        <X className="h-3 w-3 mr-1" />
                      )}
                      {result.platform.charAt(0).toUpperCase() +
                        result.platform.slice(1)}
                      {result.isLive && (
                        <span className="ml-2 text-[#f70f62] font-bold">
                          • LIVE
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* WANNA Points */}
          <div className="flex items-center">
            <button className="wanna-points-gradient px-3 py-1 rounded-none mr-2">
              GET WANNA POINTS
            </button>
            <span className="text-sm">1,250</span>
          </div>

          {/* Profile Icon with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-8 h-8 rounded-none bg-gray-700 flex items-center justify-center hover:bg-gray-600">
                <User size={16} fill="none" />
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

export default function HomePage() {
  // Sample data for categories
  const categories = [
    {
      id: 1,
      title: "Gaming",
      streams: [
        {
          id: 101,
          title: "Apex Legends Season 20 Ranked",
          thumbnail:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
          viewerCount: 12500,
          streamer: {
            name: "GamerPro99",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro99",
          },
        },
        {
          id: 102,
          title: "Minecraft Building Competition",
          thumbnail:
            "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
          viewerCount: 876,
          streamer: {
            name: "BlockMaster",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=block2",
          },
          platform: "x",
          isLive: false,
        },
        {
          id: 103,
          title: "Valorant Tournament Finals",
          thumbnail:
            "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=800&q=80",
          viewerCount: 22000,
          streamer: {
            name: "TacticalShooter",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=TacticalShooter",
          },
        },
        {
          id: 104,
          title: "League of Legends Pro Play",
          thumbnail:
            "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&q=80",
          viewerCount: 15300,
          streamer: {
            name: "LaneKing",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LaneKing",
          },
          platform: "x",
        },
        {
          id: 105,
          title: "Fortnite Chapter 5 Gameplay",
          thumbnail:
            "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
          viewerCount: 9800,
          streamer: {
            name: "BuilderPro",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=BuilderPro",
          },
        },
        {
          id: 106,
          title: "League of Legends ranked grind",
          thumbnail:
            "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
          viewerCount: 2340,
          streamerName: "LeagueQueen",
          streamerAvatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=queen3",
          platform: "twitch",
          isLive: true,
        },
        {
          id: "4",
          title: "Apex Legends tournament practice",
          thumbnail:
            "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
          viewerCount: 1567,
          streamerName: "ApexPredator",
          streamerAvatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=apex4",
          platform: "x",
          isLive: true,
        },
        {
          id: "5",
          title: "Fortnite with subscribers",
          thumbnail:
            "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?w=800&q=80",
          viewerCount: 932,
          streamerName: "BuildKing",
          streamerAvatar:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=king5",
          platform: "twitch",
          isLive: false,
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
          platform: "x",
          isLive: true,
        },
      ],
    },
    {
      id: 2,
      title: "Music",
      streams: [
        {
          id: 201,
          title: "Live Piano Session",
          thumbnail:
            "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
          viewerCount: 5200,
          streamer: {
            name: "PianoVirtuoso",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=PianoVirtuoso",
          },
          platform: "x",
        },
        {
          id: 202,
          title: "Electronic Music Production",
          thumbnail:
            "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
          viewerCount: 3800,
          streamer: {
            name: "BeatMaker",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BeatMaker",
          },
        },
        {
          id: 203,
          title: "Guitar Jam Session",
          thumbnail:
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
          viewerCount: 4100,
          streamer: {
            name: "StringMaster",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=StringMaster",
          },
        },
        {
          id: 204,
          title: "Vocal Coaching Live",
          thumbnail:
            "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&q=80",
          viewerCount: 2900,
          streamer: {
            name: "VoiceCoach",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=VoiceCoach",
          },
        },
      ],
    },
    {
      id: 3,
      title: "IRL",
      streams: [
        {
          id: 301,
          title: "Tokyo Street Tour",
          thumbnail:
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
          viewerCount: 7600,
          streamer: {
            name: "TravelBuddy",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=TravelBuddy",
          },
        },
        {
          id: 302,
          title: "Cooking Italian Cuisine",
          thumbnail:
            "https://images.unsplash.com/photo-1556910103-1c02745aec78?w=800&q=80",
          viewerCount: 6200,
          streamer: {
            name: "ChefMaster",
            avatar:
              "https://api.dicebear.com/7.x/avataaars/svg?seed=ChefMaster",
          },
        },
        {
          id: 303,
          title: "Fitness Workout Session",
          thumbnail:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
          viewerCount: 4800,
          streamer: {
            name: "FitCoach",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FitCoach",
          },
          platform: "x",
        },
        {
          id: 304,
          title: "Art & Painting Workshop",
          thumbnail:
            "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
          viewerCount: 3500,
          streamer: {
            name: "ArtistPro",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArtistPro",
          },
        },
      ],
    },
  ];

  // Sample data for featured content
  const featuredStreams = [
    {
      id: 1001,
      title: "Championship Finals - Team A vs Team B",
      thumbnail:
        "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80",
      viewerCount: 45000,
      streamer: {
        name: "ESportsOfficial",
        avatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=ESportsOfficial",
      },
      featured: true,
    },
    {
      id: 1002,
      title: "Live Concert - Electronic Night",
      thumbnail:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      viewerCount: 32000,
      streamer: {
        name: "MusicFestival",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MusicFestival",
      },
      featured: true,
    },
    {
      id: 1003,
      title: "New York City Marathon Live",
      thumbnail:
        "https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&q=80",
      viewerCount: 28000,
      streamer: {
        name: "SportsChannel",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SportsChannel",
      },
      featured: true,
    },
    {
      id: 1004,
      title: "Celebrity Interview Special",
      thumbnail:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
      viewerCount: 37000,
      streamer: {
        name: "EntertainmentNow",
        avatar:
          "https://api.dicebear.com/7.x/avataaars/svg?seed=EntertainmentNow",
      },
      featured: true,
    },
  ];

  // Sample data for interactive elements
  const interactiveElements = {
    predictions: [
      {
        id: "p1",
        title: "Who will win the championship?",
        options: ["Team A", "Team B"],
        endTime: "30:00",
        participants: 1245,
        points: 50000,
      },
      {
        id: "p2",
        title: "Will the player break the record today?",
        options: ["Yes", "No"],
        endTime: "15:30",
        participants: 876,
        points: 25000,
      },
    ],
    polls: [
      {
        id: "poll1",
        question: "What game should be played next?",
        options: ["Valorant", "Apex Legends", "Fortnite", "Minecraft"],
        votes: 3421,
        endTime: "10:00",
      },
      {
        id: "poll2",
        question: "Best song of the night?",
        options: ["Track 1", "Track 2", "Track 3"],
        votes: 1876,
        endTime: "5:45",
      },
    ],
    powerChats: [
      {
        id: "pc1",
        channel: "GamingLeague",
        activeUsers: 5432,
        recentMessage: "That play was incredible!",
        activity: "high",
      },
      {
        id: "pc2",
        channel: "MusicLovers",
        activeUsers: 3210,
        recentMessage: "This beat is fire! 🔥",
        activity: "medium",
      },
    ],
  };

  // Define type for streams to use in the page
  type StreamType = {
    id: string | number;
    title: string;
    thumbnail: string;
    viewerCount: number;
    streamerName?: string;
    streamerAvatar?: string;
    streamer?: {
      name: string;
      avatar: string;
    };
    isLive?: boolean;
    platform?: string;
  };

  return (
    <div
      className="min-h-screen bg-black text-white font-['Neue_Machina',_sans-serif]">
      <Navbar />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Featured Content Section */}
        <section className="mb-10">
          <FeaturedContent streams={featuredStreams} />
        </section>

        {/* Live Predictions Section */}
        <section className="mb-10">
          <InteractiveElements predictions={interactiveElements.predictions} />
          <div className="flex justify-center mt-4">
            <Link href="/predictions">
              <button className="hover:text-purple-400 font-medium text-white">SHOW MORE ></button>
            </Link>
          </div>
        </section>

        {/* Featured Categories Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-wanna-green uppercase">
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className="p-4 flex items-center space-x-3 hover:bg-[#f70f62] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#00ff85] transition-all duration-200 cursor-pointer border-0 border-none bg-[#f70f62]">
              <div className="bg-[#F70F62] p-2">
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
                  className="text-white">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
              </div>
              <span className="text-white font-medium">Gaming</span>
            </div>
            <div
              className="p-4 flex items-center space-x-3 hover:bg-[#f70f62] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#00ff85] transition-all duration-200 cursor-pointer border-0 border-none bg-[#f70f62]">
              <div className="bg-[#F70F62] p-2">
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
                  className="text-white">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="4"></circle>
                  <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                  <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                  <line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line>
                  <line x1="14.83" y1="9.17" x2="18.36" y2="5.64"></line>
                  <line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line>
                </svg>
              </div>
              <span className="text-white font-medium">Sports</span>
            </div>
            <div
              className="p-4 flex items-center space-x-3 hover:bg-[#f70f62] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#00ff85] transition-all duration-200 cursor-pointer border-0 border-none bg-[#f70f62]">
              <div className="bg-[#F70F62] p-2">
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
                  className="text-white">
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
              </div>
              <span className="text-white font-medium">Music</span>
            </div>
            <div
              className="p-4 flex items-center space-x-3 hover:bg-[#f70f62] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#00ff85] transition-all duration-200 cursor-pointer border-0 border-none bg-[#f70f62]">
              <div className="bg-[#F70F62] p-2">
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
                  className="text-white">
                  <path
                    d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7h-5a8 8 0 0 0-5 2 8 8 0 0 0-5-2H2Z"></path>
                  <path d="M6 11c1.5 0 3 .5 3 2-2 0-3 0-3-2Z"></path>
                </svg>
              </div>
              <span className="text-white font-medium">IRL</span>
            </div>
          </div>
          <div className="flex justify-center mt-4"></div>
        </section>

        {/* Category Sections */}
        {categories.map((category) => (
          <section key={category.id} className="mb-10">
            <CategorySection
              title={category.title}
              streams={category.streams.map((stream) => ({
                id: stream.id.toString(),
                title: stream.title,
                thumbnail: stream.thumbnail,
                viewerCount: stream.viewerCount,
                streamerName:
                  stream.streamerName ||
                  (stream.streamer ? stream.streamer.name : "Unknown Streamer"),
                streamerAvatar:
                  stream.streamerAvatar ||
                  (stream.streamer
                    ? stream.streamer.avatar
                    : "https://api.dicebear.com/7.x/avataaars/svg?seed=default"),
                isLive: stream.isLive !== undefined ? stream.isLive : true,
                platform: stream.platform || "twitch",
              }))} />
          </section>
        ))}
      </main>
    </div>
  );
}
