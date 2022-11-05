from rest_framework.response import Response
from rest_framework.decorators import api_view
import sys
sys.path.append('..')
sys.path.append('../VITS/')
from VITS import inference as inf

net_g = None
hps = None
net_g, hps = inf.init_model()
    

@api_view(['POST'])
def index(request):
    global net_g, hps
    text = request.data.get('text')
    speaker = request.data.get('speaker')
    speed = request.data.get('speed')
    speed = float(speed)
    # res = {'text':text, 'speaker':speaker}
    inf.gen_speech(text, speaker, net_g, hps, speed)
    src = '/VITS/output/speech.wav'
    return Response(src)
