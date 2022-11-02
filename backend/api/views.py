from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def index(request):
    res = {
        'status': 1,
        'msg': '',
        'data': {}
    }
    res['status'] = 1.
    res["msg"]='hahaha'
    res['data'] = {'username':'zzm'}
    return Response(res)