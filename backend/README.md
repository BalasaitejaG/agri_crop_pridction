# Crop Recommendation Backend API

This backend API serves the trained crop recommendation models to the frontend application.

## Setup and Installation

1. Install the required Python packages:

```bash
pip install -r requirements.txt
```

2. Make sure your model weights are in the `../model_weights` directory.

## Running the API

Start the Flask API server:

```bash
python app.py
```

The API will be available at `http://localhost:5000`.

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/models` - Get list of available models
- `POST /api/recommend` - Get crop recommendations based on input data

### Example Request for /api/recommend

```json
{
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43,
  "temperature": 21,
  "humidity": 82,
  "model": "best_overall"
}
```

The `model` parameter is optional and defaults to `best_overall`.

### Example Response

```json
{
  "recommendations": [
    {
      "cropName": "Rice",
      "confidence": 0.87,
      "imageUrl": "https://...",
      "description": "Rice thrives in warm, humid conditions..."
    },
    {
      "cropName": "Maize",
      "confidence": 0.65,
      "imageUrl": "https://...",
      "description": "Maize needs warm soil..."
    },
    {
      "cropName": "Wheat",
      "confidence": 0.45,
      "imageUrl": "https://...",
      "description": "Wheat prefers moderate temperatures..."
    }
  ],
  "model_used": "best_overall"
}
```

## Troubleshooting

If you encounter issues loading the models, check that:

1. The model files exist in the correct location
2. You have the correct model versions as expected by the code
3. You have installed all the required dependencies
