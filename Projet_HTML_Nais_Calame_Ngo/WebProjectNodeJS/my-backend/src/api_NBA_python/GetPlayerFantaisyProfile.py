from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
import sys 

# NBA API request to get the last N match of the player
info = playerfantasyprofile.PlayerFantasyProfile(player_id = sys.argv[1], LastNGames = 2)

# return Json response on STDOUT stream
print(info.get_json())