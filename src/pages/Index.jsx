import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const fetchStories = async () => {
  // Simulate an API call
  const response = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          Array.from({ length: 100 }, (_, i) => ({
            id: i + 1,
            name: `Story ${i + 1}`,
            upvotes: Math.floor(Math.random() * 1000),
            link: "#",
          }))
        ),
      2000
    )
  );
  return response;
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
  });

  const filteredStories = stories?.filter((story) =>
    story.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Input
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredStories?.map((story) => (
            <Card key={story.id}>
              <CardHeader>
                <CardTitle>{story.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Upvotes: {story.upvotes}</p>
                <a href={story.link} className="text-blue-500">
                  Read more
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;