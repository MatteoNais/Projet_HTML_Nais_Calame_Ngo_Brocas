from nba_api.stats.endpoints import *
from nba_api.stats.library.parameters import *
from nba_api.stats.static import *
import sys 
import json

# Get team info
info = teaminfocommon.TeamInfoCommon(team_id=sys.argv[1])

# return Json response on STDOUT stream
print(info.get_json())