
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2, AlertTriangle } from "lucide-react";

interface NewsCardProps {
  title: string;
  source: string;
  timePosted: string;
  excerpt: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export function PoliticalNewsCard({
  title,
  source,
  timePosted,
  excerpt,
  imageUrl,
  likes,
  comments
}: NewsCardProps) {
  return (
    <Card className="overflow-hidden mb-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {imageUrl && (
          <div className="md:w-1/3 h-48 md:h-auto">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={`${imageUrl ? 'md:w-2/3' : 'w-full'}`}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-muted-foreground">{source}</span>
                  <span className="text-sm text-muted-foreground">• {timePosted}</span>
                </div>
                <CardTitle>{title}</CardTitle>
              </div>
              <Button variant="outline" size="icon">
                <AlertTriangle className="h-4 w-4" />
                <span className="sr-only">Fact check</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">{excerpt}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="flex space-x-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex space-x-1">
                <MessageSquare className="h-4 w-4" />
                <span>{comments}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default PoliticalNewsCard;
