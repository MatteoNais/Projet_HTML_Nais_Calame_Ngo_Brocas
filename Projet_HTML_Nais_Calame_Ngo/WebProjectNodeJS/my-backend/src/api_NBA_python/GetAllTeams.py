from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
from nba_api.stats.static import *
import sys 
import json

# Get all NBA teams
team = teams.get_teams()
team = json.dumps(team)

# return Json response on STDOUT stream
print(team)