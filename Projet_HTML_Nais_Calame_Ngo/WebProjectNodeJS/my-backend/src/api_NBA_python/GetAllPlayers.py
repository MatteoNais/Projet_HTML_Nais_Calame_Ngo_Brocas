from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
import sys 

# Get all NBA player from this season
players = commonallplayers.CommonAllPlayers(season=Season.current_season, league_id=LeagueID.nba, is_only_current_season=1)

# return Json response on STDOUT stream
print(players.get_json())