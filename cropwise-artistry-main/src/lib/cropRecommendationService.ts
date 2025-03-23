export interface CropInput {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
}

export interface CropRecommendation {
  cropName: string;
  confidence: number;
  imageUrl: string;
  description: string;
}

export interface ModelInfo {
  name: string;
  accuracy: string;
  parameters: string;
}

// Model information based on training results
export const modelInfo: ModelInfo[] = [
  {
    name: "Naive Bayes",
    accuracy: "99.55%",
    parameters: "Default parameters"
  },
  {
    name: "Random Forest",
    accuracy: "99.55%",
    parameters: "n_estimators: 200"
  },
  {
    name: "XGBoost",
    accuracy: "98.86%",
    parameters: "learning_rate: 0.1, n_estimators: 100"
  },
  {
    name: "Support Vector Machine",
    accuracy: "98.86%",
    parameters: "C: 10, kernel: linear"
  },
  {
    name: "Logistic Regression",
    accuracy: "97.73%",
    parameters: "C: 10"
  }
];

// API base URL - update this to match your backend deployment
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// This service now makes actual API calls to the backend
export const cropRecommendationService = {
  // Get crop recommendations from the backend API
  getRecommendations: async (input: CropInput & { model?: string }): Promise<CropRecommendation[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/recommend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API error:', errorData);
        throw new Error(errorData.error || 'API request failed');
      }
      
      const data = await response.json();
      return data.recommendations;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      
      // Fallback to mock data if API is not available
      console.warn('Falling back to mock recommendations');
      return getMockRecommendations(input);
    }
  },
  
  // Get available model names from the backend
  getAvailableModels: async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/models`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch available models');
      }
      
      const data = await response.json();
      return data.models;
    } catch (error) {
      console.error('Error fetching available models:', error);
      return [];
    }
  },
  
  // Get information about the models
  getModelInfo: (): ModelInfo[] => {
    return modelInfo;
  },
  
  // Check if the API is available
  checkApiHealth: async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('API health check failed:', error);
      return false;
    }
  }
};

// This function generates mock recommendations based on input values
// Used as a fallback if the API is not available
function getMockRecommendations(input: CropInput): CropRecommendation[] {
  const crops = [
    {
      cropName: "Rice",
      imageUrl: "https://images.unsplash.com/photo-1536054970905-11854aa9c766?q=80&w=1000&auto=format&fit=crop",
      description: "Rice thrives in warm, humid conditions with nitrogen-rich soil. It's perfect for waterlogged areas."
    },
    {
      cropName: "Wheat",
      imageUrl: "https://images.unsplash.com/photo-1535911062114-764574491173?q=80&w=1000&auto=format&fit=crop",
      description: "Wheat prefers moderate temperatures and well-drained soil with balanced nutrients."
    },
    {
      cropName: "Maize",
      imageUrl: "https://images.unsplash.com/photo-1551463944-6bc9a57e75b7?q=80&w=1000&auto=format&fit=crop",
      description: "Maize needs warm soil, consistent moisture, and high nitrogen levels to produce optimal yields."
    },
    {
      cropName: "Cotton",
      imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=1000&auto=format&fit=crop",
      description: "Cotton grows best in warm climates with well-drained soil and moderate potassium levels."
    },
    {
      cropName: "Sugarcane",
      imageUrl: "https://images.unsplash.com/photo-1634467524884-897d0af5e104?q=80&w=1000&auto=format&fit=crop",
      description: "Sugarcane thrives in tropical conditions with high rainfall and potassium-rich soil."
    },
    {
      cropName: "Soybeans",
      imageUrl: "https://images.unsplash.com/photo-1599420519638-8e7ffb8b2b55?q=80&w=1000&auto=format&fit=crop",
      description: "Soybeans prefer warm temperatures and soil with balanced NPK nutrients."
    },
    {
      cropName: "Tomatoes",
      imageUrl: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=1000&auto=format&fit=crop",
      description: "Tomatoes grow best with high phosphorus levels, moderate nitrogen, and warm temperatures."
    }
  ];

  // This is a simple algorithm to determine which crops might be suitable
  // Only used as a fallback when the API is unavailable
  const scores = crops.map(crop => {
    let score = 0;
    const { nitrogen, phosphorus, potassium, temperature, humidity } = input;
    
    // Different scoring logic for each crop (simplified)
    if (crop.cropName === "Rice") {
      score = 0.5 * nitrogen + 0.2 * phosphorus + 0.1 * potassium + 0.5 * humidity - Math.abs(temperature - 30) * 0.3;
    } else if (crop.cropName === "Wheat") {
      score = 0.3 * nitrogen + 0.3 * phosphorus + 0.3 * potassium - Math.abs(temperature - 25) * 0.5 - Math.abs(humidity - 60) * 0.2;
    } else if (crop.cropName === "Maize") {
      score = 0.4 * nitrogen + 0.3 * phosphorus + 0.1 * potassium - Math.abs(temperature - 28) * 0.4 - Math.abs(humidity - 50) * 0.2;
    } else if (crop.cropName === "Cotton") {
      score = 0.2 * nitrogen + 0.2 * phosphorus + 0.4 * potassium - Math.abs(temperature - 32) * 0.3 - Math.abs(humidity - 40) * 0.3;
    } else if (crop.cropName === "Sugarcane") {
      score = 0.3 * nitrogen + 0.2 * phosphorus + 0.5 * potassium - Math.abs(temperature - 30) * 0.2 + 0.4 * humidity;
    } else if (crop.cropName === "Soybeans") {
      score = 0.3 * nitrogen + 0.3 * phosphorus + 0.3 * potassium - Math.abs(temperature - 27) * 0.3 - Math.abs(humidity - 60) * 0.2;
    } else if (crop.cropName === "Tomatoes") {
      score = 0.2 * nitrogen + 0.5 * phosphorus + 0.2 * potassium - Math.abs(temperature - 26) * 0.3 - Math.abs(humidity - 65) * 0.2;
    }
    
    // Normalize scores
    return {
      ...crop,
      confidence: Math.min(0.95, Math.max(0.4, score / 100 + 0.5 + Math.random() * 0.1))
    };
  });
  
  // Sort by score and take top 3
  return scores
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
}
