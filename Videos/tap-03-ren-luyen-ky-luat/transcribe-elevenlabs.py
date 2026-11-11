"""Generate a word-timed Vietnamese transcript locally, preserving the source audio."""
from pathlib import Path
import json
import av
import numpy as np
from faster_whisper import WhisperModel

root = Path(__file__).resolve().parent
project = root.parents[1] / 'Du_an_Vang/video-remotion'
audio_file = root / 'input/elevenlabs-tap03-v4.mp3'
model = WhisperModel('small', device='cpu', compute_type='int8', cpu_threads=8,
                     download_root=str(project/'.models'), local_files_only=True)
with av.open(str(audio_file)) as container:
    resampler = av.AudioResampler(format='fltp', layout='mono', rate=16000)
    parts = []
    for frame in container.decode(audio=0):
        parts.extend(f.to_ndarray().reshape(-1) for f in resampler.resample(frame))
    parts.extend(f.to_ndarray().reshape(-1) for f in resampler.resample(None))
audio = np.concatenate(parts).astype(np.float32)
segments, _ = model.transcribe(audio, language='vi', word_timestamps=True, vad_filter=True, beam_size=5)
words=[]
for segment in segments:
    words.extend({'text':w.word.strip(),'start':w.start,'end':w.end} for w in (segment.words or []))
    print(f'{segment.start:.2f}-{segment.end:.2f}', flush=True)
(root/'src/elevenlabs-words.json').write_text(json.dumps(words,ensure_ascii=False,indent=2),encoding='utf8')
def stamp(value):
    ms=round(value*1000); h,ms=divmod(ms,3600000); m,ms=divmod(ms,60000); s,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
(root/'src/elevenlabs-words.srt').write_text('\n'.join(f"{i+1}\n{stamp(w['start'])} --> {stamp(w['end'])}\n{w['text']}\n" for i,w in enumerate(words)),encoding='utf8')
print('Words:',len(words),flush=True)
