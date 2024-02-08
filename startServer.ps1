# Ouvre un nouveau terminal et demarre le serveur backend
Start-Process powershell -ArgumentList "/c .\nba-venv\Scripts\activate;cd .\Projet_HTML_Nais_Calame_Ngo\WebProjectNodeJS\my-backend;npm run dev" 

# Ouvre un autre nouveau terminal et demarre le serveur frontend
Start-Process powershell -ArgumentList "/c .\nba-venv\Scripts\activate;cd .\Projet_HTML_Nais_Calame_Ngo\WebProjectReact\my-app; npm start"

