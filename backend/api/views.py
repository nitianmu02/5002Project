from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['POST'])
def index(request):
    text = request.data.get('text')
    voice = request.data.get('voice')
    res = {'text':text, 'voice':voice}
    return Response(res)