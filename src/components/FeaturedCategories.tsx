"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface CategoryProps {
  id: string;
  title: string;
  iconUrl: string;
  backgroundColor?: string;
}

interface FeaturedCategoriesProps {
  categories?: CategoryProps[];
}

const FeaturedCategories = ({ categories = [] }: FeaturedCategoriesProps) => {
  // Default categories if none are provided - limited to 5 as per design
  const defaultCategories: CategoryProps[] = [
    {
      id: "games",
      title: "Games",
      iconUrl: "/icons/games-icon.svg",
    },
    {
      id: "irl",
      title: "IRL",
      iconUrl: "/icons/irl-icon.svg",
    },
    {
      id: "music",
      title: "Music & DJs",
      iconUrl: "/icons/music-icon.svg",
    },
    {
      id: "creative",
      title: "Creative",
      iconUrl: "/icons/creative-icon.svg",
    },
    {
      id: "esports",
      title: "Esports",
      iconUrl: "/icons/esports-icon.svg",
    },
  ];

  // Use only the first 5 categories if more are provided
  const displayCategories =
    categories.length > 0 ? categories.slice(0, 5) : defaultCategories;

  return (
    <div className="w-full bg-black">
      <div className="flex justify-between w-full">
        {displayCategories.map((category) => (
          <div key={category.id} className="flex-1">
            <Card className="bg-gray-900 hover:bg-gray-800 transition-all duration-200 h-14 flex items-center justify-between px-4 rounded-none cursor-pointer hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_0px_#00FF85] group border-0 border-none">
              <CardContent className="p-0 flex items-center justify-between w-full">
                <span className="text-white font-bold uppercase group-hover:text-wanna-green transition-colors">
                  {category.title}
                </span>
                <span className="text-xl bg-wanna-green p-1 rounded-none">
                  {category.iconUrl.startsWith("/") ? (
                    <img
                      src={category.iconUrl}
                      alt={category.title}
                      className="w-6 h-6 object-cover"
                      onError={(e) => {
                        // Fallback to emoji if image fails to load
                        const target = e.target as HTMLImageElement;
                        const fallbackEmojis: Record<string, string> = {
                          games: "🎮",
                          irl: "📱",
                          music: "🎧",
                          creative: "🎨",
                          esports: "🏆",
                        };
                        const id = category.id.toLowerCase();
                        target.outerHTML = fallbackEmojis[id] || "🎯";
                      }}
                    />
                  ) : (
                    category.iconUrl
                  )}
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
