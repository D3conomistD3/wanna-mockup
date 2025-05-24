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

interface NavbarProps {
  activePage?: "home" | "predictions" | "following" | "none";
}

export default function Navbar({ activePage = "none" }: NavbarProps) {
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
            className={`px-3 py-2 ${activePage === "predictions" ? "bg-gray-800 text-[#f70f62]" : "hover:text-[#f70f62]"}`}
          >
            Predictions
          </Link>

          {/* Following Button */}
          <Link
            href="/following"
            className={`px-3 py-2 ${activePage === "following" ? "bg-gray-800 text-[#f70f62]" : "hover:text-[#f70f62]"}`}
          >
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
}
