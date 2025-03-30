
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DiscussionForumCard } from "@/components/DiscussionForumCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Users, TrendingUp, MessageCircle, Plus, List } from "lucide-react";

const popularTopics = [
  "Healthcare Reform", "Election Integrity", "Climate Policy", "Immigration", 
  "Education", "National Security", "Tax Policy", "Civil Rights"
];

const mockDiscussions = [
  {
    title: "Healthcare Reform Debate",
    description: "Discussing proposals for healthcare system improvements and challenges in implementation.",
    topics: ["Healthcare", "Policy", "Reform"],
    participantsCount: 1204,
    lastActivity: "10 minutes ago",
    commentsCount: 4587
  },
  {
    title: "Election Integrity and Voting Rights",
    description: "Exploring the balance between secure elections and ensuring all eligible voters can participate.",
    topics: ["Elections", "Voting", "Democracy"],
    participantsCount: 985,
    lastActivity: "32 minutes ago",
    commentsCount: 3265
  },
  {
    title: "Climate Policy Strategies",
    description: "Analyzing various approaches to addressing climate change, from regulations to market-based solutions.",
    topics: ["Climate", "Environment", "Policy"],
    participantsCount: 723,
    lastActivity: "1 hour ago",
    commentsCount: 2190
  },
  {
    title: "Immigration Reform Proposals",
    description: "Debating different approaches to immigration policy, border security, and pathways to citizenship.",
    topics: ["Immigration", "Border", "Policy"],
    participantsCount: 892,
    lastActivity: "2 hours ago",
    commentsCount: 3120
  },
  {
    title: "Education Funding and Reform",
    description: "Discussing how to improve education systems, from K-12 to higher education funding and accessibility.",
    topics: ["Education", "Reform", "Funding"],
    participantsCount: 651,
    lastActivity: "3 hours ago",
    commentsCount: 1876
  },
  {
    title: "Tax Policy and Economic Impact",
    description: "Analyzing different tax proposals and their potential effects on various economic sectors and demographics.",
    topics: ["Taxes", "Economy", "Policy"],
    participantsCount: 583,
    lastActivity: "5 hours ago",
    commentsCount: 1542
  },
  {
    title: "Free Speech in the Digital Age",
    description: "Exploring the boundaries of free speech online and the role of government and tech companies in regulation.",
    topics: ["Free Speech", "Social Media", "Regulation"],
    participantsCount: 741,
    lastActivity: "6 hours ago",
    commentsCount: 2356
  },
  {
    title: "National Security Priorities",
    description: "Discussing defense spending, international relations, and emerging security threats.",
    topics: ["Security", "Defense", "International"],
    participantsCount: 512,
    lastActivity: "8 hours ago",
    commentsCount: 1423
  }
];

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("popular");

  // Filter discussions by search query
  const filteredDiscussions = mockDiscussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    discussion.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-politics-blue flex items-center">
                <MessageCircle className="mr-2 h-8 w-8" />
                Discussion Forums
              </h1>
              <p className="text-muted-foreground mt-1">
                Join conversations about important political topics
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-politics-blue hover:bg-politics-blue/90">
                <Plus className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search forums..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <Tabs defaultValue="popular" className="mb-6" onValueChange={setCurrentTab}>
                <TabsList>
                  <TabsTrigger value="popular" className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Popular
                  </TabsTrigger>
                  <TabsTrigger value="recent" className="flex items-center">
                    <List className="mr-2 h-4 w-4" />
                    Recent
                  </TabsTrigger>
                  <TabsTrigger value="my-discussions" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    My Discussions
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="grid md:grid-cols-2 gap-6">
                {filteredDiscussions.map((discussion, index) => (
                  <DiscussionForumCard key={index} {...discussion} />
                ))}
                
                {filteredDiscussions.length === 0 && (
                  <div className="col-span-2 text-center py-10">
                    <p className="text-lg text-muted-foreground">No discussions found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Discussions</Button>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTopics.map((topic, index) => (
                    <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
                <h3 className="font-semibold mb-3">Active Users</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Online Now</span>
                    <Badge variant="secondary">1,245</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Discussions Today</span>
                    <Badge variant="secondary">126</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>New Members</span>
                    <Badge variant="secondary">45</Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-politics-blue text-white p-4 rounded-lg mt-4">
                <h3 className="font-semibold mb-2">Moderation Guidelines</h3>
                <p className="text-sm text-white/90 mb-3">
                  Please remember to keep discussions civil and factual. Personal attacks or misinformation will not be tolerated.
                </p>
                <Button variant="outline" size="sm" className="w-full text-white border-white hover:bg-white hover:text-politics-blue">
                  Read Full Guidelines
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Forums;
