
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Topic {
  id: string;
  name: string;
  category: string;
}

interface TopicSelectorProps {
  onTopicsChange?: (topics: string[]) => void;
}

export function TopicSelector({ onTopicsChange }: TopicSelectorProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics: Topic[] = [
    // Domestic Policy
    { id: "healthcare", name: "Healthcare", category: "Domestic Policy" },
    { id: "education", name: "Education", category: "Domestic Policy" },
    { id: "economy", name: "Economy", category: "Domestic Policy" },
    { id: "taxation", name: "Taxation", category: "Domestic Policy" },
    { id: "immigration", name: "Immigration", category: "Domestic Policy" },
    { id: "climate", name: "Climate Change", category: "Domestic Policy" },
    
    // International
    { id: "foreign-policy", name: "Foreign Policy", category: "International" },
    { id: "national-security", name: "National Security", category: "International" },
    { id: "trade", name: "Trade", category: "International" },
    { id: "diplomacy", name: "Diplomacy", category: "International" },
    
    // Social Issues
    { id: "civil-rights", name: "Civil Rights", category: "Social Issues" },
    { id: "gun-policy", name: "Gun Policy", category: "Social Issues" },
    { id: "abortion", name: "Abortion", category: "Social Issues" },
    { id: "lgbtq", name: "LGBTQ+ Rights", category: "Social Issues" },
    
    // Government
    { id: "voting-rights", name: "Voting Rights", category: "Government" },
    { id: "campaign-finance", name: "Campaign Finance", category: "Government" },
    { id: "judiciary", name: "Judiciary", category: "Government" },
    { id: "constitutional-law", name: "Constitutional Law", category: "Government" },
  ];

  const categories = [...new Set(topics.map(topic => topic.category))];

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => {
      const newSelection = prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId];
      
      if (onTopicsChange) {
        onTopicsChange(newSelection);
      }
      
      return newSelection;
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground mb-2">
        Select topics that interest you (selected: {selectedTopics.length})
      </div>
      
      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {topics
              .filter(topic => topic.category === category)
              .map(topic => (
                <button
                  key={topic.id}
                  onClick={() => toggleTopic(topic.id)}
                  className={cn(
                    "flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors",
                    selectedTopics.includes(topic.id)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-transparent hover:bg-muted/50"
                  )}
                >
                  <span>{topic.name}</span>
                  {selectedTopics.includes(topic.id) && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopicSelector;
