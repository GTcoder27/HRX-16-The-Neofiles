# Updated app.py - Production Ready

from flask import Flask, request, jsonify
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
import re
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Extract plain transcript
def get_clean_transcript(video_id, languages=None):
    try:
        print(f"Attempting to get transcript for video: {video_id}")
        print(f"Requested languages: {languages}")
        
        # Try to get the transcript
        transcript_response = YouTubeTranscriptApi.get_transcript(video_id, languages=languages)
        
        print(f"Successfully retrieved transcript with {len(transcript_response)} segments")
        
        # Clean and join the transcript
        transcript_text = ' '.join([snippet['text'] for snippet in transcript_response])
        transcript_text = ' '.join(transcript_text.split())
        
        # Get the language that was actually used
        used_language = transcript_response[0].get('language', 'unknown') if transcript_response else 'unknown'
        
        print(f"Used language: {used_language}")
        print(f"Transcript length: {len(transcript_text)} characters")
        
        return transcript_text, used_language
        
    except TranscriptsDisabled as e:
        print(f"Transcripts disabled for video {video_id}: {e}")
        return None, f"transcripts_disabled: {str(e)}"
        
    except Exception as e:
        print(f"Error fetching transcript for {video_id}: {type(e).__name__}: {e}")
        return None, f"error: {type(e).__name__}: {str(e)}"

# Extract video ID from URL
def extract_video_id(url):
    patterns = [
        r'(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&\n?#]+)',
        r'(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^&\n?#]+)',
        r'(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^&\n?#]+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    
    if len(url) == 11 and url.replace('_', '').replace('-', '').isalnum():
        return url
    
    raise ValueError("Invalid YouTube URL format")

# Home route with usage instructions
@app.route('/')
def home():
    return jsonify({
        "message": "YouTube Transcript API Server",
        "version": "1.1",
        "status": "Production Ready",
        "endpoints": {
            "GET /": "This documentation",
            "POST /transcript": "Get transcript from YouTube URL",
            "GET /transcript": "Get transcript from YouTube URL (via query parameter)",
            "GET /languages/<video_id>": "Get available transcript languages for a video"
        },
        "usage": {
            "POST /transcript": {
                "method": "POST",
                "content-type": "application/json",
                "body": {
                    "url": "https://youtu.be/VIDEO_ID",
                    "languages": ["hi", "en"]
                },
                "example": "curl -X POST -H 'Content-Type: application/json' -d '{\"url\":\"https://youtu.be/dQw4w9WgXcQ\", \"languages\": [\"hi\", \"en\"]}' https://your-app.railway.app/transcript"
            },
            "GET /transcript": {
                "method": "GET",
                "example": "https://your-app.railway.app/transcript?url=https://youtu.be/dQw4w9WgXcQ&lang=hi"
            }
        }
    })

# Main transcript endpoint
@app.route('/transcript', methods=['POST', 'GET'])
def get_transcript():
    try:
        # Input handling
        if request.method == 'POST':
            data = request.get_json()
            if not data or 'url' not in data:
                return jsonify({
                    "error": "Missing 'url' in request body",
                    "example": {"url": "https://youtu.be/VIDEO_ID", "languages": ["hi", "en"]}
                }), 400
            youtube_url = data['url']
            languages = data.get('languages', None)
        else:
            youtube_url = request.args.get('url')
            lang_query = request.args.get('lang')
            if not youtube_url:
                return jsonify({
                    "error": "Missing 'url' query parameter",
                    "example": "/transcript?url=https://youtu.be/VIDEO_ID&lang=hi"
                }), 400
            languages = [lang_query] if lang_query else None

        print(f"Processing request - URL: {youtube_url}, Languages: {languages}")

        # Extract video ID
        try:
            video_id = extract_video_id(youtube_url)
            print(f"Extracted video ID: {video_id}")
        except ValueError as e:
            return jsonify({
                "error": f"Invalid YouTube URL: {str(e)}",
                "provided_url": youtube_url,
                "supported_formats": [
                    "https://www.youtube.com/watch?v=VIDEO_ID",
                    "https://youtu.be/VIDEO_ID",
                    "https://www.youtube.com/embed/VIDEO_ID",
                    "VIDEO_ID (11-character YouTube ID)"
                ]
            }), 400

        # Get transcript
        transcript, error_or_lang = get_clean_transcript(video_id, languages=languages)
        
        if transcript:
            return jsonify({
                "success": True,
                "video_id": video_id,
                "url": youtube_url,
                "language_used": error_or_lang,
                "transcript": transcript,
                "length": len(transcript),
                "word_count": len(transcript.split())
            })
        else:
            # More detailed error response
            return jsonify({
                "error": "Failed to fetch transcript",
                "video_id": video_id,
                "url": youtube_url,
                "requested_languages": languages,
                "detailed_error": error_or_lang,
                "possible_reasons": [
                    "Video doesn't have captions/subtitles",
                    "Captions are disabled",
                    "Video is private or doesn't exist",
                    "Requested language not available",
                    "Auto-generated captions in unsupported language"
                ],
                "suggestion": f"Try checking available languages at: /languages/{video_id}"
            }), 404

    except Exception as e:
        print(f"Server error in get_transcript: {type(e).__name__}: {e}")
        return jsonify({
            "error": f"Server error: {str(e)}",
            "error_type": type(e).__name__
        }), 500

# Health check
@app.route('/health')
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "YouTube Transcript API",
        "port": os.environ.get('PORT', 'Not set')
    })

# Get list of available transcript languages
@app.route('/languages/<video_id>')
def available_languages(video_id):
    try:
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        available = [{
            "language": t.language,
            "language_code": t.language_code,
            "is_generated": t.is_generated
        } for t in transcript_list]
        return jsonify({
            "video_id": video_id,
            "available_languages": available
        })
    except TranscriptsDisabled:
        return jsonify({"error": "Transcripts are disabled for this video"}), 403
    except Exception as e:
        return jsonify({"error": f"Could not retrieve languages: {str(e)}"}), 500

# Start server - Production Ready
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug_mode = os.environ.get('FLASK_DEBUG', 'False').lower() == 'true'
    app.run(debug=debug_mode, host='0.0.0.0', port=port)