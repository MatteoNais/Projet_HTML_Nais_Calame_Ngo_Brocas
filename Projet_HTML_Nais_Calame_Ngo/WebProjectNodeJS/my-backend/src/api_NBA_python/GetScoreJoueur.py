from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
import sys 
import json
# NBA API request to get the last N match of the player
info = playerdashboardbylastngames.PlayerDashboardByLastNGames(player_id = sys.argv[1], date_from_nullable=sys.argv[2], date_to_nullable=sys.argv[3])
# Obtenir les données JSON
data = info.get_json()

# Charger les données JSON
parsed_data = json.loads(data)

# Manipuler ou personnaliser les données selon vos besoins
# Par exemple, ajouter une clé 'custom_key' avec une valeur personnalisée
if len(parsed_data['resultSets']) > 5 and len(parsed_data['resultSets'][5]['rowSet']) > 0:
    # Your code here
    # Extraire les statistiques spécifiques
    lastN_stats = parsed_data['resultSets'][5]['rowSet'][0]
    gp = lastN_stats[2]  # Indice correspondant à GP dans rowSet
    pts = lastN_stats[26]  # Indice correspondant à PTS dans rowSet
    ast = lastN_stats[19]  # Indice correspondant à AST dans rowSet
    blk = lastN_stats[22]  # Indice correspondant à BLK dans rowSet
    reb = lastN_stats[18]  # Indice correspondant à REB dans rowSet
    stl = lastN_stats[21]  # Indice correspondant à STL dans rowSet
    oreb = lastN_stats[16]  # Indice correspondant à OREB dans rowSet
    dreb = lastN_stats[17]  # Indice correspondant à DREB dans rowSet
    tov = lastN_stats[20]   # Indice correspondant à TOV dans rowSet
    plus_minus = lastN_stats[27]  # Indice correspondant à PLUS_MINUS dans rowSet
    fg_pct = lastN_stats[9]      # Indice correspondant à FG_PCT dans rowSet
    pfd = lastN_stats[25]         # Indice correspondant à PFD dans rowSet
    pf = lastN_stats[24]          # Indice correspondant à PF dans rowSet
    calculatedScore = ((pts*1.2 + ast * 1.6 + oreb * 1.2 + dreb *1.1 + blk * 2 + stl * 2 + fg_pct * 5.6 + pfd * 0.4 - tov * 1.1 - pf * 0.6 + plus_minus * 0.5) / gp)
else :
    calculatedScore = 0
score = { 'score' : calculatedScore }

# Convertir les données manipulées en JSON
customized_data = json.dumps(score, indent=2)
# return Json response on STDOUT stream
print(customized_data)