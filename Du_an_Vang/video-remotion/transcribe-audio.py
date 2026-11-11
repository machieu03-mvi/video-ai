from pathlib import Path
import json
import wave
import numpy as np
from faster_whisper import WhisperModel
root=Path(__file__).resolve().parent
model=WhisperModel('small',device='cpu',compute_type='int8',cpu_threads=8,download_root=str(root/'.models'))
with wave.open(str(root/'public/giong-doc.wav')) as wav:
    assert wav.getframerate()==48000 and wav.getnchannels()==1 and wav.getsampwidth()==2
    pcm=np.frombuffer(wav.readframes(wav.getnframes()),dtype=np.int16).astype(np.float32)/32768
# The original WAV is retained for video. Feed a 16 kHz analysis signal to ASR.
audio=pcm[:len(pcm)//3*3].reshape(-1,3).mean(axis=1)
segments,info=model.transcribe(audio,language='vi',word_timestamps=True,vad_filter=True,beam_size=5)
words=[]
for s in segments:
    words.extend({'text':w.word,'start':w.start,'end':w.end} for w in (s.words or []))
    print(f'{s.start:.2f}-{s.end:.2f}',flush=True)
out=root/'src/vang'
(out/'recording.words.json').write_text(json.dumps(words,ensure_ascii=False,indent=2),encoding='utf-8')
def ts(v):
    ms=round(v*1000); h,ms=divmod(ms,3600000); m,ms=divmod(ms,60000); s,ms=divmod(ms,1000)
    return f'{h:02}:{m:02}:{s:02},{ms:03}'
(out/'recording.words.srt').write_text('\n'.join(f"{i+1}\n{ts(w['start'])} --> {ts(w['end'])}\n{w['text'].strip()}\n" for i,w in enumerate(words)),encoding='utf-8')
print('Words:',len(words),flush=True)
