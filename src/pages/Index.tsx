
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PoliticalNewsCard } from "@/components/PoliticalNewsCard";
import { DiscussionForumCard } from "@/components/DiscussionForumCard";
import { PoliticalSpectrum } from "@/components/PoliticalSpectrum";
import { TopicSelector } from "@/components/TopicSelector";
import { ChevronRight, Search, Newspaper, Users, BarChart4, LandPlot } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredNews = [
    {
      title: "Senate Passes Comprehensive Climate Bill with Bipartisan Support",
      source: "Capitol News",
      timePosted: "2 hours ago",
      excerpt: "In a historic vote, the Senate approved a landmark climate bill that aims to reduce carbon emissions by 50% before 2030 through a combination of regulations and incentives.",
      imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
      likes: 824,
      comments: 342
    },
    {
      title: "Supreme Court to Hear Arguments on Voting Rights Case Next Month",
      source: "Justice Daily",
      timePosted: "5 hours ago",
      excerpt: "The Supreme Court has scheduled arguments for a pivotal voting rights case that could significantly impact how states administer elections and draw district boundaries.",
      imageUrl: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=800&q=80",
      likes: 612,
      comments: 197
    }
  ];

  const popularDiscussions = [
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
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-politics-blue text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Democracy thrives on informed conversation
            </h1>
            <p className="text-xl mb-8">
              Join a community where diverse viewpoints meet for respectful, fact-based political discussions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-politics-blue hover:bg-gray-100">
                Join The Community
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Topics
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why join CivicChatters?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="politics-card flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Newspaper className="h-6 w-6 text-politics-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified News</h3>
              <p className="text-muted-foreground">
                Access fact-checked news from diverse sources to stay informed on the issues that matter.
              </p>
            </div>
            
            <div className="politics-card flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Users className="h-6 w-6 text-politics-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meaningful Discussions</h3>
              <p className="text-muted-foreground">
                Engage in civil discourse with people across the political spectrum in moderated forums.
              </p>
            </div>
            
            <div className="politics-card flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <BarChart4 className="h-6 w-6 text-politics-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Issue Tracking</h3>
              <p className="text-muted-foreground">
                Follow legislation and policy developments with easy-to-understand summaries and analysis.
              </p>
            </div>
            
            <div className="politics-card flex flex-col items-center text-center p-6">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <LandPlot className="h-6 w-6 text-politics-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Civic Engagement</h3>
              <p className="text-muted-foreground">
                Find opportunities to participate in campaigns, local initiatives, and democratic processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Tabs Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Explore Content</h2>
          
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="news">Top News</TabsTrigger>
              <TabsTrigger value="discussions">Active Discussions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="news" className="space-y-4">
              {featuredNews.map((news, index) => (
                <PoliticalNewsCard key={index} {...news} />
              ))}
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <Link to="/news" className="flex items-center">
                    View All News
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularDiscussions.map((discussion, index) => (
                  <DiscussionForumCard key={index} {...discussion} />
                ))}
              </div>
              <div className="text-center mt-6">
                <Button variant="outline" asChild>
                  <Link to="/forums" className="flex items-center">
                    Browse All Forums
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Interest Selector Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">What political topics interest you?</h2>
              <p className="text-lg text-muted-foreground">
                Customize your experience by selecting the topics you care about most
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <TopicSelector />
                <div className="mt-6">
                  <Button className="w-full">Save Preferences</Button>
                </div>
              </div>
              
              <div>
                <PoliticalSpectrum />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-politics-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to join the conversation?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your profile today and start engaging with a community of politically-minded citizens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-politics-blue hover:bg-gray-100">
              Create Account
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
