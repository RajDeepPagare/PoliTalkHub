
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Calendar, MapPin, DollarSign, ArrowUpRight, AlertCircle, CheckCircle } from "lucide-react";

const mockCampaigns = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description: "Supporting legislation to improve water quality standards and infrastructure in urban areas.",
    organizer: "Environmental Action Committee",
    location: "National",
    supporters: 12458,
    raised: 45750,
    goal: 75000,
    endDate: "2024-05-15",
    category: "Environment",
    verified: true
  },
  {
    id: 2,
    title: "Voters Rights Coalition",
    description: "Advocating for expanded voting access and fighting against voter suppression policies.",
    organizer: "Democracy Alliance",
    location: "Multiple States",
    supporters: 8935,
    raised: 32400,
    goal: 50000,
    endDate: "2024-06-30",
    category: "Voting Rights",
    verified: true
  },
  {
    id: 3,
    title: "Healthcare for All Campaign",
    description: "Promoting universal healthcare coverage and affordable prescription medication policies.",
    organizer: "Health Justice Now",
    location: "National",
    supporters: 15230,
    raised: 67800,
    goal: 100000,
    endDate: "2024-07-22",
    category: "Healthcare",
    verified: true
  },
  {
    id: 4,
    title: "Education Equity Movement",
    description: "Working to ensure equal funding and opportunities across all school districts.",
    organizer: "Future Leaders Foundation",
    location: "State-level",
    supporters: 7425,
    raised: 28900,
    goal: 60000,
    endDate: "2024-08-10",
    category: "Education",
    verified: false
  },
  {
    id: 5,
    title: "Renewable Energy Transition",
    description: "Supporting policies that accelerate the transition to renewable energy sources.",
    organizer: "Climate Action Network",
    location: "National",
    supporters: 9780,
    raised: 41200,
    goal: 80000,
    endDate: "2024-09-05",
    category: "Climate",
    verified: true
  },
  {
    id: 6,
    title: "Criminal Justice Reform",
    description: "Advocating for sentencing reform, rehabilitation programs, and reducing mass incarceration.",
    organizer: "Justice Reform Coalition",
    location: "Multiple States",
    supporters: 11320,
    raised: 38500,
    goal: 70000,
    endDate: "2024-10-15",
    category: "Justice",
    verified: true
  }
];

const popularCategories = [
  "Environment", "Voting Rights", "Healthcare", "Education", 
  "Climate", "Justice", "Economy", "Immigration"
];

const Campaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("active");

  // Filter campaigns by search query
  const filteredCampaigns = mockCampaigns.filter(campaign => 
    campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate days remaining for a campaign
  const getDaysRemaining = (endDateStr: string) => {
    const endDate = new Date(endDateStr);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-politics-blue flex items-center">
                <Users className="mr-2 h-8 w-8" />
                Political Campaigns & Initiatives
              </h1>
              <p className="text-muted-foreground mt-1">
                Support, organize, and participate in campaigns for political change
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button className="bg-politics-blue hover:bg-politics-blue/90">
                Start a Campaign
              </Button>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search campaigns..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="active" className="mb-6" onValueChange={setCurrentTab}>
            <TabsList>
              <TabsTrigger value="active">Active Campaigns</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="my-campaigns">My Campaigns</TabsTrigger>
              <TabsTrigger value="local">Local Initiatives</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/4">
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center">
                            {campaign.title}
                            {campaign.verified && (
                              <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                            )}
                          </CardTitle>
                          <CardDescription>{campaign.organizer}</CardDescription>
                        </div>
                        <Badge>{campaign.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{campaign.description}</p>
                      
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="text-muted-foreground">Fundraising Goal</span>
                        <span className="font-medium">
                          {formatCurrency(campaign.raised)} of {formatCurrency(campaign.goal)}
                        </span>
                      </div>
                      <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2 mb-4" />
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{campaign.location}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{campaign.supporters.toLocaleString()} supporters</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{getDaysRemaining(campaign.endDate)} days left</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>Tax deductible</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button className="bg-politics-blue hover:bg-politics-blue/90">
                        Support Campaign
                      </Button>
                      <Button variant="outline">
                        Learn More
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                {filteredCampaigns.length === 0 && (
                  <div className="col-span-2 text-center py-10">
                    <p className="text-lg text-muted-foreground">
                      No campaigns found matching "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-8">
                <Button variant="outline">Load More Campaigns</Button>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Categories</CardTitle>
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
              
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-lg">Verification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Verified Campaign</p>
                        <p className="text-muted-foreground">
                          Campaign has been verified by our team and meets transparency standards.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Unverified Campaign</p>
                        <p className="text-muted-foreground">
                          Campaign is still undergoing verification or doesn't meet all standards.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4 bg-politics-blue text-white">
                <CardHeader>
                  <CardTitle className="text-lg">Start Your Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-white/90">
                    Create your own political initiative and rally supporters around your cause.
                  </p>
                  <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-politics-blue">
                    Get Started
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

export default Campaigns;
