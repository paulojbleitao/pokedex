from selenium import webdriver
import json

def get_moves(pokemon):
    moves = set()
    driver.get('https://www.smogon.com/dex/sm/pokemon/' + pokemon)
    elements = driver.find_elements_by_class_name('MoveList')
    for element in elements:
        moves.add(element.find_element_by_tag_name('a').text)
    return list(moves)

def save_to_file():
    with open('pokemonMoves.json', 'w') as f2:
        json.dump(notable_moves, f2)


with open('pokemonNames.json') as f:
    names = json.load(f)['names']

try:
    with open('pokemonMoves.json') as f3:
        notable_moves = json.load(f3)
except:
    notable_moves = { 'last_index': -1 }

driver = webdriver.Firefox()

for i in range(notable_moves['last_index'] + 1, len(names) - 1):
    notable_moves[names[i]] = get_moves(names[i])
    save_to_file()
    notable_moves['last_index'] = i    

driver.close()
