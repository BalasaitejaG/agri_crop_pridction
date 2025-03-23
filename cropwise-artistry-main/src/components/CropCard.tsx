
import React from "react";
import { motion } from "framer-motion";
import { CropRecommendation } from "@/lib/cropRecommendationService";

interface CropCardProps {
  recommendation: CropRecommendation;
  index: number;
}

const CropCard: React.FC<CropCardProps> = ({ recommendation, index }) => {
  const { cropName, confidence, imageUrl, description } = recommendation;
  
  const confidencePercentage = Math.round(confidence * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="glassmorphism rounded-xl overflow-hidden shadow-xl flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {index === 0 && (
          <div className="absolute top-3 right-3 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full">
            Best Match
          </div>
        )}
        
        <div className="absolute bottom-0 w-full p-4">
          <h3 className="text-white text-xl font-semibold tracking-tight">
            {cropName}
          </h3>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <p className="text-sm text-foreground/80 mb-4">{description}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium">Confidence</span>
            <span className="text-xs font-semibold">{confidencePercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${confidencePercentage}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CropCard;
