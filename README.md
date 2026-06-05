# Approach


The pipeline works in 4 steps:
1. Extract audio duration using FFprobe (source of truth for timing)
2. Calculate per-image timing based on total duration
3. Apply crossfade transitions between images (~0.5s)
4. Render and encode the final video with voice, background music, and burned-in subtitles

Remotion is used for composition structure, while FFmpeg handles media processing and final encoding for deterministic output.

---

As observed in the provided sample output video, I introduced an optional transition layer between image sequences.

The goal is to improve visual continuity during scene changes by avoiding abrupt cuts and creating smoother visual flow.

If I don't use any transitions, captions can end up displayed late because image crossfades or abrupt changes shift visual timing relative to the audio; adding optional transitions keeps the visual timing aligned with the voice and prevents captions from appearing delayed.

To keep the system flexible, transitions are fully optional and controlled via:

```ts
transitionMode: "none" | "fade" | "cinematic"
```

This can be configured in main.ts, allowing the pipeline to output either:

strict timing mode (no transitions)
cinematic mode (with smooth transitions)

The default can be set to "none" to ensure frame-accurate timing when required.

#Tricky Parts
Synchronizing image timing with voice duration without hardcoding values
Handling crossfade timing correctly without breaking total duration alignment
Balancing background music so it does not overpower the voice track
Ensuring subtitles remain correctly synchronized after rendering

# Improvements
- Introduce a render queue system to support multiple video generation jobs asynchronously instead of single execution.
- Generalize the pipeline to support dynamic scene templates, allowing flexible storytelling beyond fixed image sequences.
- Add a timeline abstraction layer to improve synchronization between scenes, voiceover, music, and subtitles.
- Implement caching for downloaded assets to avoid repeated network fetches and improve rendering performance.
- Add pre-render validation for media files (audio duration, image accessibility, subtitle format) to reduce runtime failures.

---

# SETUP 

```ts 
npm install 
```

```ts 
npm run build 
```

```ts 
npm run start
```


# OUTPUT LOCATION
dist/output.mp4