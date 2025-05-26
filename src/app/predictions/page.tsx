"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  TrendingUp,
  Droplets,
  Clock,
  BarChart2,
  Award,
  Search,
  MoreVertical,
  User,
  X,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-wanna-pink"
            >
              WANNA ?
            </Link>
          </div>

          {/* Predictions Link */}
          <Link
            href="/predictions"
            className="px-3 py-2 bg-gray-800 text-[#f70f62]"
          >
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
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
            }
          />

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div
              ref={searchResultsRef}
              className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-700 shadow-lg max-h-96 overflow-y-auto"
            >
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/channel/${result.id}`}
                  className="flex items-center p-3 hover:bg-gray-700 border-b border-gray-700 last:border-b-0"
                  onClick={() => setShowSearchResults(false)}
                >
                  <div className="w-10 h-10 mr-3 overflow-hidden">
                    <img
                      src={result.image}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-white">{result.name}</div>
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
                          className="text-purple-500 mr-1"
                        >
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
              <button className="w-8 h-8 rounded-none bg-gray-700 flex items-center justify-center hover:bg-gray-600">
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

// Prediction Card Component for the predictions page
const PredictionCard = ({ prediction }) => {
  // Generate a random thumbnail for the background
  const backgroundImage = prediction.channelAvatar
    ? prediction.channelAvatar.includes("GamingPro")
      ? "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
      : prediction.channelAvatar.includes("Crypto")
        ? "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80"
        : prediction.channelAvatar.includes("Music")
          ? "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80"
          : prediction.channelAvatar.includes("Rage")
            ? "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80"
            : prediction.channelAvatar.includes("Competitive")
              ? "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80"
              : "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80"
    : "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80";

  return (
    <Card className="overflow-hidden bg-[#3d3d3d] transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[4px_4px_0px_0px_#F70F62] group border-0 border-none rounded-none relative">
      {/* Blurred background image */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
        }}
      />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50"></div>
      <CardHeader className="pb-2 relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Badge className="mr-2 bg-[#F70F62] text-white font-bold px-2 py-0 text-xs rounded-none flex items-center gap-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE
            </Badge>
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage
                src={prediction.channelAvatar}
                alt={prediction.channel}
              />
            </Avatar>
            <Link
              href={`/channel/${prediction.id}`}
              className="text-sm font-bold text-white hover:underline"
            >
              {prediction.channel}
            </Link>
          </div>
          <div className="text-[#F70F62] font-bold text-xs flex items-center">
            <Clock className="mr-1 h-3 w-3 text-[#00ff85]" />{" "}
            {prediction.timeRemaining}
          </div>
        </div>
        <CardTitle className="text-lg mt-2 text-white group-hover:text-wanna-green transition-colors">
          {prediction.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="space-y-2">
          {prediction.options.map((option, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-2 bg-gray-800 hover:bg-gray-700 transition-colors ${option.name === "Yes" ? "border-[#00ff85]" : "border-[#f70f62]"} border-2 rounded-none`}
            >
              <span className="text-white font-bold">{option.name}</span>
              <Badge
                variant="secondary"
                className="bg-black text-wanna-pink font-bold rounded-none"
              >
                {option.odds}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-gray-800 relative z-10">
        <div className="flex items-center text-xs text-gray-400">
          <Users className="h-3 w-3 mr-1" />
          {prediction.participants.toLocaleString()} participating
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            className="text-xs bg-[#00ff85] text-black font-bold hover:bg-[#00cc6a] hover:text-white transition-colors rounded-none flex items-center gap-1"
          >
            {prediction.channelAvatar.includes("GamingPro") ||
            prediction.channelAvatar.includes("Competitive") ||
            prediction.channelAvatar.includes("Adventure") ? (
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
                className="text-black"
              >
                <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path>
              </svg>
            ) : (
              <X className="h-3 w-3 text-black" />
            )}
            WATCH STREAM
          </Button>
          <Button
            size="sm"
            className="text-xs bg-wanna-green text-white font-bold hover:bg-wanna-pink hover:text-white transition-colors bg-[#F70F62] rounded-none"
          >
            Place Prediction
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const PredictionsPage = () => {
  const [sortOption, setSortOption] = useState("24hr Volume");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories matching the homepage
  const categories = ["All", "Gaming", "Music", "IRL", "Creative"];

  // Sample sort options
  const sortOptions = [
    { name: "24hr Volume", icon: <TrendingUp className="mr-2 h-4 w-4" /> },
    { name: "Total Volume", icon: <BarChart2 className="mr-2 h-4 w-4" /> },
    { name: "Newest", icon: <Clock className="mr-2 h-4 w-4" /> },
    { name: "Ending Soon", icon: <Clock className="mr-2 h-4 w-4" /> },
    { name: "Competitive", icon: <Award className="mr-2 h-4 w-4" /> },
  ];

  // Generate a large set of prediction cards (18 cards - 3 columns x 6 rows)
  const generatePredictionCards = () => {
    const cards = [];
    const titles = [
      "Will BTC reach $100k by EOY?",
      "Will Trump win the election?",
      "Will Lakers win the championship?",
      "Will Ethereum merge happen in June?",
      "Will Apple release AR glasses this year?",
      "Will SpaceX reach Mars by 2025?",
      "Will inflation drop below 3% this year?",
      "Will Tesla stock hit $1000?",
      "Will the Fed raise rates again?",
      "Will AI replace programmers by 2030?",
      "Will Ukraine-Russia war end this year?",
      "Will Twitter rebrand again?",
      "Will Meta's VR headset sales exceed 10M?",
      "Will Netflix gain subscribers this quarter?",
      "Will China invade Taiwan?",
      "Will the next iPhone have USB-C?",
      "Will Nvidia stock split in 2024?",
      "Will the next James Bond be announced?",
    ];

    const channels = [
      "CryptoAnalyst",
      "PoliticsNow",
      "SportsCenter",
      "TechInsider",
      "MarketWatch",
      "SpaceExplorer",
      "EconomyPulse",
    ];

    for (let i = 0; i < 18; i++) {
      const randomTimeHours = Math.floor(Math.random() * 23);
      const randomTimeMinutes = Math.floor(Math.random() * 59);
      const randomTimeSeconds = Math.floor(Math.random() * 59);
      const timeRemaining = `${randomTimeHours.toString().padStart(2, "0")}:${randomTimeMinutes.toString().padStart(2, "0")}:${randomTimeSeconds.toString().padStart(2, "0")}`;

      const randomParticipants = Math.floor(Math.random() * 10000) + 100;
      const randomChannel =
        channels[Math.floor(Math.random() * channels.length)];
      const randomTitle = titles[i % titles.length];

      cards.push({
        id: `pred-${i + 1}`,
        title: randomTitle,
        channel: randomChannel,
        channelAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomChannel}`,
        timeRemaining: timeRemaining,
        options: [
          { name: "Yes", odds: `${(Math.random() * 3 + 1).toFixed(1)}x` },
          { name: "No", odds: `${(Math.random() * 3 + 1).toFixed(1)}x` },
        ],
        participants: randomParticipants,
      });
    }

    return cards;
  };

  const predictionCards = generatePredictionCards();

  // Function to handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);
    // In a real app, this would trigger a re-sort of the prediction cards
    // For now, we'll just shuffle them randomly to simulate sorting
    // This is just for visual effect
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // In a real app, this would filter the prediction cards by category
    // For now, we'll just keep showing all cards
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Neue_Machina',_sans-serif]">
      <Navbar />
      {/* Main content */}
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <h1 className="text-3xl font-bold mb-6 text-wanna-green">
          Live Predictions
        </h1>

        {/* Sort and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 w-full">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#1d2535] text-white border-gray-700 rounded-none px-6 py-2 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Sort by: </span>
                <span className="font-bold">{sortOption}</span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#1d2535] border-gray-700 text-white rounded-none">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.name}
                  className="flex items-center hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSortChange(option.name)}
                >
                  {option.icon}
                  {option.name}
                  {option.name === sortOption && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-wanna-green"></div>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Categories List */}
          <div className="w-full md:w-auto">
            <div className="flex flex-wrap gap-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`whitespace-nowrap rounded-none ${selectedCategory === category ? "bg-[#f70f62] text-white" : "bg-transparent text-white border-gray-700 hover:bg-gray-800 hover:text-[#f70f62]"}`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Prediction Cards by Category */}
        {selectedCategory === "All" ? (
          // Show predictions grouped by category
          categories
            .filter((cat) => cat !== "All")
            .map((category) => (
              <div key={category} className="mb-10">
                <h2 className="text-2xl font-bold mb-4 text-wanna-green uppercase">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {predictionCards
                    .filter(
                      (_, index) =>
                        index % categories.length ===
                        categories.indexOf(category) % categories.length,
                    )
                    .slice(0, 3)
                    .map((prediction) => (
                      <PredictionCard
                        key={prediction.id}
                        prediction={prediction}
                      />
                    ))}
                </div>
                <div className="flex justify-center mb-8">
                  <Button className="text-wanna-green hover:text-[#f70f62] font-bold uppercase px-4 py-2 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#F70F62] transition-all duration-200 bg-transparent rounded-none">
                    SHOW MORE &gt;
                  </Button>
                </div>
              </div>
            ))
        ) : (
          // Show filtered predictions for selected category
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictionCards
              .filter(
                (_, index) =>
                  index % categories.length ===
                  categories.indexOf(selectedCategory) % categories.length,
              )
              .map((prediction) => (
                <PredictionCard key={prediction.id} prediction={prediction} />
              ))}
          </div>
        )}

        {/* Show More Button - only show for filtered view */}
        {selectedCategory !== "All" && (
          <div className="flex justify-center mt-8"></div>
        )}
      </main>
    </div>
  );
};

export default PredictionsPage;
