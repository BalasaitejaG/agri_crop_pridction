import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import {
  cropRecommendationService,
  CropInput,
} from "@/lib/cropRecommendationService";

// Default input ranges
const INPUT_RANGES = {
  nitrogen: { min: 0, max: 140, step: 1 },
  phosphorus: { min: 0, max: 140, step: 1 },
  potassium: { min: 0, max: 200, step: 1 },
  temperature: { min: 8, max: 45, step: 0.1 },
  humidity: { min: 0, max: 100, step: 1 },
};

interface InputFormProps {
  onSubmit: (input: CropInput & { model?: string }) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState<CropInput & { model?: string }>({
    nitrogen: 90,
    phosphorus: 42,
    potassium: 43,
    temperature: 20.87,
    humidity: 82,
    model: "best_overall",
  });

  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [apiAvailable, setApiAvailable] = useState<boolean>(false);

  useEffect(() => {
    const checkApiAndLoadModels = async () => {
      const isApiAvailable = await cropRecommendationService.checkApiHealth();
      setApiAvailable(isApiAvailable);

      if (isApiAvailable) {
        const models = await cropRecommendationService.getAvailableModels();
        if (models.length > 0) {
          setAvailableModels(models);
          // Set default model to best_overall if available, otherwise use the first model
          setInput((prev) => ({
            ...prev,
            model: models.includes("best_overall") ? "best_overall" : models[0],
          }));
        }
      }
    };

    checkApiAndLoadModels();
  }, []);

  const handleInputChange = (key: keyof CropInput, value: number) => {
    // Ensure value is within allowed range
    const range = INPUT_RANGES[key];
    const clampedValue = Math.min(Math.max(value, range.min), range.max);
    setInput((prev) => ({ ...prev, [key]: clampedValue }));
  };

  const handleManualInputChange = (key: keyof CropInput, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      handleInputChange(key, numValue);
    }
  };

  const handleModelChange = (value: string) => {
    setInput((prev) => ({ ...prev, model: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Soil Composition</h2>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        id="nitrogen-input"
                        min={INPUT_RANGES.nitrogen.min}
                        max={INPUT_RANGES.nitrogen.max}
                        step={INPUT_RANGES.nitrogen.step}
                        value={input.nitrogen}
                        onChange={(e) =>
                          handleManualInputChange("nitrogen", e.target.value)
                        }
                        className="w-20 h-8 text-right"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        mg/kg
                      </span>
                    </div>
                  </div>
                  <Slider
                    id="nitrogen"
                    min={INPUT_RANGES.nitrogen.min}
                    max={INPUT_RANGES.nitrogen.max}
                    step={INPUT_RANGES.nitrogen.step}
                    value={[input.nitrogen]}
                    onValueChange={(values) =>
                      handleInputChange("nitrogen", values[0])
                    }
                    className="my-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        id="phosphorus-input"
                        min={INPUT_RANGES.phosphorus.min}
                        max={INPUT_RANGES.phosphorus.max}
                        step={INPUT_RANGES.phosphorus.step}
                        value={input.phosphorus}
                        onChange={(e) =>
                          handleManualInputChange("phosphorus", e.target.value)
                        }
                        className="w-20 h-8 text-right"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        mg/kg
                      </span>
                    </div>
                  </div>
                  <Slider
                    id="phosphorus"
                    min={INPUT_RANGES.phosphorus.min}
                    max={INPUT_RANGES.phosphorus.max}
                    step={INPUT_RANGES.phosphorus.step}
                    value={[input.phosphorus]}
                    onValueChange={(values) =>
                      handleInputChange("phosphorus", values[0])
                    }
                    className="my-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="potassium">Potassium (K)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        id="potassium-input"
                        min={INPUT_RANGES.potassium.min}
                        max={INPUT_RANGES.potassium.max}
                        step={INPUT_RANGES.potassium.step}
                        value={input.potassium}
                        onChange={(e) =>
                          handleManualInputChange("potassium", e.target.value)
                        }
                        className="w-20 h-8 text-right"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        mg/kg
                      </span>
                    </div>
                  </div>
                  <Slider
                    id="potassium"
                    min={INPUT_RANGES.potassium.min}
                    max={INPUT_RANGES.potassium.max}
                    step={INPUT_RANGES.potassium.step}
                    value={[input.potassium]}
                    onValueChange={(values) =>
                      handleInputChange("potassium", values[0])
                    }
                    className="my-2"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Climate Conditions</h2>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="temperature">Temperature</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        id="temperature-input"
                        min={INPUT_RANGES.temperature.min}
                        max={INPUT_RANGES.temperature.max}
                        step={INPUT_RANGES.temperature.step}
                        value={input.temperature.toFixed(1)}
                        onChange={(e) =>
                          handleManualInputChange("temperature", e.target.value)
                        }
                        className="w-20 h-8 text-right"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        °C
                      </span>
                    </div>
                  </div>
                  <Slider
                    id="temperature"
                    min={INPUT_RANGES.temperature.min}
                    max={INPUT_RANGES.temperature.max}
                    step={INPUT_RANGES.temperature.step}
                    value={[input.temperature]}
                    onValueChange={(values) =>
                      handleInputChange("temperature", values[0])
                    }
                    className="my-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="humidity">Humidity</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        id="humidity-input"
                        min={INPUT_RANGES.humidity.min}
                        max={INPUT_RANGES.humidity.max}
                        step={INPUT_RANGES.humidity.step}
                        value={input.humidity}
                        onChange={(e) =>
                          handleManualInputChange("humidity", e.target.value)
                        }
                        className="w-20 h-8 text-right"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        %
                      </span>
                    </div>
                  </div>
                  <Slider
                    id="humidity"
                    min={INPUT_RANGES.humidity.min}
                    max={INPUT_RANGES.humidity.max}
                    step={INPUT_RANGES.humidity.step}
                    value={[input.humidity]}
                    onValueChange={(values) =>
                      handleInputChange("humidity", values[0])
                    }
                    className="my-2"
                  />
                </div>
              </div>
            </div>

            {apiAvailable && availableModels.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Model Selection</h2>
                <div>
                  <Label htmlFor="model-select">Select AI Model</Label>
                  <Select value={input.model} onValueChange={handleModelChange}>
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model
                            .split("_")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Different models may provide varying recommendations based
                    on their training.
                  </p>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Get Crop Recommendations"
              )}
            </Button>
          </div>
        </Card>
      </form>
    </motion.div>
  );
};

export default InputForm;
