
import React from "react";
import { motion } from "framer-motion";
import { ModelInfo } from "@/lib/cropRecommendationService";
import { Medal } from "lucide-react";

interface ModelInfoCardProps {
  modelInfo: ModelInfo[];
}

const ModelInfoCard: React.FC<ModelInfoCardProps> = ({ modelInfo }) => {
  return (
    <motion.div
      className="glassmorphism rounded-xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <div className="p-4 border-b border-border/30">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Medal className="w-5 h-5 text-yellow-500" />
          AI Model Information
        </h3>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-4">
          This recommendation system uses a Naive Bayes model with 99.55% accuracy on test data.
        </div>
        
        <div className="space-y-3">
          {modelInfo.map((model, index) => (
            <div key={model.name} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{model.name}</span>
                <span className="text-sm font-semibold text-primary">{model.accuracy}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-1">
                <div 
                  className="h-2 rounded-full bg-primary/70"
                  style={{ width: model.accuracy }}
                />
              </div>
              <span className="text-xs text-muted-foreground">
                {model.parameters}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ModelInfoCard;
