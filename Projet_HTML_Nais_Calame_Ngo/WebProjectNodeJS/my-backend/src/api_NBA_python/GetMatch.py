import sys
from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *


#matches = scoreboard.Scoreboard()
matches = scoreboard.Scoreboard(game_date = sys.argv[1])
data = matches.get_json()
print(data)