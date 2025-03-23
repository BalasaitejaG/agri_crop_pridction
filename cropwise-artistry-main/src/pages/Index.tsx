import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import InputForm from "@/components/InputForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import FarmingBackground from "@/components/FarmingBackground";
import AnimatedTransition from "@/components/AnimatedTransition";
import {
  cropRecommendationService,
  CropInput,
  CropRecommendation,
} from "@/lib/cropRecommendationService";
import { Leaf, Trophy, Server } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>(
    []
  );
  const [usedModel, setUsedModel] = useState<string>("best_overall");

  const handleSubmit = async (input: CropInput & { model?: string }) => {
    setIsLoading(true);

    try {
      // Extract model from input if present
      const { model, ...cropInput } = input;

      // Call the API with the selected model
      const results = await cropRecommendationService.getRecommendations(input);
      setRecommendations(results);
      setUsedModel(model || "best_overall");
      setShowResults(true);

      toast({
        title: "Analysis Complete",
        description: "Your crop recommendations are ready to view!",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "An error occurred",
        description: "We couldn't process your request. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen w-full py-12 md:py-16 px-4 flex flex-col items-center relative">
      <FarmingBackground />

      <motion.div
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-12 text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <Leaf className="w-6 h-6 text-primary" />
            </motion.div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Intelligent Crop Recommendation
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Optimize your yield with AI-powered crop suggestions based on your
            soil composition and local climate
          </p>
          {showResults ? (
            <motion.div
              className="flex items-center justify-center gap-1 text-emerald-500 font-medium mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Server className="w-4 h-4" />
              <span>
                Using{" "}
                {usedModel
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                model
              </span>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center justify-center gap-1 text-amber-500 font-medium mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Trophy className="w-4 h-4" />
              <span>Select from multiple machine learning models</span>
            </motion.div>
          )}
        </motion.div>

        <AnimatedTransition show={!showResults}>
          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
        </AnimatedTransition>

        <AnimatedTransition show={showResults}>
          <ResultsDisplay
            recommendations={recommendations}
            onBack={handleBack}
            modelUsed={usedModel}
          />
        </AnimatedTransition>
      </motion.div>

      <div className="mt-auto pt-12">
        <p className="text-sm text-muted-foreground text-center">
          Crop recommendations are provided as guidance only. Results may vary
          based on actual field conditions.
        </p>
      </div>
    </div>
  );
};

export default Index;
