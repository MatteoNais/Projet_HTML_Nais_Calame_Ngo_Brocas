# Ouvre un nouveau terminal et exécute la première commande
Start-Process powershell -ArgumentList "/c cd .\Projet_HTML_Nais_Calame_Ngo\WebProjectNodeJS\my-backend; npm run dev" 

# Ouvre un autre nouveau terminal et exécute la deuxième commande
Start-Process powershell -ArgumentList "/c cd .\Projet_HTML_Nais_Calame_Ngo\WebProjectReact\my-app; npm start"

