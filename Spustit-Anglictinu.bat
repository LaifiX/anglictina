@echo off
cd /d "%~dp0"
echo Spustam aplikaciu Anglictina...
npm run dev -- --port 5173 --open
pause
