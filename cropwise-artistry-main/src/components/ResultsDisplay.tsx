import React from "react";
import { motion } from "framer-motion";
import { CropRecommendation, modelInfo } from "@/lib/cropRecommendationService";
import CropCard from "./CropCard";
import ModelInfoCard from "./ModelInfoCard";
import { ArrowLeft, Download, Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  recommendations: CropRecommendation[];
  onBack: () => void;
  modelUsed?: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  recommendations,
  onBack,
  modelUsed = "best_overall",
}) => {
  return (
    <div className="max-w-4xl w-full mx-auto px-4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <motion.button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ x: -3 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to input</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight">
              Your Crop Recommendations
            </h2>
            <p className="text-muted-foreground">
              Based on your soil conditions and local climate
            </p>
          </motion.div>
        </div>

        <motion.button
          className="flex items-center gap-1.5 px-4 py-2 bg-muted/50 backdrop-blur-sm hover:bg-muted rounded-lg text-sm font-medium transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Download className="w-4 h-4" />
          <span>Save results</span>
        </motion.button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={onBack}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>

        <div className="flex items-center text-sm text-muted-foreground gap-1">
          <Server className="w-4 h-4" />
          <span>
            Model:{" "}
            {modelUsed
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {recommendations.map((recommendation, index) => (
          <CropCard
            key={recommendation.cropName}
            recommendation={recommendation}
            index={index}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <motion.div
            className="glassmorphism rounded-xl p-6 h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-medium mb-3">Next Steps</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
                  1
                </span>
                <span>
                  Consider soil testing to verify the NPK levels for more
                  accurate recommendations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
                  2
                </span>
                <span>
                  Check with local agricultural extension services about
                  seasonal planting guidelines.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
                  3
                </span>
                <span>
                  Review market demand and prices for these crops in your region
                  before planting.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="md:col-span-1">
          <ModelInfoCard modelInfo={modelInfo} />
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
