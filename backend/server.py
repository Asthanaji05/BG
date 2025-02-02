from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from elevenlabs import ElevenLabs
import os

load_dotenv()
app = Flask(__name__)

# CORS enable with headers
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
@app.route('/')
def index():
    return 'Backend Running ....'
client = ElevenLabs(api_key=os.getenv('sk_8e4e7e1836471adcfb20544b44bd737716f1d0108970e378'))
@app.route('/generate-audio', methods=['POST'])
def generate_audio():
    try:
        data = request.json
        text = data.get("text", "")

        if not text:
            print("❌ Error: No text received!")
            return jsonify({"error": "Text input is required"}), 400

        print("✅ Received text:", text)

        # Ensure API key is loading
        api_key = os.getenv("ELEVENLABS_API_KEY")
        if not api_key:
            print("❌ Error: ElevenLabs API key is missing!")
            return jsonify({"error": "API key is missing!"}), 500

        print("✅ Using API Key:", api_key)

        # Generate speech using ElevenLabs
        client = ElevenLabs(api_key=api_key)
        audio = client.text_to_speech.convert(
            voice_id="JBFqnCBsd6RMkjVDRZzb",
            output_format="mp3_44100_128",
            text=text,
            model_id="eleven_multilingual_v2",
        )

        if not audio:
            print("❌ Error: ElevenLabs API did not return audio!")
            return jsonify({"error": "Audio generation failed"}), 500

        # Save the audio file
        audio_path = "output.mp3"
        with open(audio_path, "wb") as f:
             f.write(b"".join(audio))

        print("✅ Audio file saved successfully!")

        return send_file(audio_path, mimetype="audio/mpeg", as_attachment=True, download_name="generated_audio.mp3")

    except Exception as e:
        print("❌ Exception Error:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
