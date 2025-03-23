# Agricultural Crop Prediction Application

This project is a full-stack application for predicting suitable crops based on soil composition and climate conditions.

## Project Structure

- `backend/` - Flask backend API with machine learning models
- `cropwise-artistry-main/` - React frontend application
- `model_weights/` - Saved machine learning model files
- `plots/` - Visualization plots from the model training

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Create and activate a virtual environment (recommended):

   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install required packages:

   ```
   pip install -r requirements.txt
   ```

4. Run the backend server:
   ```
   flask run --host=0.0.0.0 --port=5001
   ```
   The backend will be available at http://localhost:5001

### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd cropwise-artistry-main
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file with the following content:

   ```
   VITE_API_URL=http://localhost:5001/api
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   The frontend will be available at http://localhost:8080

### Running Both Frontend and Backend Together

For convenience, you can run both the frontend and backend with a single command:

```
cd cropwise-artistry-main
npm run start:dev
```

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/models` - Get list of available machine learning models
- `POST /api/recommend` - Get crop recommendations based on input data

## Input Parameters

The recommendation API expects the following input parameters:

- `nitrogen` - Nitrogen content in soil (mg/kg)
- `phosphorus` - Phosphorus content in soil (mg/kg)
- `potassium` - Potassium content in soil (mg/kg)
- `temperature` - Temperature in Celsius
- `humidity` - Humidity percentage
- `model` (optional) - ML model to use for prediction

## Troubleshooting

If you encounter CORS issues:

- Ensure the backend CORS settings are properly configured
- Check that you're using the correct API URL in the frontend

If the frontend can't connect to the backend:

- Verify that the backend server is running
- Check the VITE_API_URL in your .env file
- Make sure the port 5001 is not already in use

## License

This project is licensed under the MIT License - see the LICENSE file for details.
