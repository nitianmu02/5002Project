from pathlib import Path
BASE_DIR = f'{Path(__file__).resolve().parent.parent}'
import IPython.display as ipd
import torch
from . import commons
from . import utils
from .models import SynthesizerTrn
from .text.symbols import symbols
from .text import text_to_sequence
import soundfile as sf
import os
root_dir = os.path.dirname(os.path.realpath(__file__))

def get_text(text, hps):
    text_norm = text_to_sequence(text, hps.data.text_cleaners)
    if hps.data.add_blank:
        text_norm = commons.intersperse(text_norm, 0)
    text_norm = torch.LongTensor(text_norm)
    return text_norm

def init_model():
    
    hps = utils.get_hparams_from_file("./configs/genshin_base_ms.json")

    net_g = SynthesizerTrn(
        len(symbols),
        hps.data.filter_length // 2 + 1,
        hps.train.segment_size // hps.data.hop_length,
        n_speakers=hps.data.n_speakers,
        **hps.model).cuda()
    _ = net_g.eval()

    _ = utils.load_checkpoint('./checkpoints/G_2036.pth', net_g, None)
    return net_g, hps

def gen_speech(text, speaker, net_g, hps, speed = 1.):
    speaker_list = ['Paimon', 'Miko', 'Kazuha', 'Nahida',\
                'Hutao', 'Ayaka', 'Yoimiya', 'Ganyu',\
                'Mona', 'Ei']
    id = speaker_list.index(speaker)
    with torch.no_grad():
        stn_tst = get_text(text, hps)
        x_tst = stn_tst.cuda().unsqueeze(0)
        x_tst_lengths = torch.LongTensor([stn_tst.size(0)]).cuda()
        sid = torch.LongTensor([id]).cuda()#@param {type:"longtensor", 0:9}
        audio = net_g.infer(x_tst, x_tst_lengths, sid=sid, noise_scale=.667,\
            noise_scale_w=0.8, length_scale=speed)[0][0,0].data.cpu().float().numpy()
        ipd.display(ipd.Audio(audio, rate=hps.data.sampling_rate))
        audio_path = root_dir + f'./output/speech.wav'
        sf.write(audio_path,audio, samplerate=hps.data.sampling_rate)
        # os.system('move ./output/speech.wav ../static/')
        
net_g, hps = init_model()
gen_speech('你好啊', 'Paimon', net_g, hps)