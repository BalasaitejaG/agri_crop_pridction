from flask import Flask, request, jsonify
from flask_cors import CORS
import model_loader
import traceback
import os

app = Flask(__name__)
# Enable CORS for all origins but more restricted by default
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"],
                                 "allow_headers": ["Content-Type", "Authorization"]}})


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "API is running"})


@app.route('/api/models', methods=['GET'])
def get_models():
    """Get list of available models"""
    return jsonify({
        "models": list(model_loader.models.keys())
    })


@app.route('/api/recommend', methods=['POST'])
def recommend_crops():
    """Get crop recommendations based on input data"""
    try:
        data = request.json

        # Validate input data
        required_fields = ['nitrogen', 'phosphorus',
                           'potassium', 'temperature', 'humidity']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Convert string values to numbers if needed
        input_data = {}
        for field in required_fields:
            try:
                input_data[field] = float(data[field])
            except ValueError:
                return jsonify({"error": f"Invalid value for {field}: {data[field]}"}), 400

        # Get model name from request or use default
        model_name = data.get('model', 'best_overall')

        # Get recommendations
        try:
            recommendations = model_loader.predict_crops(
                input_data, model_name)

            return jsonify({
                "recommendations": recommendations,
                "model_used": model_name
            })
        except Exception as e:
            print(f"Error processing request: {e}")
            traceback.print_exc()

            # Get fallback recommendations
            fallback_recommendations = model_loader.fallback_recommendations(
                input_data)

            return jsonify({
                "recommendations": fallback_recommendations,
                "model_used": "fallback",
                "error": str(e),
                "message": "Using fallback recommendations due to model error"
            }), 200  # Return 200 even with error since we're providing fallback data

    except Exception as e:
        print(f"Error processing request: {e}")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
