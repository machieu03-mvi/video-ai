from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import base64, json, os, sys

root=Path(__file__).resolve().parent
key=os.environ.get('ELEVENLABS_API_KEY','').strip()
if not key: sys.exit('Missing ELEVENLABS_API_KEY')
text=(root/'input/loi_dan.txt').read_text(encoding='utf-8-sig').strip()
body={'text':text,'model_id':'eleven_v3','language_code':'vi','voice_settings':{'stability':0.5,'similarity_boost':0.75}}
req=Request('https://api.elevenlabs.io/v1/text-to-speech/ywBZEqUhld86Jeajq94o/with-timestamps?output_format=mp3_44100_128',data=json.dumps(body,ensure_ascii=False).encode('utf-8'),headers={'xi-api-key':key,'content-type':'application/json'},method='POST')
try:
    with urlopen(req,timeout=120) as response: result=json.load(response)
except HTTPError as exc:
    print('ElevenLabs error HTTP',exc.code,exc.read(1200).decode('utf-8','replace'));sys.exit(1)
(root/'input/elevenlabs-anh.mp3').write_bytes(base64.b64decode(result['audio_base64']))
(root/'src/elevenlabs-alignment.json').write_text(json.dumps({'alignment':result.get('alignment'),'normalized_alignment':result.get('normalized_alignment'),'voice_id':'ywBZEqUhld86Jeajq94o','voice':'Anh - Warm, Calm and Deep','model':body['model_id']},ensure_ascii=False,indent=2),encoding='utf-8')
print('Audio and timing saved')
