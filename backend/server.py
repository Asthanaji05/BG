from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from gtts import gTTS
import requests
from bs4 import BeautifulSoup
import os
from queue import Queue
import threading

# Global queue for audio tasks
audio_task_queue = Queue()
def audio_worker():
    while True:
        task = audio_task_queue.get()
        if task is None:
            break
        text, result_queue = task["text"], task["result_queue"]
        try:
            tts = gTTS(text)
            audio_path = "output.mp3"  # Optionally, use unique filenames if needed.
            tts.save(audio_path)
            result_queue.put(("success", audio_path))
        except Exception as e:
            result_queue.put(("error", str(e)))
        finally:
            audio_task_queue.task_done()
# Start the worker thread (daemon so it shuts down with the app)
worker_thread = threading.Thread(target=audio_worker, daemon=True)
worker_thread.start()


load_dotenv()
app = Flask(__name__)

# CORS enable with headers
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/')
def index():
    return 'Backend Running ....'

@app.route('/generate-audio', methods=['POST'])
def generate_audio():
    try:
        data = request.json
        text = data.get("text", "")

        if not text:
            print("❌ Error: No text received!")
            return jsonify({"error": "Text input is required"}), 400

        print("✅ Received text:", text)

        # Create a queue to get result from worker thread
        from queue import Queue
        result_queue = Queue()
        # Enqueue the task
        audio_task_queue.put({"text": text, "result_queue": result_queue})

        # Wait for the task to be processed
        status, payload = result_queue.get()
        if status == "error":
            raise Exception(payload)
        audio_path = payload

        print("✅ Audio file saved successfully!")
        return send_file(audio_path, mimetype="audio/mpeg", as_attachment=True, download_name="generated_audio.mp3")

    except Exception as e:
        print("❌ Exception Error:", e)
        return jsonify({"error": str(e)}), 500


@app.route('/hindi-translation', methods=['POST'])
def get_hi():
    try:
        # Get chapter and verse
        data = request.json
        print("Raw Request Data:", request.data)  # Debug line
        data = request.get_json(force=True)
        print("Parsed JSON:", data)
        chapter = data.get("chapter", 1)
        verse = data.get("verse", 1)
        print("✅ Received Chapter:", chapter)
        print("✅ Received Verse:", verse)
        
        # Get Hindi translation
        url = f"https://www.holy-bhagavad-gita.org/chapter/{chapter}/verse/{verse}/hi"
        headers = {"User-Agent": "Mozilla/5.0"}  # Prevent blocking

        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise error if request fails

        soup = BeautifulSoup(response.text, "html.parser")
        element = soup.select_one("#translation > p")

        if element:
            return jsonify({"translation": element.text})  # ✅ Return JSON response
        else:
            return jsonify({"error": "Translation not found!"}), 404  # ✅ Proper error response

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # ✅ Handle unexpected errors

if __name__ == '__main__':
    app.run(debug=True, port=5000)
