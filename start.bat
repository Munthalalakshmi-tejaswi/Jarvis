@echo off
echo Starting Siri Project...

:: Start JSON Server
start cmd /k "json-server --watch db.json --port 3000"

:: Wait 3 seconds so server loads
timeout /t 3 >nul

:: Open Siri page automatically
start "" "http://localhost/siri.html"

echo Your Siri project is running!
pause
