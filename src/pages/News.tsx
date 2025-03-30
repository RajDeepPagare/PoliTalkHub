
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PoliticalNewsCard } from "@/components/PoliticalNewsCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Newspaper } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface NewsItem {
  title: string;
  source: {
    name: string;
  };
  publishedAt: string;
  description: string;
  urlToImage: string;
}

const fetchNewsArticles = async (topic: string = "politics") => {
  // Using NewsAPI's sample response for development to avoid API key requirements
  const mockNewsData = [
    {
      title: "Senate Passes Comprehensive Climate Bill with Bipartisan Support",
      source: { name: "Capitol News" },
      publishedAt: "2024-03-30T12:30:00Z",
      description: "In a historic vote, the Senate approved a landmark climate bill that aims to reduce carbon emissions by 50% before 2030 through a combination of regulations and incentives.",
      urlToImage: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Supreme Court to Hear Arguments on Voting Rights Case Next Month",
      source: { name: "Justice Daily" },
      publishedAt: "2024-03-30T09:15:00Z",
      description: "The Supreme Court has scheduled arguments for a pivotal voting rights case that could significantly impact how states administer elections and draw district boundaries.",
      urlToImage: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "President Announces New Infrastructure Plan Focused on Green Energy",
      source: { name: "White House Brief" },
      publishedAt: "2024-03-29T16:45:00Z",
      description: "The administration unveiled a sweeping $2 trillion infrastructure proposal that includes significant investments in renewable energy, electric vehicles, and sustainable transportation.",
      urlToImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Global Climate Summit Concludes with New Commitments from Major Nations",
      source: { name: "International Affairs" },
      publishedAt: "2024-03-29T14:20:00Z",
      description: "Leaders from over 190 countries concluded a week-long climate summit with new pledges to reduce emissions and increase funding for climate adaptation in developing nations.",
      urlToImage: "https://images.unsplash.com/photo-1623018035782-b269248df916?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "State Legislature Passes Controversial Voting Reform Package",
      source: { name: "State Insider" },
      publishedAt: "2024-03-28T19:10:00Z",
      description: "After heated debate, lawmakers approved a comprehensive voting reform bill that changes early voting periods, identification requirements, and mail-in ballot procedures.",
      urlToImage: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Tech Companies Face New Regulations on Political Advertising",
      source: { name: "Tech Policy Today" },
      publishedAt: "2024-03-28T11:30:00Z",
      description: "Regulatory agencies announced new guidelines for digital political advertising, requiring greater transparency on ad funding and targeting methods used by major platforms.",
      urlToImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    }
  ];

  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockNewsData;
};

const News = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState("all");

  const { data: newsArticles, isLoading, error } = useQuery({
    queryKey: ['newsArticles', currentCategory],
    queryFn: () => fetchNewsArticles(currentCategory !== 'all' ? currentCategory : 'politics'),
  });

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Return time ago format (e.g., "2 hours ago")
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  // Filter news by search query
  const filteredNews = newsArticles?.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-politics-blue flex items-center">
              <Newspaper className="mr-2 h-8 w-8" />
              Political News Feed
            </h1>
            <div className="relative w-full max-w-md ml-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search news articles..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-8" onValueChange={setCurrentCategory}>
            <TabsList className="grid grid-cols-5 md:w-[600px]">
              <TabsTrigger value="all">All News</TabsTrigger>
              <TabsTrigger value="domestic">Domestic</TabsTrigger>
              <TabsTrigger value="international">International</TabsTrigger>
              <TabsTrigger value="economy">Economy</TabsTrigger>
              <TabsTrigger value="environment">Environment</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center mb-6">
            <div>
              <Button variant="outline" size="sm" className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <Separator orientation="vertical" className="h-6 mx-4" />
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredNews.length}</span> news articles
            </p>
          </div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 text-lg">Failed to load news articles</p>
              <Button onClick={() => window.location.reload()} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((article, index) => (
                <PoliticalNewsCard
                  key={index}
                  title={article.title}
                  source={article.source.name}
                  timePosted={formatDate(article.publishedAt)}
                  excerpt={article.description}
                  imageUrl={article.urlToImage}
                  likes={Math.floor(Math.random() * 1000)}
                  comments={Math.floor(Math.random() * 400)}
                />
              ))}
              
              {filteredNews.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-lg text-muted-foreground">No news articles found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-center mt-8">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default News;
