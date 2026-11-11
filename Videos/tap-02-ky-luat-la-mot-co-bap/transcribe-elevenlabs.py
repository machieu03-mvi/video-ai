from pathlib import Path
import json
import av
import numpy as np
from faster_whisper import WhisperModel

root=Path(__file__).resolve().parent
project=root.parents[1]/'Du_an_Vang/video-remotion'
model=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=8,download_root=str(project/'.models'),local_files_only=True)
with av.open(str(root/'input/elevenlabs-anh-v4.mp3')) as container:
    resampler=av.AudioResampler(format='fltp',layout='mono',rate=16000)
    chunks=[]
    for frame in container.decode(audio=0):
        chunks.extend(x.to_ndarray().reshape(-1) for x in resampler.resample(frame))
    chunks.extend(x.to_ndarray().reshape(-1) for x in resampler.resample(None))
audio=np.concatenate(chunks).astype(np.float32)
segments,_=model.transcribe(audio,language='vi',word_timestamps=True,vad_filter=True,beam_size=5)
words=[]
for s in segments:
    words.extend({'text':w.word.strip(),'start':w.start,'end':w.end} for w in (s.words or []))
    print(f'{s.start:.2f}-{s.end:.2f} {s.text}',flush=True)
(root/'src/elevenlabs-words.json').write_text(json.dumps(words,ensure_ascii=False,indent=2),encoding='utf-8')
def ts(v):
    ms=round(v*1000); h,ms=divmod(ms,3600000); m,ms=divmod(ms,60000); s,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
(root/'src/elevenlabs-words.srt').write_text('\n'.join(f"{i+1}\n{ts(w['start'])} --> {ts(w['end'])}\n{w['text']}\n" for i,w in enumerate(words)),encoding='utf-8')
print('Words:',len(words),flush=True)
