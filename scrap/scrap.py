from requests import get
from bs4 import BeautifulSoup as BS
import json

def getListBK(category,page):
    url = "https://bioskopkeren.fun/{}/page/{}".format(category, page)
    req = get(url).content
    page = BS(req, 'html.parser')
    for movies in page.find_all('div', 'filmcontent'):
        data = []
        for div in movies.find_all('div', 'moviefilm'):
            out = {}
            a = div.find('a', href=True)
            out.update({'url': a['href']})
            img = div.find('img')
            out.update({'thumbnails': img['src']})
            out.update({'title': img['alt']})
            data.append(out)
    return(json.dumps(data))

def getInfoBK(url):
    out = {}
    req = get(url).content
    bs = BS(req, 'html.parser')
    iframe = bs.find('iframe')
    out.update({'embed': iframe['src']})
    # div = bs.find('div','filmicerik')
    for div in bs.find_all('div', 'filmicerik'):
        desc = div.find_all('p')[2].find_next('span')
        out.update({'description': desc.text.strip('Sinopsis – ' or '\n')})
        break
    det = bs.find('div','filmaltiaciklama')
    for p in det.find_all('p'):
        data = []
        if p.find('span'):
            title = p.find('span').text
            if p.find('a'):
                isi = [x.text for x in p.find_all('a')]
            else:
                isi = p.contents[1][2:].strip()
            out.update({title : isi})
            data.append(out)
    for elemen in data:
        del elemen['Etiketler']
        return(json.dumps(data))
    
def getEmbedBK(url):
    out = {}
    req = get(url).content
    bs = BS(req, 'html.parser')
    iframe = bs.find('iframe')
    out.update({'embed': iframe['src']})
    return(json.dumps(out))