from httplib2 import Response
import requests

def test():
  title = "Endgame"
  headers = {
    "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
    "x-rapidapi-key": "4d9a5d0385msh520a8009f617595p1ac0c4jsn66f1251519a3",
  }
  query = {
    "page": "1",
    "r": "json",
    "s": title,
  }
  params = { "limit": '50', "page": '1', "titleType": 'movie'}
  response:Response = requests.get(f"https://data-imdb1.p.rapidapi.com/movie/imdb_id/byTitle/{title}/", params=params,headers=headers)
  print(response.text)

if __name__ == "__main__":
  test()