from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
from nba_api.stats.static import *
import sys 
import json
import concurrent.futures

def get_team_info(team):
    return teaminfocommon.TeamInfoCommon(team_id=team['id']).get_dict()

# Get team info
teams = teams.get_teams()

# Créer un pool de threads pour exécuter les appels de manière parallèle
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Exécuter les appels pour récupérer les informations d'équipe en parallèle
    futures = [executor.submit(get_team_info, team) for team in teams]
    
    # Attendre que tous les appels soient terminés et récupérer les résultats
    results = [future.result() for future in concurrent.futures.as_completed(futures)]

# Convertir les résultats en JSON
json_resultat = json.dumps(results)

# Renvoyer la réponse JSON sur le flux STDOUT
print(json_resultat)

'''
from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
from nba_api.stats.static import *
import sys 
import json

# Get team info
teams = teams.get_teams()
info = []
for team in teams:
    info.append(teaminfocommon.TeamInfoCommon(team_id=team['id']))

json_resultat = json.dumps([team.get_dict() for team in info])

# return Json response on STDOUT stream
print(json_resultat)'''