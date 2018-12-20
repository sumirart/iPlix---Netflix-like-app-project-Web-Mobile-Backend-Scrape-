from flask import Flask, request, Response, json
from flask_cors import CORS
from scrap import *

app = Flask(__name__)
CORS(app)

# @app.route('/api/<string:category>/<int:page>', methods=['GET'])
# def ganolList(category, page):
#     a = getList(category,page)
#     return Response(a, mimetype='application/json')

# # @app.route('/api/embed', methods=['GET'])
# # def embedVideo():
# #     url = request.args.get('url')
# #     a = getEmbed(url)
# #     return Response(a, mimetype = 'application/json')

# @app.route('/api/info', methods=['GET'])
# def infoVideo():
#     url = request.args.get('url')
#     a = getInfo(url)
#     return Response(a, mimetype = 'application/json')

@app.route('/api/<string:category>/<int:page>', methods=['GET'])
def BKList(category, page):
    a = getListBK(category,page)
    return Response(a, mimetype='application/json')

@app.route('/api/info', methods=['GET'])
def infoVideoBK():
    url = request.args.get('url')
    a = getInfoBK(url)
    return Response(a, mimetype = 'application/json')

@app.route('/api/embed', methods=['GET'])
def embedVideoBK():
    url = request.args.get('url')
    a = getEmbedBK(url)
    return Response(a, mimetype = 'application/json')