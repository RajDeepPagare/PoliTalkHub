
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useState } from "react";

export function PoliticalSpectrum() {
  const [economicValue, setEconomicValue] = useState([50]);
  const [socialValue, setSocialValue] = useState([50]);

  const getEconomicLabel = (value: number) => {
    if (value < 25) return "Economic Left";
    if (value < 50) return "Center-Left";
    if (value < 75) return "Center-Right";
    return "Economic Right";
  };

  const getSocialLabel = (value: number) => {
    if (value < 25) return "Progressive";
    if (value < 50) return "Moderately Progressive";
    if (value < 75) return "Moderately Traditional";
    return "Traditional";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Political Compass</CardTitle>
        <CardDescription>
          Define your political position on key dimensions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Economic Left</span>
            <span className="font-medium">{getEconomicLabel(economicValue[0])}</span>
            <span>Economic Right</span>
          </div>
          <Slider
            value={economicValue}
            onValueChange={setEconomicValue}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Progressive</span>
            <span className="font-medium">{getSocialLabel(socialValue[0])}</span>
            <span>Traditional</span>
          </div>
          <Slider
            value={socialValue}
            onValueChange={setSocialValue}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>

        <div className="mt-6 border rounded-md p-4 bg-muted/50">
          <h4 className="font-medium mb-2">Your Political Profile</h4>
          <p className="text-sm text-muted-foreground">
            Based on your selections, you align with {getEconomicLabel(economicValue[0])} economic policies
            and {getSocialLabel(socialValue[0])} social values.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PoliticalSpectrum;
