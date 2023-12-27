```python
import speech_recognition as sr
from typing import Tuple

class VoiceToTextConverter:
    def __init__(self):
        self.recognizer = sr.Recognizer()

    def convert_audio_to_text(self, audio_file_path: str) -> Tuple[str, bool]:
        """
        Converts speech from an audio file to text.

        Parameters:
        audio_file_path (str): The file path to the audio file.

        Returns:
        Tuple[str, bool]: A tuple containing the transcribed text and a boolean indicating success.
        """
        try:
            with sr.AudioFile(audio_file_path) as source:
                audio_data = self.recognizer.record(source)
                text = self.recognizer.recognize_google(audio_data)
                return text, True
        except sr.UnknownValueError:
            return "Google Speech Recognition could not understand audio", False
        except sr.RequestError as e:
            return f"Could not request results from Google Speech Recognition service; {e}", False

# Example usage:
if __name__ == "__main__":
    converter = VoiceToTextConverter()
    transcribed_text, success = converter.convert_audio_to_text("path/to/your/audio/file.wav")
    if success:
        print("Transcribed text:", transcribed_text)
    else:
        print("Error:", transcribed_text)
```