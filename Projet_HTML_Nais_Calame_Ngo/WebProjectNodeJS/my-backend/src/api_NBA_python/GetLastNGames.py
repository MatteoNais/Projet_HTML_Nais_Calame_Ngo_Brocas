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
lastN_stats = parsed_data['resultSets'][5]['rowSet'][0]

# Extraire les statistiques spécifiques
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
# Créer un dictionnaire avec les statistiques spécifiques
specific_stats = {
    'GP' : gp,
    'PTS': pts,
    'AST': ast,
    'BLK': blk,
    'REB': reb,
    'STL': stl,
    'OREB': oreb,
    'DREB': dreb,
    'TOV': tov,
    'PLUS_MINUS': plus_minus,
    'FG_PCT': fg_pct,
    'PFD': pfd,
    'PF': pf    
}

# Convertir les données manipulées en JSON
customized_data = json.dumps(specific_stats, indent=2)
# return Json response on STDOUT stream
print(customized_data)