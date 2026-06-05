VIDEO RENDERING — PAID TEST TASK ASSETS
========================================

These are the input files for the paid test task. Build a Node.js script
using FFmpeg that assembles them into a single output.mp4.

FILES
-----
- image1.jpg, image2.jpg, image3.jpg  -> 3 real historical images (public domain)
- voice.mp3                           -> voiceover track (~18 seconds)
- music.mp3                           -> background music track (~18 seconds)
- captions.srt                        -> subtitles to burn in

REQUIREMENTS (your output.mp4 must satisfy all)
-----------------------------------------------
1. Resolution 1920x1080 (horizontal 16:9, long-form). Images scaled/cropped
   to fit without distortion.
2. The 3 images shown in sequence, split evenly across the FULL duration
   of voice.mp3 (read the audio length programmatically — do NOT hardcode).
3. A ~0.5s crossfade transition between each image.
4. voice.mp3 plays as the main audio.
5. music.mp3 plays underneath at ~15-20% volume so the voice stays clear.
6. captions.srt burned into the video.

DELIVERABLES
------------
- A GitHub repo with your code
- A clear README (how to install and run it)
- The final output.mp4
- A short note: your approach, anything tricky, how you'd improve it

NOTE: voice.mp3 and music.mp3 are synthetic test tones (different pitches
so you can confirm the mix). The task is about the FFmpeg/Node pipeline
mechanics, not the audio content.
