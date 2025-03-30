
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search, FileText, Activity, Calendar, Users, ThumbsUp, ThumbsDown, 
  MessageSquare, ArrowUpRight, ChevronRight, AlertCircle, Tag
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const mockLegislation = [
  {
    id: "HR-2401",
    title: "Clean Energy Innovation Act",
    summary: "A bill to accelerate research and development of renewable energy technologies and provide tax incentives for clean energy adoption.",
    status: "In Committee",
    statusColor: "bg-amber-500",
    introduced: "2024-02-15",
    sponsor: {
      name: "Rep. James Wilson",
      party: "Democratic",
      state: "CA",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    cosponsors: 24,
    supports: 67,
    opposes: 33,
    category: "Energy",
    lastAction: "Referred to Subcommittee on Energy",
    lastActionDate: "2024-03-10",
    voteDate: null
  },
  {
    id: "S-1872",
    title: "Universal Healthcare Coverage Act",
    summary: "Legislation to establish a single-payer healthcare system that provides comprehensive coverage to all citizens.",
    status: "Scheduled for Vote",
    statusColor: "bg-blue-500",
    introduced: "2024-01-23",
    sponsor: {
      name: "Sen. Maria Rodriguez",
      party: "Democratic",
      state: "NY",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    cosponsors: 18,
    supports: 52,
    opposes: 48,
    category: "Healthcare",
    lastAction: "Debate concluded",
    lastActionDate: "2024-03-25",
    voteDate: "2024-04-05"
  },
  {
    id: "HR-3156",
    title: "Small Business Tax Relief Act",
    summary: "A bill to reduce tax burdens on small businesses and provide incentives for hiring and expansion.",
    status: "Passed House",
    statusColor: "bg-green-500",
    introduced: "2024-02-05",
    sponsor: {
      name: "Rep. Thomas Johnson",
      party: "Republican",
      state: "TX",
      image: "https://randomuser.me/api/portraits/men/41.jpg"
    },
    cosponsors: 32,
    supports: 71,
    opposes: 29,
    category: "Economy",
    lastAction: "Sent to Senate",
    lastActionDate: "2024-03-18",
    voteDate: null
  },
  {
    id: "S-2035",
    title: "Digital Privacy Protection Act",
    summary: "Comprehensive legislation to strengthen consumer data privacy protections and establish new regulations for technology companies.",
    status: "In Committee",
    statusColor: "bg-amber-500",
    introduced: "2024-03-01",
    sponsor: {
      name: "Sen. David Chen",
      party: "Democratic",
      state: "WA",
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    cosponsors: 12,
    supports: 64,
    opposes: 36,
    category: "Technology",
    lastAction: "Hearing scheduled",
    lastActionDate: "2024-03-30",
    voteDate: null
  },
  {
    id: "HR-2789",
    title: "Education Funding Reform Act",
    summary: "Bill to restructure how public education is funded to ensure more equitable distribution of resources across districts.",
    status: "Failed Vote",
    statusColor: "bg-red-500",
    introduced: "2024-01-12",
    sponsor: {
      name: "Rep. Sarah Williams",
      party: "Democratic",
      state: "IL",
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    cosponsors: 22,
    supports: 48,
    opposes: 52,
    category: "Education",
    lastAction: "Failed House vote (201-234)",
    lastActionDate: "2024-03-15",
    voteDate: "2024-03-15"
  },
  {
    id: "S-1490",
    title: "Border Security Enhancement Act",
    summary: "Legislation to increase funding for border security measures and reform immigration processing procedures.",
    status: "In Debate",
    statusColor: "bg-purple-500",
    introduced: "2024-02-28",
    sponsor: {
      name: "Sen. Robert Miller",
      party: "Republican",
      state: "AZ",
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    cosponsors: 15,
    supports: 55,
    opposes: 45,
    category: "Immigration",
    lastAction: "Floor debate in progress",
    lastActionDate: "2024-03-28",
    voteDate: null
  }
];

const legislationStatuses = [
  { label: "All", value: "all" },
  { label: "In Committee", value: "in-committee" },
  { label: "In Debate", value: "in-debate" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Passed", value: "passed" },
  { label: "Failed", value: "failed" }
];

const popularCategories = [
  "Healthcare", "Economy", "Immigration", "Energy", 
  "Education", "Technology", "Environment", "Defense"
];

const Legislation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStatus, setCurrentStatus] = useState("all");

  // Filter legislation by search query and status
  const filteredLegislation = mockLegislation.filter(bill => {
    const matchesSearch = 
      bill.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      bill.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = currentStatus === "all" || 
      bill.status.toLowerCase().replace(" ", "-") === currentStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-politics-blue flex items-center">
                <FileText className="mr-2 h-8 w-8" />
                Legislation Tracker
              </h1>
              <p className="text-muted-foreground mt-1">
                Monitor and engage with legislation that matters to you
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-politics-blue hover:bg-politics-blue/90">
                <AlertCircle className="mr-2 h-4 w-4" />
                Set Alert
              </Button>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search legislation..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="mb-6" onValueChange={setCurrentStatus}>
            <TabsList className="flex overflow-x-auto">
              {legislationStatuses.map(status => (
                <TabsTrigger key={status.value} value={status.value}>
                  {status.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <div className="space-y-4">
                {filteredLegislation.map((bill) => (
                  <Card key={bill.id}>
                    <CardHeader className="pb-2">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{bill.id}</Badge>
                            <Badge className={`${bill.statusColor} text-white`}>{bill.status}</Badge>
                          </div>
                          <CardTitle className="mt-2">{bill.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="md:self-start">{bill.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{bill.summary}</p>
                      
                      <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={bill.sponsor.image} alt={bill.sponsor.name} />
                            <AvatarFallback>{bill.sponsor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{bill.sponsor.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {bill.sponsor.party}, {bill.sponsor.state}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Introduced: {formatDate(bill.introduced)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{bill.cosponsors} Co-sponsors</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-b py-3 my-3">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span className="text-muted-foreground">Public Opinion</span>
                          <span className="font-medium">
                            {bill.supports}% Support | {bill.opposes}% Oppose
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-politics-blue" 
                            style={{ width: `${bill.supports}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div>
                          <span className="text-muted-foreground">Last Action: </span>
                          <span>{bill.lastAction} ({formatDate(bill.lastActionDate)})</span>
                        </div>
                        {bill.voteDate && (
                          <div>
                            <span className="text-muted-foreground">Vote Date: </span>
                            <span>{formatDate(bill.voteDate)}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          Support
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <ThumbsDown className="h-3 w-3" />
                          Oppose
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          Comment
                        </Button>
                      </div>
                      <Button variant="default" className="bg-politics-blue hover:bg-politics-blue/90">
                        Track Bill
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredLegislation.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-lg text-muted-foreground">
                      No legislation found matching "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Bills</Button>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Legislative Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Bills Introduced</span>
                      <Badge variant="secondary">428</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>In Committee</span>
                      <Badge variant="secondary">245</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Scheduled for Vote</span>
                      <Badge variant="secondary">42</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Passed This Session</span>
                      <Badge variant="secondary">76</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularCategories.map((category, index) => (
                      <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4 bg-politics-blue text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Your Representative</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-white/90">
                    Share your opinions on pending legislation directly with your elected officials.
                  </p>
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-politics-blue">
                    Find Representatives
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Legislation;
