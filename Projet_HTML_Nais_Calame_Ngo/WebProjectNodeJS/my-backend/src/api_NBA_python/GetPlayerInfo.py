from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
from nba_api.stats.static import *
import sys 
import json

# Get all NBA player from this season
players = commonplayerinfo.CommonPlayerInfo(player_id=sys.argv[1])

# return Json response on STDOUT stream
print(players.get_json())